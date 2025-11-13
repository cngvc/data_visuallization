import { isProduction } from '@/constants';
import { CustomError } from '@/interfaces/responses/error-handler';
import { authMiddleware } from '@/middleware/auth.middleware';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} from '@apollo/server/plugin/landingPage/default';
import { expressMiddleware } from '@as-integrations/express5';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express, { Application } from 'express';
import { Server as HttpServer } from 'http';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

export const setupGraphQL = async (app: Application, httpServer: HttpServer) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });
  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      isProduction
        ? ApolloServerPluginLandingPageProductionDefault({
            embed: true,
            includeCookies: true,
            graphRef: 'prod@prod'
          })
        : ApolloServerPluginLandingPageLocalDefault({
            embed: true,
            includeCookies: true
          })
    ],
    formatError: (formattedError, error: any) => {
      const originalError = error.originalError as any;
      if (originalError instanceof CustomError) {
        return originalError.serializeError();
      }
      console.log(`🚨 ${error?.message}`);
      return {
        message: formattedError.message,
        status: 'error',
        statusCode: originalError?.statusCode || 500,
        comingFrom: 'GraphQL',
        path: formattedError.path
      };
    }
  });
  await server.start();
  app.use(
    '/graphql',
    express.json(),
    authMiddleware.attachUser,
    authMiddleware.attachUserAgent,
    authMiddleware.mappingHeaders,
    expressMiddleware(server, {
      context: async ({ req }) => {
        return {
          userAgent: (req as any).userAgent,
          userIp: (req as any).userIp,
          user: (req as any).user
        };
      }
    })
  );

  return server;
};
