import { UserRoleEnum } from '@/entities/auth.entity';
import { IAuthPayload } from '@/interfaces/auth.interface';
import { CustomError, NotAuthorizedError, ServerError } from '@/interfaces/responses/error-handler';
import { authService } from '@/services/auth.service';
import { getClientIp, getDeviceInfo, IDeviceInfo } from '@/utils/device.util';
import { NextFunction, Request, Response } from 'express';

export class AuthMiddleware {
  async requireAuth(req: Request, _: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (req.headers['x-user']) return next();
    try {
      if (!authHeader?.startsWith('Bearer ')) {
        throw new NotAuthorizedError('Authorization token is missing or invalid.', 'requireAuth');
      }
      const token = authHeader.split(' ')[1];
      const payload = await authService.getUserByJwt(token);
      if (!payload) {
        throw new NotAuthorizedError('Token is not available, please login again.', 'requireAuth');
      }
      req.headers['x-user'] = JSON.stringify(payload);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        return next(error);
      }
      throw new ServerError('Internal error.', 'requireAuth');
    }
    next();
  }

  requireRole(role: string) {
    return (req: Request, _: Response, next: NextFunction) => {
      const userHeader = req.headers['x-user'] as string;
      if (!userHeader) {
        return next(new NotAuthorizedError('User not authenticated.', 'requireRole'));
      }
      try {
        const user = JSON.parse(userHeader) as IAuthPayload;
        if (user.role === UserRoleEnum.SUPER_ADMIN) return next();
        if (user.role !== role) {
          return next(new NotAuthorizedError('User does not have the required role.', 'requireRole'));
        }
      } catch (error) {
        return next(new ServerError('Malformed user payload in header.', 'requireRole'));
      }
      next();
    };
  }
  async attachUser(req: Request, _: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.split(' ')[1];
        const payload = await authService.getUserByJwt(token);
        if (payload) {
          req.headers['x-user'] = JSON.stringify(payload);
        }
      } catch (error) {
        return next(new ServerError('Internal error.', 'attachUser'));
      }
    }
    next();
  }
  async attachUserAgent(req: Request, _: Response, next: NextFunction) {
    const userAgent = req.headers['user-agent'];
    if (userAgent) {
      req.headers['x-user-agent'] = JSON.stringify(getDeviceInfo(userAgent));
    }
    req.headers['x-client-ip'] = getClientIp(req);
    next();
  }
  async mappingHeaders(req: Request, _: Response, next: NextFunction) {
    if (req.headers['x-user']) {
      const payload = JSON.parse(req.headers['x-user'] as string) as IAuthPayload;
      const user = await authService.getUserById(payload.id);
      req.user = user!;
    }
    if (req.headers['x-user-agent']) {
      req.userAgent = JSON.parse(req.headers['x-user-agent'] as string) as IDeviceInfo;
    }
    if (req.headers['x-client-ip']) {
      (req as any).userIp = req.headers['x-client-ip'] as string;
    }
    next();
  }
}

export const authMiddleware = new AuthMiddleware();
