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
import { verifyJsonFile } from '@/utils/validator.util';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export class ImportJsonController {
  public async uploadFamiliesFromJson(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadFamiliesFromJson');
    }
    verifyJsonFile(req.file.buffer, req.file.originalname, 'Family');
    const result = await etlService.processJsonFile(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      Family,
      convertService.familyJSON
    );
    new OkRequestSuccess('Families imported successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadMembersFromJson(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadMembersFromJson');
    }
    verifyJsonFile(req.file.buffer, req.file.originalname, 'Member');
    const result = await etlService.processJsonFile(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      Member,
      convertService.memberJSON
    );
    new OkRequestSuccess('Members imported successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadMembershipTypesFromJson(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadMembershipTypesFromJson');
    }
    verifyJsonFile(req.file.buffer, req.file.originalname, 'MembershipType');
    const result = await etlService.processJsonFile(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      MembershipType,
      convertService.membershipTypeJSON
    );

    new OkRequestSuccess('Membership types imported successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadCourtsFromJson(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadCourtsFromJson');
    }
    verifyJsonFile(req.file.buffer, req.file.originalname, 'Court');
    const result = await etlService.processJsonFile(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      Court,
      convertService.courtJSON
    );
    new OkRequestSuccess('Courts imported successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadRevenueRecognitionJson(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadRevenueRecognitionJson');
    }
    verifyJsonFile(req.file.buffer, req.file.originalname, 'RevenueRecognition');
    const result = await etlService.processJsonFile(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      RevenueRecognition,
      convertService.revenueRecognitionJSON
    );

    new OkRequestSuccess('Revenue recognition data imported successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadEventsFromJson(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadEventsFromJson');
    }
    verifyJsonFile(req.file.buffer, req.file.originalname, 'Event');
    const result = await etlService.processJsonFile(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      Event,
      convertService.eventJSON
    );
    new OkRequestSuccess('Events imported successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadReservationTypesFromJson(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadReservationTypesFromJson');
    }
    verifyJsonFile(req.file.buffer, req.file.originalname, 'ReservationType');
    const result = await etlService.processJsonFile(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      ReservationType,
      convertService.reservationTypeJSON
    );
    new OkRequestSuccess('Reservation types imported successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadEventCategoriesFromJson(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadEventCategoriesFromJson');
    }
    verifyJsonFile(req.file.buffer, req.file.originalname, 'EventCategory');
    const result = await etlService.processJsonFile(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      EventCategory,
      convertService.eventCategoryJSON
    );
    new OkRequestSuccess('Event categories imported successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadReservationsFromJson(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadReservationsFromJson');
    }
    verifyJsonFile(req.file.buffer, req.file.originalname, 'Reservation');
    const result = await etlService.processJsonFile(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      Reservation,
      convertService.reservationJSON
    );
    new OkRequestSuccess('Reservations imported successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadPlayerReportsFromJson(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadPlayerReportsFromJson');
    }
    verifyJsonFile(req.file.buffer, req.file.originalname, 'PlayerReport');
    const result = await etlService.processJsonFile(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      PlayerReport,
      convertService.playerReportJSON
    );
    new OkRequestSuccess('Member reports imported successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadSalesSummaryFromJson(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadSalesSummaryFromJson');
    }
    verifyJsonFile(req.file.buffer, req.file.originalname, 'SalesSummary');
    const result = await etlService.processJsonFile(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      SalesSummary,
      convertService.salesSummaryJSON
    );
    new OkRequestSuccess('Sales summary imported successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadTransactionsFromJson(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadTransactionsFromJson');
    }
    verifyJsonFile(req.file.buffer, req.file.originalname, 'Transaction');
    const result = await etlService.processJsonFile(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      Transaction,
      convertService.transactionJSON
    );
    new OkRequestSuccess('Transactions imported successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }

  public async uploadEventRegistrationsFromJson(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('No file uploaded', 'uploadEventRegistrationsFromJson');
    }
    verifyJsonFile(req.file.buffer, req.file.originalname, 'EventRegistration');
    const result = await etlService.processJsonFile(
      req.user!._id as mongoose.Types.ObjectId,
      req.file.buffer,
      req.file.originalname,
      EventRegistration,
      convertService.eventRegistrationJSON
    );
    new OkRequestSuccess('Event registrations imported successfully', {
      filename: req.file.originalname,
      recordsProcessed: result.count
    }).send(res);
  }
}

export const importJsonController = new ImportJsonController();
