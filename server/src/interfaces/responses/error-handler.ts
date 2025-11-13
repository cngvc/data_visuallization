import { StatusCodes } from 'http-status-codes';

export interface IError {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
}

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
  serializeError(): IError;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;
  comingFrom: string;

  constructor(message: string, comingFrom = 'Unknown') {
    super(message);
    this.comingFrom = comingFrom;
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  serializeError(): IError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      status: this.status,
      comingFrom: this.comingFrom
    };
  }
}

export class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  status = 'error';

  constructor(message: string, confirmFrom?: string) {
    super(message, confirmFrom);
  }
}

export class ForbiddenError extends CustomError {
  statusCode = StatusCodes.FORBIDDEN;
  status = 'error';

  constructor(message: string, confirmFrom?: string) {
    super(message, confirmFrom);
  }
}

export class NotAuthorizedError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;
  status = 'error';

  constructor(message: string, confirmFrom?: string) {
    super(message, confirmFrom);
  }
}

export class ConflictError extends CustomError {
  statusCode = StatusCodes.CONFLICT;
  status = 'error';

  constructor(message: string, confirmFrom?: string) {
    super(message, confirmFrom);
  }
}

export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;
  status = 'error';

  constructor(message: string, confirmFrom?: string) {
    super(message, confirmFrom);
  }
}

export class FileTooLargeError extends CustomError {
  statusCode = StatusCodes.REQUEST_TOO_LONG;
  status = 'error';

  constructor(message: string, confirmFrom?: string) {
    super(message, confirmFrom);
  }
}

export class RateLimitedError extends CustomError {
  statusCode = StatusCodes.TOO_MANY_REQUESTS;
  status = 'error';

  constructor(message: string, confirmFrom?: string) {
    super(message, confirmFrom);
  }
}

export class ServerError extends CustomError {
  statusCode = StatusCodes.SERVICE_UNAVAILABLE;
  status = 'error';

  constructor(message: string, confirmFrom?: string) {
    super(message, confirmFrom);
  }
}

export class ValidationError extends CustomError {
  statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
  status = 'error';

  constructor(message: string, confirmFrom?: string) {
    super(message, confirmFrom);
  }
}

export interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  syscall?: string;
  path?: string;
  stack?: string;
}
