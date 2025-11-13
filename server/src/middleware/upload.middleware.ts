import { BadRequestError } from '@/interfaces/responses/error-handler';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilterCSV = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'text/csv' || file.mimetype === 'application/csv' || file.originalname.endsWith('.csv')) {
    cb(null, true);
  } else {
    cb(new BadRequestError('Only CSV files are allowed', 'File upload error'));
  }
};

const fileFilterJSON = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'application/json' || file.originalname.endsWith('.json')) {
    cb(null, true);
  } else {
    cb(new BadRequestError('Only JSON files are allowed', 'File upload error'));
  }
};

const uploadCSV = multer({
  storage,
  fileFilter: fileFilterCSV,
  limits: {
    fileSize: 20 * 1024 * 1024
  }
});

const uploadJSON = multer({
  storage,
  fileFilter: fileFilterJSON,
  limits: {
    fileSize: 20 * 1024 * 1024
  }
});

export class UploadMiddleware {
  uploadSingle(fieldName: string, type: 'CSV' | 'JSON') {
    return (req: Request, res: Response, next: NextFunction) => {
      const uploadSingle = type === 'CSV' ? uploadCSV.single(fieldName) : uploadJSON.single(fieldName);
      uploadSingle(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return next(new BadRequestError('File size exceeds the 5MB limit', 'File upload error'));
          }
          return next(new BadRequestError(`Upload error: ${err.message}`, 'File upload error'));
        } else if (err) {
          return next(err);
        }
        if (!req.file && req.method === 'PATCH') {
          return next();
        }
        next();
      });
    };
  }
}

export const uploadMiddleware = new UploadMiddleware();
