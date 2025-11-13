import { ImportHistory } from '@/entities/import-history.entity';
import { authService } from '@/services/auth.service';
import { etlService } from '@/services/etl.service';
import { log } from '@/utils/logger.util';
import { verifyJsonFile } from '@/utils/validator.util';
import AdmZip from 'adm-zip';
import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
import { calculateChecksum, dataDir, entityConvertJSONMap, entityModelJSONMap, verifyJSONMap } from './helpers';

const ENTITY_PROCESSING_ORDER: string[] = [
  'courts',
  'membership_types',
  'reservationtypes',
  'eventcategories',
  'families',
  'members',
  'reservations',
  'events',
  'eventregistrations',
  'trans',
  'revrec',
  'salessummary',
  'playersreport'
];

class SeedJsonData {
  private getEntityTypeFromFilename(filename: string): string | null {
    const entityTypes = Object.keys(entityModelJSONMap);
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

  private async processJsonFile(filePath: string, entityType: string | null): Promise<void> {
    const user = await authService.getUserByEmail('sample+json@example.com');
    if (!user) {
      log.warn('User not found, skipping file processing');
      return;
    }
    if (!user.current_organization_id) {
      log.warn('User has no current organization, skipping file processing');
      return;
    }
    try {
      const fileBuffer = fs.readFileSync(filePath);
      const filename = path.basename(filePath);
      const checksum = calculateChecksum(fileBuffer);
      if (await this.isFileAlreadyImported(filename, checksum, user.current_organization_id._id)) {
        log.info(`File ${filename} has already been imported. Skipping.`);
        return;
      }
      if (!entityType) {
        entityType = this.getEntityTypeFromFilename(filename);
        if (!entityType) {
          log.warn(`Could not determine entity type for file ${filename}. Skipping.`);
          return;
        }
      }
      const model = entityModelJSONMap[entityType];
      const convertor = entityConvertJSONMap[entityType];
      const verifyModel = verifyJSONMap[entityType];

      if (!model || !convertor || !verifyModel) {
        log.warn(`No model or convert function found for entity type ${entityType}. Skipping file ${filename}.`);
        return;
      }
      log.info(`Processing ${entityType} data from ${filename}`);
      verifyJsonFile(fileBuffer, filename, verifyModel);
      await etlService.processJsonFile(user._id as mongoose.Types.ObjectId, fileBuffer, filename, model, convertor);
      log.info(`Successfully imported ${entityType} data from ${filename}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log.error(`Error processing JSON file ${filePath}: ${errorMessage}`);
      throw error;
    }
  }

  private getEntityPriority(entityType: string): number {
    const index = ENTITY_PROCESSING_ORDER.indexOf(entityType);
    return index === -1 ? Number.MAX_SAFE_INTEGER : index;
  }

  private async processZipFileWithOrder(zipFilePath: string): Promise<void> {
    try {
      log.info(`Processing ZIP file: ${zipFilePath}`);
      const zip = new AdmZip(zipFilePath);
      const zipEntries = zip.getEntries();
      const tempDir = path.join(dataDir, 'temp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      const zipBaseName = path.basename(zipFilePath, path.extname(zipFilePath));
      const zipFolder = path.join(tempDir, zipBaseName);

      if (!fs.existsSync(zipFolder)) {
        fs.mkdirSync(zipFolder, { recursive: true });
      }

      const entriesToProcess: { path: string; entityType: string }[] = [];
      for (const entry of zipEntries) {
        if (!entry.isDirectory && entry.name.endsWith('.json')) {
          const entityType = this.getEntityTypeFromFilename(entry.name);
          if (!entityType) {
            log.warn(`Could not determine entity type for ${entry.name}. Skipping.`);
            continue;
          }
          zip.extractEntryTo(entry.entryName, tempDir, true, true);
          const extractedPath = path.join(tempDir, entry.entryName);
          entriesToProcess.push({
            path: extractedPath,
            entityType
          });
        }
      }
      entriesToProcess.sort((a, b) => {
        return this.getEntityPriority(a.entityType) - this.getEntityPriority(b.entityType);
      });
      log.info(`Processing JSON files in order: ${entriesToProcess.map((e) => `${e.entityType} (${path.basename(e.path)})`).join(', ')}`);
      for (const entry of entriesToProcess) {
        await this.processJsonFile(entry.path, entry.entityType);
        fs.unlinkSync(entry.path);
      }
      try {
        if (fs.readdirSync(zipFolder).length === 0) {
          fs.rmdirSync(zipFolder);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        log.warn(`Could not clean up folder ${zipFolder}: ${errorMessage}`);
      }

      log.info(`Finished processing ZIP file: ${zipFilePath}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log.error(`Error processing ZIP file ${zipFilePath}: ${errorMessage}`);
    }
  }

  async syncJsonData(): Promise<void> {
    try {
      const jsonDir = path.join(dataDir, 'JSON');
      let zipFiles = fs
        .readdirSync(jsonDir)
        .filter((file) => file.endsWith('.zip'))
        .sort((a, b) => a.localeCompare(b));
      log.info(`Processing ZIP files in order: ${zipFiles.join(', ')}`);
      for (const zipFile of zipFiles) {
        await this.processZipFileWithOrder(path.join(jsonDir, zipFile));
      }
      const jsonFiles = fs.readdirSync(jsonDir).filter((file) => file.endsWith('.json'));
      const jsonFilesByType: Record<string, string[]> = {};

      for (const jsonFile of jsonFiles) {
        const entityType = this.getEntityTypeFromFilename(jsonFile);
        if (!entityType) {
          log.warn(`Could not determine entity type for file ${jsonFile}. Skipping.`);
          continue;
        }
        if (!jsonFilesByType[entityType]) {
          jsonFilesByType[entityType] = [];
        }
        jsonFilesByType[entityType].push(jsonFile);
      }

      for (const entityType of ENTITY_PROCESSING_ORDER) {
        if (jsonFilesByType[entityType]) {
          for (const jsonFile of jsonFilesByType[entityType]) {
            await this.processJsonFile(path.join(jsonDir, jsonFile), entityType);
          }
        }
      }

      for (const entityType in jsonFilesByType) {
        if (!ENTITY_PROCESSING_ORDER.includes(entityType)) {
          for (const jsonFile of jsonFilesByType[entityType]) {
            await this.processJsonFile(path.join(jsonDir, jsonFile), entityType);
          }
        }
      }
      log.info('JSON data seeding completed successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log.error(`Error seeding JSON data: ${errorMessage}`);
    }
  }
}

export const seedJsonData = new SeedJsonData();
