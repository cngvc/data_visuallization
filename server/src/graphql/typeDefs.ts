import { readFileSync } from 'fs';
import { gql } from 'graphql-tag';
import { join } from 'path';

const loadGraphQLFile = (filename: string): string => {
  const filePath = join(__dirname, 'types', filename);
  return readFileSync(filePath, 'utf-8');
};

const scalars = loadGraphQLFile('scalars/index.graphql');
const enums = loadGraphQLFile('enums/index.graphql');

// Load all entity types
const authTypes = loadGraphQLFile('types/auth.types.graphql');
const commonTypes = loadGraphQLFile('types/common.types.graphql');
const transactionTypes = loadGraphQLFile('types/transaction.types.graphql');
const salesSummaryTypes = loadGraphQLFile('types/sales-summary.types.graphql');
const revenueRecognitionTypes = loadGraphQLFile('types/revenue-recognition.types.graphql');
const importHistoryTypes = loadGraphQLFile('types/import-history.types.graphql');
const organizationTypes = loadGraphQLFile('types/organization.types.graphql');
const membershipTypes = loadGraphQLFile('types/membership.types.graphql');
const memberTypes = loadGraphQLFile('types/member.types.graphql');
const familyTypes = loadGraphQLFile('types/family.types.graphql');
const eventTypes = loadGraphQLFile('types/event.types.graphql');
const courtTypes = loadGraphQLFile('types/court.types.graphql');
const reservationTypes = loadGraphQLFile('types/reservation.types.graphql');
const playerReportTypes = loadGraphQLFile('types/player-report.types.graphql');

const inputs = loadGraphQLFile('inputs/index.graphql');
const queries = loadGraphQLFile('queries/index.graphql');
const mutations = loadGraphQLFile('mutations/index.graphql');

export const typeDefs = gql`
  ${scalars}
  ${enums}
  ${authTypes}
  ${commonTypes}
  ${transactionTypes}
  ${salesSummaryTypes}
  ${revenueRecognitionTypes}
  ${importHistoryTypes}
  ${organizationTypes}
  ${membershipTypes}
  ${memberTypes}
  ${familyTypes}
  ${eventTypes}
  ${courtTypes}
  ${reservationTypes}
  ${playerReportTypes}
  ${inputs}
  ${queries}
  ${mutations}
`;
