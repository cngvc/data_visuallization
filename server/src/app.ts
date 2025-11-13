import 'reflect-metadata';

import express, { Express } from 'express';
import { database } from './database';
import './entities';
import { Server } from './server';
import { log } from './utils/logger.util';

class Application {
  public async initialize() {
    const app: Express = express();
    const server = new Server(app);
    await database.connection();
    server.start();
  }
}

const application = new Application();
application.initialize();

process.on('SIGTERM', async () => {
  log.info('SIGTERM received, starting graceful shutdown');
  process.exit(0);
});

process.on('SIGINT', async () => {
  log.info('SIGINT received, starting graceful shutdown');
  process.exit(0);
});
