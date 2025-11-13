import { ValidationError } from '@/interfaces/responses/error-handler';
import { parse } from 'csv-parse/sync';
import { format, isValid, parseISO } from 'date-fns';

export function verifyJsonFile(buffer: Buffer, filename: string, entityType: string): any {
  if (!filename.toLowerCase().endsWith('.json')) {
    throw new ValidationError(`File ${filename} is not a JSON file. Please upload a .json file.`, 'verifyJsonFile');
  }
  let records: any[] = [];
  try {
    const content = buffer.toString('utf8');
    const jsonData = JSON.parse(content);
    if (jsonData?.['DetailedRows']) {
      records = jsonData?.['DetailedRows'];
    } else if (jsonData?.['Members']) {
      records = jsonData?.['Members'];
    } else {
      records = jsonData;
    }
  } catch (error) {
    throw new ValidationError(`Invalid JSON format in file ${filename}: ${(error as Error).message}`, 'verifyJsonFile');
  }
  if (!Array.isArray(records)) {
    throw new ValidationError(`Invalid JSON structure in file ${filename}. Expected an array of ${entityType} objects.`, 'verifyJsonFile');
  }
  if (records.length === 0) {
    throw new ValidationError(`Empty JSON array in file ${filename}. No ${entityType} data to import.`, 'verifyJsonFile');
  }
  validateSchema(records, entityType, filename);
  return records;
}

export function validateSchema(data: any[], entityType: string, filename: string): void {
  const sampleRecord = data[0];

  const requiredFields: Record<string, string[]> = {
    Family: ['OrganizationMemberFamilyId', 'FamilyName'],
    Member: ['OrganizationMemberId', 'FirstName', 'LastName'],
    MembershipType: ['Id', 'Name'],
    Court: ['Id'],
    RevenueRecognition: ['FeeId', 'OrganizationMemberId', 'RelationId'],
    Event: ['EventId', 'EventName', 'ReservationId'],
    ReservationType: ['Id', 'Name'],
    EventCategory: ['Id', 'Name'],
    Reservation: ['Id', 'StartTime', 'EndTime'],
    PlayerReport: ['ReservationMemberId', 'OrganizationMemberId'],
    SalesSummary: ['TransactionId', 'TransactionDate'],
    EventRegistration: ['EventDateId', 'EventId'],
    Transaction: ['TransactionId', 'TransactionDate']
  };

  if (!requiredFields[entityType]) {
    if (typeof sampleRecord !== 'object' || sampleRecord === null) {
      throw new ValidationError(`Invalid JSON structure in file ${filename}. Expected an array of objects.`, 'validateSchema');
    }
    return;
  }

  const missingFields = requiredFields[entityType].filter((field) => {
    return !sampleRecord.hasOwnProperty(field);
  });

  if (missingFields.length > 0) {
    throw new ValidationError(
      `Invalid ${entityType} data in file ${filename}. Missing required fields: ${missingFields.join(', ')}`,
      'validateSchema'
    );
  }
}

export function verifyCSVFile(buffer: Buffer, filename: string, entityType: string): any[] {
  if (!filename.toLowerCase().endsWith('.csv')) {
    throw new ValidationError(`File ${filename} is not a CSV file. Please upload a .csv file.`, 'verifyCSVFile');
  }
  let records: any[] = [];
  try {
    const content = buffer.toString('utf8');
    records = parse(content, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      skip_records_with_empty_values: true
    });
  } catch (error) {
    throw new ValidationError(`Invalid CSV format in file ${filename}: ${(error as Error).message}`, 'verifyCSVFile');
  }

  if (!Array.isArray(records) || records.length === 0) {
    throw new ValidationError(`Empty or invalid CSV file ${filename}. No ${entityType} data to import.`, 'verifyCSVFile');
  }
  validateSchema(records, entityType, filename);
  return records;
}

export function formatDate(date?: string | null): string | null {
  if (!date) return null;
  try {
    return isValid(parseISO(date)) ? format(parseISO(date), 'yyyy-MM-dd HH:mm:ss') : null;
  } catch (error) {
    return null;
  }
}
