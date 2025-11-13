import Auth from '@/entities/auth.entity';
import Agenda, { Job as AgendaJob } from 'agenda';
import mongoose from 'mongoose';
import { config } from './config';
import ImportHistory from './entities/import-history.entity';
import { seedAuthUsers } from './scripts/seed-auth-users';
import { seedCsvData } from './scripts/seed-csv-data';
import { seedJsonData } from './scripts/seed-json-data';
import { log } from './utils/logger.util';

const agenda = new Agenda({
  db: {
    address: `${config.DATABASE_URL}`,
    collection: 'jobs'
  },
  defaultConcurrency: 1
});

export class Database {
  private agenda: Agenda;

  constructor() {
    this.agenda = agenda;
    this.agenda.define('seed data', { lockLifetime: 10000 }, async (job: AgendaJob) => {
      try {
        await this.seedAuthUsers();
        await this.seedCsvData();
        await this.seedJsonData();
        log.info('✅ Seed job completed successfully');
        agenda.stop();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        log.error(`❌ Seed job error: ${errorMessage}`);
      }
    });
  }

  public async connection() {
    if (!config.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }
    try {
      await mongoose.connect(`${config.DATABASE_URL}`);
      log.info('🏪 MongoDB database connection has been established successfully');
      log.info('🌱 Starting seed data process as a background job...');
      await this.startAgenda();
      log.info('🚀 Application started, seed data process queued in background');
    } catch (error) {
      console.error(error, 'connection');
      process.exit(1);
    }
  }

  private async startAgenda(): Promise<void> {
    try {
      await this.agenda.start();
      log.info('📅 Agenda job scheduler started');
      await this.agenda.now('seed data', {});
      log.info('🔄 Seed data job scheduled (one-time execution)');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log.error(`❌ Failed to start agenda: ${errorMessage}`);
    }
  }

  async seedJsonData(): Promise<void> {
    try {
      const existingImportHistory = await ImportHistory.findOne({ filename: { $regex: '\.json$' } });
      if (existingImportHistory) {
        log.info('Import history collection is not empty. Skipping seeding process.');
        return;
      }
      if (mongoose.connection.readyState !== 1) {
        throw new Error('MongoDB is not connected. Please connect to MongoDB before seeding data.');
      }
      log.info('🌱 Starting JSON data seeding process');
      await seedJsonData.syncJsonData();
      log.info('✅ JSON data seeding completed successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log.error(`❌ Error seeding JSON data: ${errorMessage}`);
      throw error;
    }
  }

  async seedCsvData(): Promise<void> {
    try {
      const existingImportHistory = await ImportHistory.findOne({ filename: { $regex: '\.csv$' } });
      if (existingImportHistory) {
        log.info('Import history collection is not empty. Skipping seeding process.');
        return;
      }
      if (mongoose.connection.readyState !== 1) {
        throw new Error('MongoDB is not connected. Please connect to MongoDB before seeding data.');
      }
      log.info('🌱 Starting CSV data seeding process');
      await seedCsvData.syncCsvData();
      log.info('✅ CSV data seeding completed successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log.error(`❌ Error seeding CSV data: ${errorMessage}`);
      throw error;
    }
  }

  async seedAuthUsers(): Promise<void> {
    try {
      const existingAuth = await Auth.findOne({});
      if (existingAuth) {
        log.info('Auth collection is not empty. Skipping seeding process.');
        return;
      }
      if (mongoose.connection.readyState !== 1) {
        throw new Error('MongoDB is not connected. Please connect to MongoDB before seeding data.');
      }
      log.info('🌱 Starting auth users seeding process');
      await seedAuthUsers.createSeedAuthUsers();
      log.info('✅ Auth users seeding completed successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log.error(`❌ Error seeding auth users: ${errorMessage}`);
      throw error;
    }
  }
}

export const database = new Database();
