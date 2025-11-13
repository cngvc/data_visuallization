import { importCsvController } from '@/controllers/import-csv.controller';
import { importJsonController } from '@/controllers/import-json.controller';
import { authMiddleware } from '@/middleware/auth.middleware';
import { uploadMiddleware } from '@/middleware/upload.middleware';
import { Router } from 'express';

class ImportRoutes {
  router: Router;
  constructor() {
    this.router = Router();
  }

  public routes(): Router {
    // CSV
    this.router.post(
      '/upload-csv/sales',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'CSV'),
      importCsvController.uploadSalesSummary
    );
    this.router.post(
      '/upload-csv/transactions',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'CSV'),
      importCsvController.uploadTransactions
    );

    this.router.post(
      '/upload-csv/families',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'CSV'),
      importCsvController.uploadFamilies
    );
    this.router.post(
      '/upload-csv/members',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'CSV'),
      importCsvController.uploadMembers
    );
    this.router.post(
      '/upload-csv/membership-types',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'CSV'),
      importCsvController.uploadMembershipTypes
    );
    this.router.post(
      '/upload-csv/courts',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'CSV'),
      importCsvController.uploadCourts
    );
    this.router.post(
      '/upload-csv/events',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'CSV'),
      importCsvController.uploadEvents
    );
    this.router.post(
      '/upload-csv/revenue-recognition',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'CSV'),
      importCsvController.uploadRevenueRecognition
    );
    this.router.post(
      '/upload-csv/member-reports',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'CSV'),
      importCsvController.uploadPlayerReports
    );
    this.router.post(
      '/upload-csv/event-registrations',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'CSV'),
      importCsvController.uploadEventRegistrations
    );
    this.router.post(
      '/upload-csv/reservations',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'CSV'),
      importCsvController.uploadReservations
    );
    this.router.post(
      '/upload-csv/reservation-types',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'CSV'),
      importCsvController.uploadReservationTypes
    );
    this.router.post(
      '/upload-csv/event-categories',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'CSV'),
      importCsvController.uploadEventCategories
    );

    // JSON
    this.router.post(
      '/upload-json/families',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'JSON'),
      importJsonController.uploadFamiliesFromJson
    );
    this.router.post(
      '/upload-json/members',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'JSON'),
      importJsonController.uploadMembersFromJson
    );
    this.router.post(
      '/upload-json/membership-types',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'JSON'),
      importJsonController.uploadMembershipTypesFromJson
    );
    this.router.post(
      '/upload-json/courts',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'JSON'),
      importJsonController.uploadCourtsFromJson
    );
    this.router.post(
      '/upload-json/revenue-recognition',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'JSON'),
      importJsonController.uploadRevenueRecognitionJson
    );
    this.router.post(
      '/upload-json/events',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'JSON'),
      importJsonController.uploadEventsFromJson
    );
    this.router.post(
      '/upload-json/event-categories',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'JSON'),
      importJsonController.uploadEventCategoriesFromJson
    );
    this.router.post(
      '/upload-json/reservation-types',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'JSON'),
      importJsonController.uploadReservationTypesFromJson
    );
    this.router.post(
      '/upload-json/member-reports',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'JSON'),
      importJsonController.uploadPlayerReportsFromJson
    );
    this.router.post(
      '/upload-json/reservations',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'JSON'),
      importJsonController.uploadReservationsFromJson
    );
    this.router.post(
      '/upload-json/sales-summary',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'JSON'),
      importJsonController.uploadSalesSummaryFromJson
    );
    this.router.post(
      '/upload-json/transactions',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'JSON'),
      importJsonController.uploadTransactionsFromJson
    );

    this.router.post(
      '/upload-json/event-registrations',
      authMiddleware.requireAuth,
      uploadMiddleware.uploadSingle('file', 'JSON'),
      importJsonController.uploadEventRegistrationsFromJson
    );

    return this.router;
  }
}

export const importRoutes = new ImportRoutes();
