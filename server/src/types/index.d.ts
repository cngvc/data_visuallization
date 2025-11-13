import { IAuth } from '@/entities/auth.entity';
import { IDeviceInfo } from '@/interfaces/device.interface';

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
      userIp?: string;
      user?: IAuth;
      userAgent?: IDeviceInfo;
    }
  }
}
