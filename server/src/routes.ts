import { Application, Request, Response } from 'express';
import { BASE_PATH } from './constants/path';
import { OkRequestSuccess } from './interfaces/responses/success-handler';
import { healthRoutes } from './routes/health.route';
import { importRoutes } from './routes/import.routes';

const appRoutes = (app: Application): void => {
  app.use(BASE_PATH, healthRoutes.routes());
  app.use(BASE_PATH, importRoutes.routes());
  app.use(BASE_PATH, (req: Request, res: Response) => {
    new OkRequestSuccess(`Hello guys!`, {
      env: process.env.NODE_ENV
    }).send(res);
  });
};

export { appRoutes };
