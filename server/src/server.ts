import { config } from '@/config';
import { SERVER_PORT, SERVICE_NAME } from '@/constants';
import { setupGraphQL } from '@/graphql';
import { appRoutes } from '@/routes';
import { captureError, log } from '@/utils/logger.util';
import compression from 'compression';
import cors from 'cors';
import { Application, NextFunction, Request, Response, urlencoded } from 'express';
import hpp from 'hpp';
import http, { Server as HttpServer } from 'http';
import { StatusCodes } from 'http-status-codes';
import { CustomError, IErrorResponse } from './interfaces/responses/error-handler';
import { authMiddleware } from './middleware/auth.middleware';

export class Server {
  private app: Application;
  private httpServer: HttpServer | null = null;
  constructor(app: Application) {
    this.app = app;
  }
  start = async (): Promise<void> => {
    this.standardMiddleware();
    this.securityMiddleware();
    await this.startServer();
  };
  private securityMiddleware() {
    this.app.set('trust proxy', 1);
    this.app.use(hpp());
    this.app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-apollo-operation-name', 'apollo-require-preflight'],
        credentials: true
      })
    );
    this.app.use(authMiddleware.attachUser);
    this.app.use(authMiddleware.attachUserAgent);
    this.app.use(authMiddleware.mappingHeaders);

    this.routesMiddleware();
  }

  private routesMiddleware() {
    appRoutes(this.app);
  }

  private errorHandler(): void {
    this.app.use('/*\w', (req: Request, res: Response, next: NextFunction) => {
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      log.log('error', `${fullUrl} endpoint does not exist.`, '');
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'The endpoint called does not exist',
        statusCode: StatusCodes.NOT_FOUND,
        status: 'error',
        comingFrom: 'Server error handler middleware'
      });
      return;
    });

    this.app.use((error: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
      log.log('error', SERVICE_NAME + ` ${error.comingFrom}: ${error.message}`);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(error.serializeError());
        return;
      }
      res.status(error.statusCode).json({
        message: error.message,
        status: error.status,
        statusCode: error.statusCode,
        comingFrom: error.comingFrom
      });
    });
  }

  private standardMiddleware(): void {
    this.app.use(compression());
    this.app.use(urlencoded({ extended: true, limit: '5mb' }));
  }

  private async startServer(): Promise<void> {
    try {
      this.httpServer = new http.Server(this.app);
      await setupGraphQL(this.app, this.httpServer);
      this.errorHandler();

      this.startHttpServer(this.httpServer);
      log.info(SERVICE_NAME + ` has started with process id ${process.pid}, env: ${process.env.NODE_ENV}`);
      log.info(`GraphQL server ready at ${config.SERVER_URL}/graphql`);
    } catch (error) {
      captureError(error, 'startServer');
    }
  }

  private async startHttpServer(httpServer: HttpServer): Promise<void> {
    await new Promise<void>((resolve) => httpServer.listen({ port: Number(SERVER_PORT) }, resolve));
    log.info(
      SERVICE_NAME +
        ` has started on port ${SERVER_PORT}, env: ${process.env.NODE_ENV}, instance: ${process.env.NODE_APP_INSTANCE || 'none'}`
    );
  }
}
