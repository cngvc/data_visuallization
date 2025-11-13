import Court from '@/entities/court.entity';
import EventCategory from '@/entities/event-category.entity';
import EventRegistration from '@/entities/event-registration.entity';
import Event from '@/entities/event.entity';
import Family from '@/entities/family.entity';
import Member from '@/entities/member.entity';
import MembershipType from '@/entities/membership-type.entity';
import PlayerReport from '@/entities/player-report.entity';
import ReservationType from '@/entities/reservation-type.entity';
import Reservation from '@/entities/reservation.entity';
import RevenueRecognition from '@/entities/revenue-recognition.entity';
import SalesSummary from '@/entities/sales-summary.entity';
import Transaction from '@/entities/transaction.entity';
import { BadRequestError } from '@/interfaces/responses/error-handler';
import { OkRequestSuccess } from '@/interfaces/responses/success-handler';
import { convertService } from '@/services/convert.service';
import { etlService } from '@/services/etl.service';
import { verifyCSVFile } from '@/utils/validator.util';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export class ImportCsvController {
  public async uploadSalesSummary(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadSalesSummary');
    }
    verifyCSVFile(req.file.buffer, req.file.originalname, 'SalesSummary');
    const result = await etlService.processFileBuffer(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      SalesSummary,
      convertService.salesSummaryCSV
    );
    new OkRequestSuccess('File processed successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadTransactions(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadTransactions');
    }
    verifyCSVFile(req.file.buffer, req.file.originalname, 'Transactions');
    const result = await etlService.processFileBuffer(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      Transaction,
      convertService.transactionCSV
    );

    new OkRequestSuccess('File processed successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadCourts(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadCourts');
    }
    verifyCSVFile(req.file.buffer, req.file.originalname, 'Courts');
    const result = await etlService.processFileBuffer(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      Court,
      convertService.courtCSV
    );
    new OkRequestSuccess('File processed successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadMembershipTypes(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadMembershipTypes');
    }
    verifyCSVFile(req.file.buffer, req.file.originalname, 'MembershipTypes');
    const result = await etlService.processFileBuffer(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      MembershipType,
      convertService.membershipTypeCSV
    );

    new OkRequestSuccess('File processed successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadReservationTypes(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadReservationTypes');
    }
    verifyCSVFile(req.file.buffer, req.file.originalname, 'ReservationTypes');
    const result = await etlService.processFileBuffer(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      ReservationType,
      convertService.reservationTypeCSV
    );

    new OkRequestSuccess('File processed successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadEventCategories(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadEventCategories');
    }
    verifyCSVFile(req.file.buffer, req.file.originalname, 'EventCategories');
    const result = await etlService.processFileBuffer(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      EventCategory,
      convertService.eventCategoryCSV
    );

    new OkRequestSuccess('File processed successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadFamilies(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadFamilies');
    }
    verifyCSVFile(req.file.buffer, req.file.originalname, 'Families');
    const result = await etlService.processFileBuffer(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      Family,
      convertService.familyCSV
    );

    new OkRequestSuccess('File processed successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadMembers(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadMembers');
    }
    verifyCSVFile(req.file.buffer, req.file.originalname, 'Members');
    const result = await etlService.processFileBuffer(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      Member,
      convertService.memberCSV
    );
    new OkRequestSuccess('File processed successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadEvents(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadEvents');
    }
    verifyCSVFile(req.file.buffer, req.file.originalname, 'Events');
    const result = await etlService.processFileBuffer(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      Event,
      convertService.eventCSV
    );
    new OkRequestSuccess('File processed successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadEventRegistrations(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadEventRegistrations');
    }
    verifyCSVFile(req.file.buffer, req.file.originalname, 'EventRegistrations');
    const result = await etlService.processFileBuffer(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      EventRegistration,
      convertService.eventRegistrationCSV
    );
    new OkRequestSuccess('File processed successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadPlayerReports(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadPlayerReports');
    }
    verifyCSVFile(req.file.buffer, req.file.originalname, 'PlayerReport');
    const result = await etlService.processFileBuffer(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      PlayerReport,
      convertService.playerReportCSV
    );
    new OkRequestSuccess('Member reports imported successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadReservations(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadReservations');
    }
    verifyCSVFile(req.file.buffer, req.file.originalname, 'Reservations');
    const result = await etlService.processFileBuffer(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      Reservation,
      convertService.reservationCSV
    );
    new OkRequestSuccess('File processed successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadRevenueRecognition(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadRevenueRecognition');
    }
    const result = await etlService.processFileBuffer(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      RevenueRecognition,
      convertService.revenueRecognitionCSV
    );
    verifyCSVFile(req.file.buffer, req.file.originalname, 'RevenueRecognition');
    new OkRequestSuccess('File processed successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }
}

export const importCsvController = new ImportCsvController();
