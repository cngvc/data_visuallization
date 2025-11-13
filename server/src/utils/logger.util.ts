import { isProduction } from '@/constants';
import { config as dotenvConfig } from 'dotenv';
import fs from 'fs';
import path from 'path';
import winston, { Logger, format } from 'winston';
import 'winston-daily-rotate-file';
dotenvConfig({});

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const LOG_DIR = process.env.LOG_DIR || '/app/logs';
const LOG_MAX_SIZE = process.env.LOG_MAX_SIZE || '20m';
const LOG_MAX_FILES = process.env.LOG_MAX_FILES ? parseInt(process.env.LOG_MAX_FILES) : 14;
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_DOCKER = process.env.IS_DOCKER === 'true' || process.env.DOCKER === 'true' || false;

const { combine, timestamp, printf, colorize, errors, json } = format;

const consoleFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  const metaString = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : '';
  const stackTrace = stack ? `\n${stack}` : '';
  return `${timestamp} [${level}]: ${message}${metaString}${stackTrace}`;
});

const ensureLogDir = () => {
  try {
    const absolutePath = path.resolve(LOG_DIR);

    if (isProduction || IS_DOCKER) {
      try {
        fs.accessSync(absolutePath, fs.constants.W_OK);
      } catch (accessError) {
        console.warn(`No write access to log directory: ${absolutePath}. Attempting to create...`);
        try {
          fs.mkdirSync(absolutePath, { recursive: true, mode: 0o777 });
          console.log(`Created log directory at: ${absolutePath}`);
        } catch (mkdirError) {
          console.error(`Failed to create log directory at ${absolutePath}:`, mkdirError);
          return false;
        }
      }
    } else {
      if (!fs.existsSync(absolutePath)) {
        try {
          fs.mkdirSync(absolutePath, { recursive: true, mode: 0o777 });
          console.log(`Created log directory at: ${absolutePath}`);
        } catch (mkdirError) {
          console.error(`Failed to create log directory at ${absolutePath}:`, mkdirError);
          return false;
        }
      }
    }

    try {
      const testFile = path.join(absolutePath, '.test-write');
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
      return true;
    } catch (writeError) {
      console.error(`No write access to log directory: ${absolutePath}`, writeError);
      return false;
    }
  } catch (error: any) {
    console.error('Failed to initialize log directory:', error.message);
    return false;
  }
};

const winstonLogger = (level: string = LOG_LEVEL): Logger => {
  const transports: winston.transport[] = [];

  const consoleTransport = new winston.transports.Console({
    level: level,
    format: combine(
      isProduction || IS_DOCKER
        ? format.combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json())
        : format.combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), consoleFormat)
    ),
    handleExceptions: true,
    handleRejections: true,
    silent: false
  });
  transports.push(consoleTransport);

  if (isProduction || !IS_DOCKER || process.env.ENABLE_FILE_LOGGING === 'true') {
    try {
      if (ensureLogDir()) {
        const fileTransport = new winston.transports.DailyRotateFile({
          filename: path.join(LOG_DIR, 'application-%DATE%.log'),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: LOG_MAX_SIZE,
          maxFiles: `${LOG_MAX_FILES}d`,
          format: combine(timestamp(), errors({ stack: true }), json()),
          createSymlink: true,
          symlinkName: 'application-current.log'
        });

        fileTransport.on('error', (error) => {
          console.error('File transport error:', error);
        });

        transports.push(fileTransport);
      }
    } catch (error) {
      console.error('Failed to initialize file logging:', error);
    }
  }
  const logger = winston.createLogger({
    level: level,
    format: combine(timestamp(), errors({ stack: true }), json()),
    transports: transports,
    exitOnError: false
  });

  return logger;
};

type LogLevel = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';

type CaptureErrorFunction = (error: unknown, source: string, level?: LogLevel, meta?: Record<string, unknown>) => void;

type ServiceLogger = {
  log: Logger;
  captureError: CaptureErrorFunction;
};

const createLogger = (level: string = LOG_LEVEL): ServiceLogger => {
  const log: Logger = winstonLogger(level);

  const captureError: CaptureErrorFunction = (error, source, level = 'error', meta = {}) => {
    if (error instanceof Error) {
      log.log(level, `${source} - ${error.message}`, {
        ...meta,
        stack: error.stack,
        name: error.name
      });
    } else if (typeof error === 'string') {
      log.log(level, `${source} - ${error}`, meta);
    } else {
      log.log(level, source, { ...meta, error });
    }
  };

  return { log, captureError };
};

const logger = createLogger(LOG_LEVEL);

export const { log, captureError } = logger;
export default logger;
