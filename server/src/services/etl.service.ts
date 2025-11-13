import { UserRoleEnum } from '@/entities/auth.entity';
import { ImportHistory } from '@/entities/import-history.entity';
import { BadRequestError } from '@/interfaces/responses/error-handler';
import { log } from '@/utils/logger.util';
import { roleInOrganization } from '@/utils/resolver-guards';
import crypto from 'crypto';
import { parse } from 'csv-parse';
import mongoose from 'mongoose';
import { Readable } from 'stream';
import { authService } from './auth.service';

export class ETLService {
  public async processJsonFile(
    uploaderId: mongoose.Types.ObjectId,
    fileBuffer: Buffer,
    filename: string,
    model: mongoose.Model<any>,
    transform?: (record: any, organizationId: mongoose.Types.ObjectId) => Promise<any>
  ): Promise<{ success: boolean; count: number; error?: string }> {
    log.info(`Processing JSON file: ${filename}`);
    if (!model) {
      throw new BadRequestError(`Model not found`, 'processJsonFile');
    }
    const uploader = await authService.getUserById(uploaderId);
    if (!uploader) {
      throw new BadRequestError(`Uploader not found`, 'processJsonFile');
    }
    if (!uploader.current_organization_id) {
      throw new BadRequestError(`Uploader has no current organization`, 'processJsonFile');
    }
    await roleInOrganization(uploader._id as mongoose.Types.ObjectId, uploader.current_organization_id._id, UserRoleEnum.ORG_ADMIN);
    try {
      const fileContent = fileBuffer.toString('utf8');
      const checksum = crypto.createHash('md5').update(fileBuffer).digest('hex');
      const jsonData = JSON.parse(fileContent);
      let records: any[] = [];
      if (jsonData?.['DetailedRows']) {
        records = jsonData?.['DetailedRows'];
      } else if (jsonData?.['Members']) {
        records = jsonData?.['Members'];
      } else {
        records = jsonData;
      }
      let transformedRecords = transform
        ? await Promise.all(records.map((record) => transform(record, uploader.current_organization_id!._id)))
        : records;
      transformedRecords = transformedRecords.filter(Boolean);
      const batchSize = 1000;
      let insertedCount = 0;
      for (let i = 0; i < transformedRecords.length; i += batchSize) {
        const batch = transformedRecords.slice(i, i + batchSize);
        await model.insertMany(batch, { ordered: true });
        insertedCount += batch.length;
        log.info(`Inserted ${insertedCount}/${transformedRecords.length} records`);
      }
      log.info(`Successfully processed ${insertedCount} records from ${filename}`);

      await ImportHistory.create({
        filename,
        collection_name: model.collection.name,
        checksum,
        record_count: insertedCount,
        status: 'success',
        uploader_id: uploader._id,
        organization_id: uploader.current_organization_id._id
      });
      return { success: true, count: insertedCount };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log.error(`Error processing JSON file: ${errorMessage}`);
      const errorChecksum = crypto.createHash('md5').update(fileBuffer).digest('hex');
      await ImportHistory.create({
        filename,
        collection_name: model.collection.name,
        checksum: errorChecksum,
        status: 'failed',
        error_message: errorMessage,
        uploader_id: uploader._id,
        organization_id: uploader.current_organization_id._id
      });
      throw new BadRequestError(`Failed to process JSON file: ${errorMessage}`, 'processJsonFile');
    }
  }

  public async processFileBuffer(
    uploaderId: mongoose.Types.ObjectId,
    fileBuffer: Buffer,
    filename: string,
    model: mongoose.Model<any>,
    transform?: (record: any, organizationId: mongoose.Types.ObjectId) => Promise<any>
  ): Promise<{ success: boolean; count: number; error?: string }> {
    log.info(`Processing file buffer: ${filename}`);
    if (!model) {
      throw new BadRequestError(`Model not found`, 'processFileBuffer');
    }
    const uploader = await authService.getUserById(uploaderId);
    if (!uploader) {
      throw new BadRequestError(`Uploader not found`, 'processJsonFile');
    }
    if (!uploader.current_organization_id?._id) {
      throw new BadRequestError(`Uploader has no current organization`, 'processJsonFile');
    }
    await roleInOrganization(uploader._id as mongoose.Types.ObjectId, uploader.current_organization_id._id, UserRoleEnum.ORG_ADMIN);
    try {
      const checksum = crypto.createHash('md5').update(fileBuffer).digest('hex');
      const records: any[] = [];
      const bufferStream = new Readable();
      bufferStream.push(fileBuffer);
      bufferStream.push(null);
      const parser = bufferStream.pipe(
        parse({
          columns: true,
          skip_empty_lines: true,
          trim: true
        })
      );
      for await (const record of parser) {
        const transformedRecord = transform ? await transform(record, uploader.current_organization_id!._id) : record;
        if (transformedRecord) records.push(transformedRecord);
      }
      const batchSize = 1000;
      let insertedCount = 0;
      for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize);
        await model.insertMany(batch, { ordered: true });
        insertedCount += batch.length;
        log.info(`Inserted ${insertedCount}/${records.length} records`);
      }
      log.info(`Successfully processed ${insertedCount} records from ${filename}`);
      await ImportHistory.create({
        filename,
        collection_name: model.collection.name,
        checksum,
        record_count: insertedCount,
        status: 'success',
        uploader_id: uploader._id,
        organization_id: uploader.current_organization_id._id
      });
      return { success: true, count: insertedCount };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorChecksum = crypto.createHash('md5').update(fileBuffer).digest('hex');
      await ImportHistory.create({
        filename,
        collection_name: model.collection.name,
        checksum: errorChecksum,
        status: 'failed',
        error_message: errorMessage,
        uploader_id: uploader._id,
        organization_id: uploader.current_organization_id._id
      });
      throw new BadRequestError(`Failed to process file buffer: ${errorMessage}`, 'processFileBuffer');
    }
  }
}

export const etlService = new ETLService();
