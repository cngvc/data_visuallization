import { ImportHistory } from '@/entities/import-history.entity';
import { authService } from '@/services/auth.service';
import { etlService } from '@/services/etl.service';
import { log } from '@/utils/logger.util';
import { verifyCSVFile } from '@/utils/validator.util';
import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
import { calculateChecksum, dataDir, entityConvertCSVMap, entityModelCSVMap, verifyCSVMap } from './helpers';

const ENTITY_PROCESSING_ORDER: string[] = [
  'reservation_courts',
  'eventcalendar_categories',
  'membershiptype',
  'eventregistrationreport_list',
  'eventcalendar_eventlist',
  'family',
  'member_get_members_detail',
  'reservationreport_whoisheretoday',
  'reservation_reservationtypes',
  'reservationreport_list',
  'revrec',
  'sales_summary',
  'transactions'
];

class SeedCsvData {
  private getEntityTypeFromFilename(filename: string): string | null {
    const entityTypes = Object.keys(entityModelCSVMap);
    for (const entityType of entityTypes) {
      if (filename.toLowerCase().includes(entityType.toLowerCase())) {
        return entityType;
      }
    }
    return null;
  }
  private async isFileAlreadyImported(filename: string, checksum: string, organizationId: mongoose.Types.ObjectId): Promise<boolean> {
    const existingImport = await ImportHistory.findOne({
      $or: [
        { filename, status: 'success' },
        { checksum, status: 'success' }
      ],
      organization_id: organizationId
    });
    return !!existingImport;
  }
  private async processCsvFile(fileBuffer: Buffer, filename: string, entityType: string): Promise<void> {
    const user = await authService.getUserByEmail('sample+csv@example.com');
    if (!user) {
      log.warn('User not found, skipping file processing');
      return;
    }
    if (!user.current_organization_id?._id) {
      log.warn('User has no current organization, skipping file processing');
      return;
    }
    try {
      const model = entityModelCSVMap[entityType];
      const convertor = entityConvertCSVMap[entityType];
      const verifyModel = verifyCSVMap[entityType];

      if (!model || !convertor || !verifyModel) {
        log.warn(`No model or convert function found for entity type ${entityType}. Skipping file ${filename}.`);
        return;
      }
      log.info(`🍖 Processing ${entityType} data from ${filename}`);
      verifyCSVFile(fileBuffer, filename, verifyModel);
      await etlService.processFileBuffer(user._id as mongoose.Types.ObjectId, fileBuffer, filename, model, convertor);
      log.info(`🌝 Successfully imported ${entityType} data from ${filename}`);
    } catch (error) {
      log.error(`Error processing CSV file ${filename}:`, error);
      throw error;
    }
  }
  async syncCsvData(): Promise<void> {
    try {
      const csvDir = path.join(dataDir, 'csv');
      if (!fs.existsSync(csvDir)) {
        log.warn(`CSV directory not found: ${csvDir}`);
        return;
      }
      const csvFiles = fs
        .readdirSync(csvDir)
        .filter((file) => file.endsWith('.csv'))
        .map((file) => ({
          filename: file,
          path: path.join(csvDir, file)
        }));
      if (csvFiles.length === 0) {
        log.info('No CSV files found in the directory');
        return;
      }
      const user = await authService.getUserByEmail('sample+csv@example.com');
      if (!user) {
        log.warn('User not found, skipping file processing');
        return;
      }
      if (!user.current_organization_id) {
        log.warn('User has no current organization, skipping file processing');
        return;
      }
      for (const type of ENTITY_PROCESSING_ORDER) {
        const filesToProcess = csvFiles.filter((file) => this.getEntityTypeFromFilename(file.filename) === type);
        for (const { filename, path: filePath } of filesToProcess) {
          const fileBuffer = fs.readFileSync(filePath);
          const checksum = calculateChecksum(fileBuffer);
          if (await this.isFileAlreadyImported(filename, checksum, user.current_organization_id._id)) {
            log.info(`File ${filename} already imported successfully. Skipping.`);
            continue;
          }
          const lowerCaseFilename = filename.toLowerCase();
          switch (type) {
            case 'transactions':
              if (lowerCaseFilename.includes('salessummarydetailed') && !lowerCaseFilename.includes('detailedrows_detail')) {
                log.info(`⚠️ Skipping ${filename} as it is a detailed sales summary file.`);
                continue;
              }
              await this.processCsvFile(fileBuffer, filename, type);
              break;
            case 'reservationreport_list':
              if (lowerCaseFilename.includes('players')) {
                await this.processCsvFile(fileBuffer, filename, 'reservation_players');
              } else {
                await this.processCsvFile(fileBuffer, filename, type);
              }
              break;
            default:
              await this.processCsvFile(fileBuffer, filename, type);
              break;
          }
        }
      }
      log.info('CSV data seeding completed successfully');
    } catch (error) {
      log.error('Error seeding CSV data:', error);
      throw error;
    }
  }
}

export const seedCsvData = new SeedCsvData();
