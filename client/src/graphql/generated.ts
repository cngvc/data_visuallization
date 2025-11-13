import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: Date; output: Date; }
  JSON: { input: Record<string, any>; output: Record<string, any>; }
  Upload: { input: File; output: File; }
};

export type Auth = {
  __typename?: 'Auth';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  role?: Maybe<UserRole>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type AuthFilterInput = {
  organization_id?: InputMaybe<Scalars['ID']['input']>;
  role?: InputMaybe<UserRole>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type AuthInput = {
  email: Scalars['String']['input'];
  organization_id?: InputMaybe<Scalars['ID']['input']>;
  password: Scalars['String']['input'];
  role?: InputMaybe<UserRole>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: AuthUser;
};

export type AuthUser = {
  __typename?: 'AuthUser';
  _id: Scalars['ID']['output'];
  current_organization_id?: Maybe<Organization>;
  email: Scalars['String']['output'];
  first_name?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  role_in_current_organization?: Maybe<UserRole>;
};

export type CategoryData = {
  __typename?: 'CategoryData';
  name: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type ChangePasswordInput = {
  current_password: Scalars['String']['input'];
  new_password: Scalars['String']['input'];
};

export type Chart = {
  __typename?: 'Chart';
  datasets: Array<Scalars['Float']['output']>;
  labels: Array<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ChartResponse = {
  __typename?: 'ChartResponse';
  data: Chart;
};

export type Court = {
  __typename?: 'Court';
  _id?: Maybe<Scalars['ID']['output']>;
  court_id?: Maybe<Scalars['Int']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  order_index?: Maybe<Scalars['Int']['output']>;
  type_name?: Maybe<Scalars['String']['output']>;
};

export type CourtFilterInput = {
  search?: InputMaybe<Scalars['String']['input']>;
};

export type CourtInput = {
  label: Scalars['String']['input'];
  order_index?: InputMaybe<Scalars['Int']['input']>;
  type_name: Scalars['String']['input'];
};

export type CourtResponse = {
  __typename?: 'CourtResponse';
  data: Array<Court>;
  pagination: PaginationInfo;
};

export type DeviceInfo = {
  __typename?: 'DeviceInfo';
  browser?: Maybe<Scalars['String']['output']>;
  deviceName?: Maybe<Scalars['String']['output']>;
  deviceType?: Maybe<Scalars['String']['output']>;
  lastUsedAt?: Maybe<Scalars['Date']['output']>;
  os?: Maybe<Scalars['String']['output']>;
};

export type Event = {
  __typename?: 'Event';
  _id?: Maybe<Scalars['ID']['output']>;
  background_color?: Maybe<Scalars['String']['output']>;
  category_id?: Maybe<EventCategory>;
  created_at?: Maybe<Scalars['Date']['output']>;
  end_date?: Maybe<Scalars['Date']['output']>;
  event_id?: Maybe<Scalars['Int']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  is_registered?: Maybe<Scalars['Boolean']['output']>;
  max_registrants?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  registered_count?: Maybe<Scalars['Int']['output']>;
  reservation_id?: Maybe<Reservation>;
  sso_url?: Maybe<Scalars['String']['output']>;
  start_date?: Maybe<Scalars['Date']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
};

export type EventCategory = {
  __typename?: 'EventCategory';
  _id?: Maybe<Scalars['ID']['output']>;
  background_color?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  event_category_id?: Maybe<Scalars['Int']['output']>;
  is_public?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  text_color?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
};

export type EventCategoryFilterInput = {
  is_public?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type EventCategoryInput = {
  background_color: Scalars['String']['input'];
  is_public?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  text_color: Scalars['String']['input'];
};

export type EventCategoryResponse = {
  __typename?: 'EventCategoryResponse';
  data: Array<EventCategory>;
  pagination: PaginationInfo;
};

export type EventFilterInput = {
  category_id?: InputMaybe<Scalars['ID']['input']>;
  end_date?: InputMaybe<Scalars['String']['input']>;
  is_registered?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['String']['input']>;
};

export type EventInput = {
  background_color?: InputMaybe<Scalars['String']['input']>;
  category_id?: InputMaybe<Scalars['ID']['input']>;
  end_date?: InputMaybe<Scalars['Date']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  is_registered?: InputMaybe<Scalars['Boolean']['input']>;
  max_registrants?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  registered_count?: InputMaybe<Scalars['Int']['input']>;
  reservation_id?: InputMaybe<Scalars['ID']['input']>;
  sso_url?: InputMaybe<Scalars['String']['input']>;
  start_date: Scalars['Date']['input'];
};

export type EventRegistration = {
  __typename?: 'EventRegistration';
  _id?: Maybe<Scalars['ID']['output']>;
  cancelled_on_utc?: Maybe<Scalars['Date']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  end_time?: Maybe<Scalars['Date']['output']>;
  event_date_id?: Maybe<Scalars['Int']['output']>;
  event_id?: Maybe<Event>;
  member_id?: Maybe<Member>;
  paid_amount?: Maybe<Scalars['Float']['output']>;
  price_to_pay?: Maybe<Scalars['Float']['output']>;
  signed_up_on_utc?: Maybe<Scalars['Date']['output']>;
  start_time?: Maybe<Scalars['Date']['output']>;
  unsubscribe_from_marketing_emails?: Maybe<Scalars['Boolean']['output']>;
  unsubscribe_from_marketing_text_alerts?: Maybe<Scalars['Boolean']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
};

export type EventRegistrationFilterInput = {
  end_date?: InputMaybe<Scalars['String']['input']>;
  member_id?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type EventRegistrationResponse = {
  __typename?: 'EventRegistrationResponse';
  data: Array<EventRegistration>;
  pagination: PaginationInfo;
};

export type EventResponse = {
  __typename?: 'EventResponse';
  data: Array<Event>;
  pagination: PaginationInfo;
};

export type Family = {
  __typename?: 'Family';
  _id?: Maybe<Scalars['ID']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  family_id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
};

export type FamilyFilterInput = {
  search?: InputMaybe<Scalars['String']['input']>;
};

export type FamilyInput = {
  name: Scalars['String']['input'];
  number?: InputMaybe<Scalars['String']['input']>;
};

export type FamilyResponse = {
  __typename?: 'FamilyResponse';
  data: Array<Family>;
  pagination: PaginationInfo;
};

export type ForgotPasswordInput = {
  email: Scalars['String']['input'];
};

export type ImportHistory = {
  __typename?: 'ImportHistory';
  _id?: Maybe<Scalars['ID']['output']>;
  checksum?: Maybe<Scalars['String']['output']>;
  collection_name?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  error_message?: Maybe<Scalars['String']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  import_date?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  record_count?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
};

export type ImportHistoryFilterInput = {
  collection_name?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type ImportHistoryResponse = {
  __typename?: 'ImportHistoryResponse';
  data: Array<ImportHistory>;
  pagination: PaginationInfo;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LogoutInput = {
  refreshToken: Scalars['String']['input'];
};

export type MeOrganizationResponse = {
  __typename?: 'MeOrganizationResponse';
  data: Array<UserOrganization>;
};

export type MeResponse = {
  __typename?: 'MeResponse';
  data: AuthUser;
};

export type Member = {
  __typename?: 'Member';
  _id?: Maybe<Scalars['ID']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  allow_child_login?: Maybe<Scalars['Boolean']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  date_of_birth?: Maybe<Scalars['Date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  external_id?: Maybe<Scalars['String']['output']>;
  family_id?: Maybe<Family>;
  family_role?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  member_id?: Maybe<Scalars['Int']['output']>;
  membership_assignment_type?: Maybe<Scalars['String']['output']>;
  membership_end_date?: Maybe<Scalars['Date']['output']>;
  membership_start_date?: Maybe<Scalars['Date']['output']>;
  membership_status?: Maybe<Scalars['String']['output']>;
  membership_type_id?: Maybe<MembershipType>;
  phone?: Maybe<Scalars['String']['output']>;
  profile_image_url?: Maybe<Scalars['String']['output']>;
  ratings?: Maybe<Scalars['JSON']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
  user_defined_fields?: Maybe<Scalars['JSON']['output']>;
  zip_code?: Maybe<Scalars['String']['output']>;
};

export type MemberFilterInput = {
  membership_date_range?: InputMaybe<MembershipDateRangeInput>;
  membership_status?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  membership_type_id?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type MemberInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  allow_child_login?: InputMaybe<Scalars['Boolean']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  date_of_birth?: InputMaybe<Scalars['Date']['input']>;
  email: Scalars['String']['input'];
  family_id?: InputMaybe<Scalars['ID']['input']>;
  family_role?: InputMaybe<Scalars['String']['input']>;
  first_name: Scalars['String']['input'];
  gender?: InputMaybe<Scalars['String']['input']>;
  last_name: Scalars['String']['input'];
  membership_assignment_type?: InputMaybe<Scalars['String']['input']>;
  membership_end_date?: InputMaybe<Scalars['Date']['input']>;
  membership_start_date?: InputMaybe<Scalars['Date']['input']>;
  membership_status?: InputMaybe<Scalars['String']['input']>;
  membership_type_id?: InputMaybe<Scalars['ID']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  profile_image_url?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  zip_code?: InputMaybe<Scalars['String']['input']>;
};

export type MemberResponse = {
  __typename?: 'MemberResponse';
  data: Array<Member>;
  pagination: PaginationInfo;
};

export type MembershipDateRangeInput = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};

export type MembershipType = {
  __typename?: 'MembershipType';
  _id?: Maybe<Scalars['ID']['output']>;
  allow_max_age?: Maybe<Scalars['Int']['output']>;
  allow_min_age?: Maybe<Scalars['Int']['output']>;
  annual_price?: Maybe<Scalars['Float']['output']>;
  cost_type_additional_features?: Maybe<Scalars['JSON']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  custom_frequency_value?: Maybe<Scalars['String']['output']>;
  custom_price?: Maybe<Scalars['Float']['output']>;
  days_past_due_to_cancel?: Maybe<Scalars['Int']['output']>;
  days_past_due_to_suspend?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  initiation_price?: Maybe<Scalars['Float']['output']>;
  is_active?: Maybe<Scalars['Boolean']['output']>;
  is_payment_required?: Maybe<Scalars['Boolean']['output']>;
  is_restrict_by_age?: Maybe<Scalars['Boolean']['output']>;
  lifetime_price?: Maybe<Scalars['Float']['output']>;
  membership_type_id?: Maybe<Scalars['Int']['output']>;
  monthly_price?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order_index?: Maybe<Scalars['Int']['output']>;
  purchase_end_date?: Maybe<Scalars['Date']['output']>;
  purchase_start_date?: Maybe<Scalars['Date']['output']>;
  quarterly_price?: Maybe<Scalars['Float']['output']>;
  short_code?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
};

export type MembershipTypeFilterInput = {
  search?: InputMaybe<Scalars['String']['input']>;
};

export type MembershipTypeInput = {
  allow_max_age?: InputMaybe<Scalars['Int']['input']>;
  allow_min_age?: InputMaybe<Scalars['Int']['input']>;
  annual_price?: InputMaybe<Scalars['Float']['input']>;
  custom_frequency_value?: InputMaybe<Scalars['String']['input']>;
  custom_price?: InputMaybe<Scalars['Float']['input']>;
  days_past_due_to_cancel?: InputMaybe<Scalars['Int']['input']>;
  days_past_due_to_suspend?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  initiation_price?: InputMaybe<Scalars['Float']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  is_payment_required?: InputMaybe<Scalars['Boolean']['input']>;
  is_restrict_by_age?: InputMaybe<Scalars['Boolean']['input']>;
  lifetime_price?: InputMaybe<Scalars['Float']['input']>;
  monthly_price?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  order_index?: InputMaybe<Scalars['Int']['input']>;
  purchase_end_date?: InputMaybe<Scalars['Date']['input']>;
  purchase_start_date?: InputMaybe<Scalars['Date']['input']>;
  quarterly_price?: InputMaybe<Scalars['Float']['input']>;
  short_code?: InputMaybe<Scalars['String']['input']>;
};

export type MembershipTypeResponse = {
  __typename?: 'MembershipTypeResponse';
  data: Array<MembershipType>;
  pagination: PaginationInfo;
};

export type Mutation = {
  __typename?: 'Mutation';
  add_organization_user: MutationResponse;
  change_password_me: MutationResponse;
  create_auth_user: MutationResponse;
  create_court: MutationResponse;
  create_event: MutationResponse;
  create_event_category: MutationResponse;
  create_family: MutationResponse;
  create_member: MutationResponse;
  create_member_report: MutationResponse;
  create_membership_type: MutationResponse;
  create_organization: MutationResponse;
  create_reservation: MutationResponse;
  create_reservation_type: MutationResponse;
  create_revenue_recognition: MutationResponse;
  create_sales_summary: MutationResponse;
  create_transaction: MutationResponse;
  delete_auth_user: MutationResponse;
  delete_court: MutationResponse;
  delete_event: MutationResponse;
  delete_event_category: MutationResponse;
  delete_event_registration: MutationResponse;
  delete_family: MutationResponse;
  delete_member: MutationResponse;
  delete_member_report: MutationResponse;
  delete_membership_type: MutationResponse;
  delete_organization: MutationResponse;
  delete_reservation: MutationResponse;
  delete_reservation_type: MutationResponse;
  delete_revenue_recognition: MutationResponse;
  delete_sales_summary: MutationResponse;
  delete_transaction: MutationResponse;
  forgot_password: MutationResponse;
  login: AuthResponse;
  logout: MutationResponse;
  refresh_token: AuthResponse;
  remove_organization_user: MutationResponse;
  reset_password: MutationResponse;
  signup: AuthResponse;
  update_auth_user: MutationResponse;
  update_court: MutationResponse;
  update_event: MutationResponse;
  update_event_category: MutationResponse;
  update_family: MutationResponse;
  update_me: MutationResponse;
  update_member: MutationResponse;
  update_member_report: MutationResponse;
  update_membership_type: MutationResponse;
  update_organization: MutationResponse;
  update_organization_user: MutationResponse;
  update_reservation: MutationResponse;
  update_reservation_type: MutationResponse;
  update_revenue_recognition: MutationResponse;
  update_sales_summary: MutationResponse;
  update_transaction: MutationResponse;
};


export type MutationAdd_Organization_UserArgs = {
  input: UserOrganizationInput;
};


export type MutationChange_Password_MeArgs = {
  input: ChangePasswordInput;
};


export type MutationCreate_Auth_UserArgs = {
  input: AuthInput;
};


export type MutationCreate_CourtArgs = {
  input: CourtInput;
};


export type MutationCreate_EventArgs = {
  input: EventInput;
};


export type MutationCreate_Event_CategoryArgs = {
  input: EventCategoryInput;
};


export type MutationCreate_FamilyArgs = {
  input: FamilyInput;
};


export type MutationCreate_MemberArgs = {
  input: MemberInput;
};


export type MutationCreate_Member_ReportArgs = {
  input: PlayerReportInput;
};


export type MutationCreate_Membership_TypeArgs = {
  input: MembershipTypeInput;
};


export type MutationCreate_OrganizationArgs = {
  input: OrganizationInput;
};


export type MutationCreate_ReservationArgs = {
  input: ReservationInput;
};


export type MutationCreate_Reservation_TypeArgs = {
  input: ReservationTypeInput;
};


export type MutationCreate_Revenue_RecognitionArgs = {
  input: RevenueRecognitionInput;
};


export type MutationCreate_Sales_SummaryArgs = {
  input: SalesSummaryInput;
};


export type MutationCreate_TransactionArgs = {
  input: TransactionInput;
};


export type MutationDelete_Auth_UserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_CourtArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDelete_EventArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDelete_Event_CategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDelete_Event_RegistrationArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDelete_FamilyArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDelete_MemberArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDelete_Member_ReportArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDelete_Membership_TypeArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDelete_OrganizationArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDelete_ReservationArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDelete_Reservation_TypeArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDelete_Revenue_RecognitionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDelete_Sales_SummaryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDelete_TransactionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationForgot_PasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationLogoutArgs = {
  input: LogoutInput;
};


export type MutationRefresh_TokenArgs = {
  input: RefreshTokenInput;
};


export type MutationRemove_Organization_UserArgs = {
  input: RemoveOrganizationUserInput;
};


export type MutationReset_PasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationUpdate_Auth_UserArgs = {
  id: Scalars['ID']['input'];
  input: AuthInput;
};


export type MutationUpdate_CourtArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: CourtInput;
};


export type MutationUpdate_EventArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: EventInput;
};


export type MutationUpdate_Event_CategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: EventCategoryInput;
};


export type MutationUpdate_FamilyArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: FamilyInput;
};


export type MutationUpdate_MeArgs = {
  input: UpdateMeInput;
};


export type MutationUpdate_MemberArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: MemberInput;
};


export type MutationUpdate_Member_ReportArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: PlayerReportInput;
};


export type MutationUpdate_Membership_TypeArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: MembershipTypeInput;
};


export type MutationUpdate_OrganizationArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: OrganizationInput;
};


export type MutationUpdate_Organization_UserArgs = {
  id: Scalars['ID']['input'];
  input: UserOrganizationInput;
};


export type MutationUpdate_ReservationArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: ReservationInput;
};


export type MutationUpdate_Reservation_TypeArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: ReservationTypeInput;
};


export type MutationUpdate_Revenue_RecognitionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: RevenueRecognitionInput;
};


export type MutationUpdate_Sales_SummaryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: SalesSummaryInput;
};


export type MutationUpdate_TransactionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: TransactionInput;
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Organization = {
  __typename?: 'Organization';
  _id?: Maybe<Scalars['ID']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
};

export type OrganizationFilterInput = {
  search?: InputMaybe<Scalars['String']['input']>;
};

export type OrganizationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type OrganizationResponse = {
  __typename?: 'OrganizationResponse';
  data?: Maybe<OrganizationUsers>;
};

export type OrganizationUsers = {
  __typename?: 'OrganizationUsers';
  organization: Organization;
  userOrganizations: Array<UserOrganization>;
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  pages: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PlayerReport = {
  __typename?: 'PlayerReport';
  _id?: Maybe<Scalars['ID']['output']>;
  booking_type?: Maybe<Scalars['String']['output']>;
  cancelled_on_utc?: Maybe<Scalars['Date']['output']>;
  court_ids?: Maybe<Array<Maybe<Court>>>;
  created_at?: Maybe<Scalars['Date']['output']>;
  created_on_utc?: Maybe<Scalars['Date']['output']>;
  end_date_time?: Maybe<Scalars['Date']['output']>;
  is_approved?: Maybe<Scalars['Boolean']['output']>;
  is_cancelled?: Maybe<Scalars['Boolean']['output']>;
  member_id?: Maybe<Member>;
  report_id?: Maybe<Scalars['String']['output']>;
  reservation_id?: Maybe<Reservation>;
  reservation_member_id?: Maybe<Scalars['Int']['output']>;
  start_date_time?: Maybe<Scalars['Date']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
};

export type PlayerReportFilterInput = {
  booking_type?: InputMaybe<Scalars['String']['input']>;
  court_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  end_date?: InputMaybe<Scalars['String']['input']>;
  is_approved?: InputMaybe<Scalars['Boolean']['input']>;
  member_id?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['String']['input']>;
};

export type PlayerReportInput = {
  booking_type: Scalars['String']['input'];
  cancelled_on_utc?: InputMaybe<Scalars['String']['input']>;
  court_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  end_date_time: Scalars['String']['input'];
  is_approved?: InputMaybe<Scalars['Boolean']['input']>;
  is_cancelled?: InputMaybe<Scalars['Boolean']['input']>;
  member_id?: InputMaybe<Scalars['ID']['input']>;
  reservation_id?: InputMaybe<Scalars['ID']['input']>;
  reservation_member_id?: InputMaybe<Scalars['ID']['input']>;
  start_date_time: Scalars['String']['input'];
};

export type PlayerReportResponse = {
  __typename?: 'PlayerReportResponse';
  data: Array<PlayerReport>;
  pagination: PaginationInfo;
};

export type Query = {
  __typename?: 'Query';
  courts: CourtResponse;
  event_categories: EventCategoryResponse;
  event_registrations: EventRegistrationResponse;
  events: EventResponse;
  families: FamilyResponse;
  import_history: ImportHistoryResponse;
  me: MeResponse;
  me_organizations: MeOrganizationResponse;
  members: MemberResponse;
  membership_types: MembershipTypeResponse;
  organization: OrganizationResponse;
  player_reports: PlayerReportResponse;
  reservation_players: ReservationPlayerResponse;
  reservation_types: ReservationTypeResponse;
  reservations: ReservationResponse;
  revenue_recognition: RevenueRecognitionResponse;
  revenue_recognition_by_id?: Maybe<RevenueRecognition>;
  sales_summary: SalesSummaryResponse;
  transactions: TransactionsResponse;
};


export type QueryCourtsArgs = {
  filters?: InputMaybe<CourtFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryEvent_CategoriesArgs = {
  filters?: InputMaybe<EventCategoryFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryEvent_RegistrationsArgs = {
  filters?: InputMaybe<EventRegistrationFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryEventsArgs = {
  filters?: InputMaybe<EventFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFamiliesArgs = {
  filters?: InputMaybe<FamilyFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryImport_HistoryArgs = {
  filters?: InputMaybe<ImportHistoryFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMe_OrganizationsArgs = {
  filters?: InputMaybe<OrganizationFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMembersArgs = {
  filters?: InputMaybe<MemberFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMembership_TypesArgs = {
  filters?: InputMaybe<MembershipTypeFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryOrganizationArgs = {
  organization_id: Scalars['ID']['input'];
};


export type QueryPlayer_ReportsArgs = {
  filters?: InputMaybe<PlayerReportFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryReservation_PlayersArgs = {
  filters?: InputMaybe<ReservationPlayerFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryReservation_TypesArgs = {
  filters?: InputMaybe<ReservationTypeFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryReservationsArgs = {
  filters?: InputMaybe<ReservationFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRevenue_RecognitionArgs = {
  filters?: InputMaybe<RevenueRecognitionFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRevenue_Recognition_By_IdArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QuerySales_SummaryArgs = {
  filters?: InputMaybe<SalesSummaryFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTransactionsArgs = {
  filters?: InputMaybe<TransactionsFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String']['input'];
};

export type RemoveOrganizationUserInput = {
  organization_id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
};

export type Reservation = {
  __typename?: 'Reservation';
  _id?: Maybe<Scalars['ID']['output']>;
  cancelled_on?: Maybe<Scalars['Date']['output']>;
  court_ids?: Maybe<Array<Maybe<Court>>>;
  created_at?: Maybe<Scalars['Date']['output']>;
  end_time?: Maybe<Scalars['Date']['output']>;
  instructors?: Maybe<Scalars['String']['output']>;
  is_lesson?: Maybe<Scalars['Boolean']['output']>;
  player_ids?: Maybe<Array<Maybe<ReservationPlayer>>>;
  rental_reservation_id?: Maybe<Scalars['Int']['output']>;
  reservation_type_id?: Maybe<ReservationType>;
  start_time?: Maybe<Scalars['Date']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
};

export type ReservationFilterInput = {
  court_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  end_date?: InputMaybe<Scalars['String']['input']>;
  is_lesson?: InputMaybe<Scalars['Boolean']['input']>;
  member_id?: InputMaybe<Scalars['ID']['input']>;
  reservation_type_id?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type ReservationInput = {
  cancelled_on?: InputMaybe<Scalars['String']['input']>;
  court_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  end_time?: InputMaybe<Scalars['String']['input']>;
  player_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  reservation_type_id?: InputMaybe<Scalars['ID']['input']>;
  start_time?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type ReservationPlayer = {
  __typename?: 'ReservationPlayer';
  _id?: Maybe<Scalars['ID']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  member_id?: Maybe<Member>;
  paid_amount?: Maybe<Scalars['Float']['output']>;
  price_to_pay?: Maybe<Scalars['Float']['output']>;
  unsubscribe_from_marketing_emails?: Maybe<Scalars['Boolean']['output']>;
  unsubscribe_from_marketing_text_alerts?: Maybe<Scalars['Boolean']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
};

export type ReservationPlayerFilterInput = {
  end_date?: InputMaybe<Scalars['String']['input']>;
  member_id?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type ReservationPlayerResponse = {
  __typename?: 'ReservationPlayerResponse';
  data: Array<ReservationPlayer>;
  pagination: PaginationInfo;
};

export type ReservationResponse = {
  __typename?: 'ReservationResponse';
  data: Array<Reservation>;
  pagination: PaginationInfo;
};

export type ReservationType = {
  __typename?: 'ReservationType';
  _id?: Maybe<Scalars['ID']['output']>;
  background_color?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order_index?: Maybe<Scalars['Int']['output']>;
  reservation_type_id?: Maybe<Scalars['Int']['output']>;
  text_color?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
};

export type ReservationTypeFilterInput = {
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ReservationTypeInput = {
  background_color?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  order_index?: InputMaybe<Scalars['Int']['input']>;
  text_color?: InputMaybe<Scalars['String']['input']>;
};

export type ReservationTypeResponse = {
  __typename?: 'ReservationTypeResponse';
  data: Array<ReservationType>;
  pagination: PaginationInfo;
};

export type ResetPasswordInput = {
  confirmPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type RevenueRecognition = {
  __typename?: 'RevenueRecognition';
  _id?: Maybe<Scalars['ID']['output']>;
  additional_dates?: Maybe<Array<Maybe<Scalars['Date']['output']>>>;
  created_at?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  end_date_time?: Maybe<Scalars['Date']['output']>;
  fee_category?: Maybe<Scalars['String']['output']>;
  fee_id?: Maybe<Transaction>;
  member_id?: Maybe<Member>;
  package_info?: Maybe<Scalars['JSON']['output']>;
  paid_date?: Maybe<Scalars['Date']['output']>;
  payment_id?: Maybe<Transaction>;
  payment_type?: Maybe<Scalars['String']['output']>;
  relation_id?: Maybe<Scalars['String']['output']>;
  revenue_recognition_id?: Maybe<Scalars['String']['output']>;
  start_date_time?: Maybe<Scalars['Date']['output']>;
  subtotal?: Maybe<Scalars['Float']['output']>;
  tax_total?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  transaction_type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
};

export type RevenueRecognitionFilterInput = {
  end_date?: InputMaybe<Scalars['String']['input']>;
  payment_type?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['String']['input']>;
  transaction_type?: InputMaybe<Scalars['String']['input']>;
};

export type RevenueRecognitionInput = {
  additional_dates?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  end_date_time?: InputMaybe<Scalars['Date']['input']>;
  fee_category?: InputMaybe<Scalars['String']['input']>;
  fee_id?: InputMaybe<Scalars['ID']['input']>;
  member_id?: InputMaybe<Scalars['ID']['input']>;
  package_info?: InputMaybe<Scalars['JSON']['input']>;
  paid_date?: InputMaybe<Scalars['Date']['input']>;
  payment_id?: InputMaybe<Scalars['ID']['input']>;
  payment_type?: InputMaybe<Scalars['String']['input']>;
  relation_id?: InputMaybe<Scalars['String']['input']>;
  start_date_time?: InputMaybe<Scalars['Date']['input']>;
  subtotal?: InputMaybe<Scalars['Float']['input']>;
  tax_total?: InputMaybe<Scalars['Float']['input']>;
  total?: InputMaybe<Scalars['Float']['input']>;
  transaction_type?: InputMaybe<Scalars['String']['input']>;
};

export type RevenueRecognitionResponse = {
  __typename?: 'RevenueRecognitionResponse';
  data: Array<RevenueRecognition>;
  pagination: PaginationInfo;
};

export type SalesSummary = {
  __typename?: 'SalesSummary';
  _id?: Maybe<Scalars['ID']['output']>;
  amount?: Maybe<Scalars['Float']['output']>;
  amount_with_no_tax?: Maybe<Scalars['Float']['output']>;
  court_labels?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['String']['output']>;
  end?: Maybe<Scalars['Date']['output']>;
  family_id?: Maybe<Family>;
  fee_category_name?: Maybe<Scalars['String']['output']>;
  instructor_names?: Maybe<Scalars['String']['output']>;
  item_cost?: Maybe<Scalars['Float']['output']>;
  item_name?: Maybe<Scalars['String']['output']>;
  member_id?: Maybe<Member>;
  membership_name?: Maybe<Scalars['String']['output']>;
  paid_date?: Maybe<Scalars['Date']['output']>;
  payment_type?: Maybe<Scalars['String']['output']>;
  revenue_category_name?: Maybe<Scalars['String']['output']>;
  start?: Maybe<Scalars['Date']['output']>;
  tax_total?: Maybe<Scalars['Float']['output']>;
  transaction_date?: Maybe<Scalars['Date']['output']>;
  transaction_id?: Maybe<Scalars['Int']['output']>;
  transaction_type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['String']['output']>;
};

export type SalesSummaryFilterInput = {
  end_date?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['String']['input']>;
};

export type SalesSummaryInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  amount_with_no_tax?: InputMaybe<Scalars['Float']['input']>;
  court_labels?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['Date']['input']>;
  family_id?: InputMaybe<Scalars['ID']['input']>;
  fee_category_name?: InputMaybe<Scalars['String']['input']>;
  item_cost?: InputMaybe<Scalars['Float']['input']>;
  item_name?: InputMaybe<Scalars['String']['input']>;
  member_id?: InputMaybe<Scalars['ID']['input']>;
  paid_date?: InputMaybe<Scalars['Date']['input']>;
  payment_type?: InputMaybe<Scalars['String']['input']>;
  revenue_category_name?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['Date']['input']>;
  tax_total?: InputMaybe<Scalars['Float']['input']>;
  transaction_date?: InputMaybe<Scalars['Date']['input']>;
  transaction_id?: InputMaybe<Scalars['Int']['input']>;
  transaction_type?: InputMaybe<Scalars['String']['input']>;
};

export type SalesSummaryResponse = {
  __typename?: 'SalesSummaryResponse';
  data: Array<SalesSummary>;
  pagination: PaginationInfo;
};

export type SignupInput = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  organization_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type TimeRangeInput = {
  end_date?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['String']['input']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  _id?: Maybe<Scalars['ID']['output']>;
  account_creation_date?: Maybe<Scalars['Date']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  event_id?: Maybe<Event>;
  instructors?: Maybe<Scalars['String']['output']>;
  is_paid?: Maybe<Scalars['Boolean']['output']>;
  member_id?: Maybe<Member>;
  paid_on?: Maybe<Scalars['Date']['output']>;
  payment_type?: Maybe<Scalars['String']['output']>;
  reservation_end?: Maybe<Scalars['Date']['output']>;
  reservation_id?: Maybe<Reservation>;
  reservation_start?: Maybe<Scalars['Date']['output']>;
  subtotal?: Maybe<Scalars['Float']['output']>;
  tax_total?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  transaction_date?: Maybe<Scalars['Date']['output']>;
  transaction_id?: Maybe<Scalars['Int']['output']>;
  transaction_type?: Maybe<Scalars['String']['output']>;
  unpaid_amount?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
};

export type TransactionFilterInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['String']['input']>;
  member_id?: InputMaybe<Scalars['ID']['input']>;
  payment_type?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['String']['input']>;
  transaction_type?: InputMaybe<Scalars['String']['input']>;
};

export type TransactionInput = {
  account_creation_date?: InputMaybe<Scalars['Date']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  event_id?: InputMaybe<Scalars['ID']['input']>;
  is_paid?: InputMaybe<Scalars['Boolean']['input']>;
  member_id?: InputMaybe<Scalars['ID']['input']>;
  paid_on?: InputMaybe<Scalars['Date']['input']>;
  payment_type: Scalars['String']['input'];
  reservation_end?: InputMaybe<Scalars['Date']['input']>;
  reservation_id?: InputMaybe<Scalars['ID']['input']>;
  reservation_start?: InputMaybe<Scalars['Date']['input']>;
  subtotal?: InputMaybe<Scalars['Float']['input']>;
  tax_total?: InputMaybe<Scalars['Float']['input']>;
  total?: InputMaybe<Scalars['Float']['input']>;
  transaction_date?: InputMaybe<Scalars['Date']['input']>;
  transaction_id?: InputMaybe<Scalars['Int']['input']>;
  transaction_type: Scalars['String']['input'];
  unpaid_amount?: InputMaybe<Scalars['Float']['input']>;
};

export type TransactionsFilterInput = {
  end_date?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['String']['input']>;
};

export type TransactionsResponse = {
  __typename?: 'TransactionsResponse';
  data: Array<Transaction>;
  pagination: PaginationInfo;
};

export type UpdateMeInput = {
  current_organization_id?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
};

export type UserOrganization = {
  __typename?: 'UserOrganization';
  _id?: Maybe<Scalars['ID']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  organization_id?: Maybe<Organization>;
  role?: Maybe<UserRole>;
  updated_at?: Maybe<Scalars['Date']['output']>;
  user_id?: Maybe<Auth>;
};

export type UserOrganizationInput = {
  email: Scalars['String']['input'];
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  organization_id: Scalars['ID']['input'];
  role: UserRole;
};

export type UserRole =
  | 'org_admin'
  | 'super_admin'
  | 'user';

export type SignupMutationVariables = Exact<{
  input: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string, user: { __typename?: 'AuthUser', _id: string, email: string, role: UserRole } } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string, user: { __typename?: 'AuthUser', _id: string, email: string, role: UserRole } } };

export type LogoutMutationVariables = Exact<{
  input: LogoutInput;
}>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgot_password: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', reset_password: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type UpdateMeMutationVariables = Exact<{
  input: UpdateMeInput;
}>;


export type UpdateMeMutation = { __typename?: 'Mutation', update_me: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type RefreshTokenMutationVariables = Exact<{
  input: RefreshTokenInput;
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refresh_token: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string } };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', change_password_me: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type CreateCourtMutationVariables = Exact<{
  input: CourtInput;
}>;


export type CreateCourtMutation = { __typename?: 'Mutation', create_court: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type UpdateCourtMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: CourtInput;
}>;


export type UpdateCourtMutation = { __typename?: 'Mutation', update_court: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type DeleteCourtMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCourtMutation = { __typename?: 'Mutation', delete_court: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type CreateMembershipTypeMutationVariables = Exact<{
  input: MembershipTypeInput;
}>;


export type CreateMembershipTypeMutation = { __typename?: 'Mutation', create_membership_type: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type UpdateMembershipTypeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: MembershipTypeInput;
}>;


export type UpdateMembershipTypeMutation = { __typename?: 'Mutation', update_membership_type: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type DeleteMembershipTypeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteMembershipTypeMutation = { __typename?: 'Mutation', delete_membership_type: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type CreateReservationTypeMutationVariables = Exact<{
  input: ReservationTypeInput;
}>;


export type CreateReservationTypeMutation = { __typename?: 'Mutation', create_reservation_type: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type UpdateReservationTypeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: ReservationTypeInput;
}>;


export type UpdateReservationTypeMutation = { __typename?: 'Mutation', update_reservation_type: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type DeleteReservationTypeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteReservationTypeMutation = { __typename?: 'Mutation', delete_reservation_type: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type CreateFamilyMutationVariables = Exact<{
  input: FamilyInput;
}>;


export type CreateFamilyMutation = { __typename?: 'Mutation', create_family: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type UpdateFamilyMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: FamilyInput;
}>;


export type UpdateFamilyMutation = { __typename?: 'Mutation', update_family: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type DeleteFamilyMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteFamilyMutation = { __typename?: 'Mutation', delete_family: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type CreateMemberMutationVariables = Exact<{
  input: MemberInput;
}>;


export type CreateMemberMutation = { __typename?: 'Mutation', create_member: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type UpdateMemberMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: MemberInput;
}>;


export type UpdateMemberMutation = { __typename?: 'Mutation', update_member: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type DeleteMemberMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteMemberMutation = { __typename?: 'Mutation', delete_member: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type CreateEventMutationVariables = Exact<{
  input: EventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', create_event: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type UpdateEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: EventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', update_event: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', delete_event: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type CreateReservationMutationVariables = Exact<{
  input: ReservationInput;
}>;


export type CreateReservationMutation = { __typename?: 'Mutation', create_reservation: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type UpdateReservationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: ReservationInput;
}>;


export type UpdateReservationMutation = { __typename?: 'Mutation', update_reservation: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type DeleteReservationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteReservationMutation = { __typename?: 'Mutation', delete_reservation: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type CreateSalesSummaryMutationVariables = Exact<{
  input: SalesSummaryInput;
}>;


export type CreateSalesSummaryMutation = { __typename?: 'Mutation', create_sales_summary: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type UpdateSalesSummaryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: SalesSummaryInput;
}>;


export type UpdateSalesSummaryMutation = { __typename?: 'Mutation', update_sales_summary: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type DeleteSalesSummaryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteSalesSummaryMutation = { __typename?: 'Mutation', delete_sales_summary: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type CreateTransactionMutationVariables = Exact<{
  input: TransactionInput;
}>;


export type CreateTransactionMutation = { __typename?: 'Mutation', create_transaction: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type UpdateTransactionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: TransactionInput;
}>;


export type UpdateTransactionMutation = { __typename?: 'Mutation', update_transaction: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type DeleteTransactionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTransactionMutation = { __typename?: 'Mutation', delete_transaction: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type CreatePlayerReportMutationVariables = Exact<{
  input: PlayerReportInput;
}>;


export type CreatePlayerReportMutation = { __typename?: 'Mutation', create_member_report: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type UpdatePlayerReportMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: PlayerReportInput;
}>;


export type UpdatePlayerReportMutation = { __typename?: 'Mutation', update_member_report: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type DeletePlayerReportMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePlayerReportMutation = { __typename?: 'Mutation', delete_member_report: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type CreateRevenueRecognitionMutationVariables = Exact<{
  input: RevenueRecognitionInput;
}>;


export type CreateRevenueRecognitionMutation = { __typename?: 'Mutation', create_revenue_recognition: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type UpdateRevenueRecognitionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: RevenueRecognitionInput;
}>;


export type UpdateRevenueRecognitionMutation = { __typename?: 'Mutation', update_revenue_recognition: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type DeleteRevenueRecognitionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteRevenueRecognitionMutation = { __typename?: 'Mutation', delete_revenue_recognition: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type CreateEventCategoryMutationVariables = Exact<{
  input: EventCategoryInput;
}>;


export type CreateEventCategoryMutation = { __typename?: 'Mutation', create_event_category: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type UpdateEventCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: EventCategoryInput;
}>;


export type UpdateEventCategoryMutation = { __typename?: 'Mutation', update_event_category: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type DeleteEventCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteEventCategoryMutation = { __typename?: 'Mutation', delete_event_category: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type DeleteReservationPlayerMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteReservationPlayerMutation = { __typename?: 'Mutation', delete_event_registration: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type UpdateOrganizationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: OrganizationInput;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', update_organization: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type CreateOrganizationUserMutationVariables = Exact<{
  input: UserOrganizationInput;
}>;


export type CreateOrganizationUserMutation = { __typename?: 'Mutation', add_organization_user: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type UpdateOrganizationUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UserOrganizationInput;
}>;


export type UpdateOrganizationUserMutation = { __typename?: 'Mutation', update_organization_user: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type RemoveOrganizationUserMutationVariables = Exact<{
  input: RemoveOrganizationUserInput;
}>;


export type RemoveOrganizationUserMutation = { __typename?: 'Mutation', remove_organization_user: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'MeResponse', data: { __typename?: 'AuthUser', _id: string, email: string, first_name?: string | null, last_name?: string | null, role: UserRole, role_in_current_organization?: UserRole | null, current_organization_id?: { __typename?: 'Organization', _id?: string | null, name?: string | null, description?: string | null, slug?: string | null } | null } } };

export type MeOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type MeOrganizationsQuery = { __typename?: 'Query', me_organizations: { __typename?: 'MeOrganizationResponse', data: Array<{ __typename?: 'UserOrganization', _id?: string | null, role?: UserRole | null, user_id?: { __typename?: 'Auth', _id?: string | null, email?: string | null, first_name?: string | null, last_name?: string | null } | null, organization_id?: { __typename?: 'Organization', _id?: string | null, name?: string | null, description?: string | null, slug?: string | null } | null }> } };

export type SalesSummaryQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<SalesSummaryFilterInput>;
}>;


export type SalesSummaryQuery = { __typename?: 'Query', sales_summary: { __typename?: 'SalesSummaryResponse', data: Array<{ __typename?: 'SalesSummary', _id?: string | null, fee_category_name?: string | null, item_name?: string | null, revenue_category_name?: string | null, amount?: number | null, amount_with_no_tax?: number | null, tax_total?: number | null, start?: Date | null, end?: Date | null, court_labels?: string | null, payment_type?: string | null, transaction_type?: string | null, membership_name?: string | null, transaction_id?: number | null, transaction_date?: Date | null, paid_date?: Date | null, item_cost?: number | null, instructor_names?: string | null, family_id?: { __typename?: 'Family', _id?: string | null, name?: string | null, number?: string | null, created_at?: Date | null, updated_at?: Date | null } | null, member_id?: { __typename?: 'Member', _id?: string | null, first_name?: string | null, last_name?: string | null, email?: string | null, phone?: string | null, date_of_birth?: Date | null } | null }>, pagination: { __typename?: 'PaginationInfo', total: number, page: number, limit: number, pages: number } } };

export type GetTransactionsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<TransactionsFilterInput>;
}>;


export type GetTransactionsQuery = { __typename?: 'Query', transactions: { __typename?: 'TransactionsResponse', data: Array<{ __typename?: 'Transaction', _id?: string | null, transaction_type?: string | null, payment_type?: string | null, transaction_date?: Date | null, is_paid?: boolean | null, subtotal?: number | null, tax_total?: number | null, total?: number | null, unpaid_amount?: number | null, paid_on?: Date | null, category?: string | null, reservation_start?: Date | null, reservation_end?: Date | null, account_creation_date?: Date | null, instructors?: string | null, member_id?: { __typename?: 'Member', _id?: string | null, first_name?: string | null, last_name?: string | null, email?: string | null, phone?: string | null, date_of_birth?: Date | null, family_id?: { __typename?: 'Family', _id?: string | null, name?: string | null } | null } | null, reservation_id?: { __typename?: 'Reservation', _id?: string | null, start_time?: Date | null, end_time?: Date | null, status?: string | null, court_ids?: Array<{ __typename?: 'Court', _id?: string | null, label?: string | null, order_index?: number | null, type_name?: string | null } | null> | null, reservation_type_id?: { __typename?: 'ReservationType', _id?: string | null, name?: string | null } | null } | null, event_id?: { __typename?: 'Event', _id?: string | null, name?: string | null, start_date?: Date | null, end_date?: Date | null, category_id?: { __typename?: 'EventCategory', _id?: string | null, name?: string | null } | null } | null }>, pagination: { __typename?: 'PaginationInfo', total: number, page: number, limit: number, pages: number } } };

export type ImportHistoryQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<ImportHistoryFilterInput>;
}>;


export type ImportHistoryQuery = { __typename?: 'Query', import_history: { __typename?: 'ImportHistoryResponse', data: Array<{ __typename?: 'ImportHistory', _id?: string | null, filename?: string | null, collection_name?: string | null, record_count?: number | null, import_date?: string | null, checksum?: string | null, status?: string | null, error_message?: string | null, metadata?: Record<string, any> | null }>, pagination: { __typename?: 'PaginationInfo', total: number, page: number, limit: number, pages: number } } };

export type GetMembersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<MemberFilterInput>;
}>;


export type GetMembersQuery = { __typename?: 'Query', members: { __typename?: 'MemberResponse', data: Array<{ __typename?: 'Member', _id?: string | null, first_name?: string | null, last_name?: string | null, gender?: string | null, email?: string | null, phone?: string | null, date_of_birth?: Date | null, address?: string | null, city?: string | null, state?: string | null, zip_code?: string | null, membership_assignment_type?: string | null, membership_status?: string | null, membership_start_date?: Date | null, membership_end_date?: Date | null, family_role?: string | null, allow_child_login?: boolean | null, profile_image_url?: string | null, user_defined_fields?: Record<string, any> | null, ratings?: Record<string, any> | null, external_id?: string | null, created_at?: Date | null, updated_at?: Date | null, family_id?: { __typename?: 'Family', _id?: string | null, name?: string | null, number?: string | null } | null, membership_type_id?: { __typename?: 'MembershipType', _id?: string | null, name?: string | null } | null }>, pagination: { __typename?: 'PaginationInfo', total: number, page: number, limit: number, pages: number } } };

export type GetPublicMembersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<MemberFilterInput>;
}>;


export type GetPublicMembersQuery = { __typename?: 'Query', members: { __typename?: 'MemberResponse', data: Array<{ __typename?: 'Member', _id?: string | null, first_name?: string | null, last_name?: string | null }>, pagination: { __typename?: 'PaginationInfo', total: number, page: number, limit: number, pages: number } } };

export type GetEventsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<EventFilterInput>;
}>;


export type GetEventsQuery = { __typename?: 'Query', events: { __typename?: 'EventResponse', data: Array<{ __typename?: 'Event', _id?: string | null, name?: string | null, start_date?: Date | null, end_date?: Date | null, background_color?: string | null, is_registered?: boolean | null, sso_url?: string | null, image_url?: string | null, max_registrants?: number | null, registered_count?: number | null, created_at?: Date | null, updated_at?: Date | null, category_id?: { __typename?: 'EventCategory', _id?: string | null, name?: string | null, background_color?: string | null, text_color?: string | null, is_public?: boolean | null } | null, reservation_id?: { __typename?: 'Reservation', _id?: string | null, start_time?: Date | null, end_time?: Date | null, status?: string | null, court_ids?: Array<{ __typename?: 'Court', _id?: string | null, label?: string | null, order_index?: number | null, type_name?: string | null } | null> | null, reservation_type_id?: { __typename?: 'ReservationType', _id?: string | null, name?: string | null, background_color?: string | null, text_color?: string | null } | null } | null }>, pagination: { __typename?: 'PaginationInfo', total: number, page: number, limit: number, pages: number } } };

export type GetReservationsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<ReservationFilterInput>;
}>;


export type GetReservationsQuery = { __typename?: 'Query', reservations: { __typename?: 'ReservationResponse', data: Array<{ __typename?: 'Reservation', _id?: string | null, instructors?: string | null, is_lesson?: boolean | null, start_time?: Date | null, end_time?: Date | null, status?: string | null, created_at?: Date | null, updated_at?: Date | null, cancelled_on?: Date | null, court_ids?: Array<{ __typename?: 'Court', _id?: string | null, label?: string | null, order_index?: number | null, type_name?: string | null } | null> | null, reservation_type_id?: { __typename?: 'ReservationType', _id?: string | null, name?: string | null, background_color?: string | null, text_color?: string | null } | null, player_ids?: Array<{ __typename?: 'ReservationPlayer', _id?: string | null, price_to_pay?: number | null, paid_amount?: number | null, unsubscribe_from_marketing_emails?: boolean | null, unsubscribe_from_marketing_text_alerts?: boolean | null, member_id?: { __typename?: 'Member', _id?: string | null, first_name?: string | null, last_name?: string | null, email?: string | null } | null } | null> | null }>, pagination: { __typename?: 'PaginationInfo', total: number, page: number, limit: number, pages: number } } };

export type GetFamiliesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<FamilyFilterInput>;
}>;


export type GetFamiliesQuery = { __typename?: 'Query', families: { __typename?: 'FamilyResponse', data: Array<{ __typename?: 'Family', _id?: string | null, name?: string | null, number?: string | null, created_at?: Date | null, updated_at?: Date | null }>, pagination: { __typename?: 'PaginationInfo', total: number, page: number, limit: number, pages: number } } };

export type GetCourtsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<CourtFilterInput>;
}>;


export type GetCourtsQuery = { __typename?: 'Query', courts: { __typename?: 'CourtResponse', data: Array<{ __typename?: 'Court', _id?: string | null, label?: string | null, order_index?: number | null, type_name?: string | null }>, pagination: { __typename?: 'PaginationInfo', total: number, page: number, limit: number, pages: number } } };

export type GetEventCategoriesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<EventCategoryFilterInput>;
}>;


export type GetEventCategoriesQuery = { __typename?: 'Query', event_categories: { __typename?: 'EventCategoryResponse', data: Array<{ __typename?: 'EventCategory', _id?: string | null, name?: string | null, background_color?: string | null, text_color?: string | null, is_public?: boolean | null }>, pagination: { __typename?: 'PaginationInfo', total: number, page: number, limit: number, pages: number } } };

export type GetReservationTypesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<ReservationTypeFilterInput>;
}>;


export type GetReservationTypesQuery = { __typename?: 'Query', reservation_types: { __typename?: 'ReservationTypeResponse', data: Array<{ __typename?: 'ReservationType', _id?: string | null, name?: string | null, background_color?: string | null, text_color?: string | null, order_index?: number | null }>, pagination: { __typename?: 'PaginationInfo', total: number, page: number, limit: number, pages: number } } };

export type GetMembershipTypesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<MembershipTypeFilterInput>;
}>;


export type GetMembershipTypesQuery = { __typename?: 'Query', membership_types: { __typename?: 'MembershipTypeResponse', data: Array<{ __typename?: 'MembershipType', _id?: string | null, name?: string | null, order_index?: number | null, description?: string | null, short_code?: string | null, is_active?: boolean | null, is_payment_required?: boolean | null, purchase_start_date?: Date | null, purchase_end_date?: Date | null, is_restrict_by_age?: boolean | null, allow_min_age?: number | null, allow_max_age?: number | null, days_past_due_to_suspend?: number | null, days_past_due_to_cancel?: number | null, initiation_price?: number | null, monthly_price?: number | null, quarterly_price?: number | null, annual_price?: number | null, lifetime_price?: number | null, custom_price?: number | null, custom_frequency_value?: string | null, cost_type_additional_features?: Record<string, any> | null, created_at?: Date | null, updated_at?: Date | null }>, pagination: { __typename?: 'PaginationInfo', total: number, page: number, limit: number, pages: number } } };

export type GetPlayerReportsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<PlayerReportFilterInput>;
}>;


export type GetPlayerReportsQuery = { __typename?: 'Query', player_reports: { __typename?: 'PlayerReportResponse', data: Array<{ __typename?: 'PlayerReport', _id?: string | null, start_date_time?: Date | null, end_date_time?: Date | null, created_on_utc?: Date | null, is_cancelled?: boolean | null, is_approved?: boolean | null, cancelled_on_utc?: Date | null, reservation_member_id?: number | null, booking_type?: string | null, created_at?: Date | null, updated_at?: Date | null, member_id?: { __typename?: 'Member', _id?: string | null, first_name?: string | null, last_name?: string | null, email?: string | null } | null, court_ids?: Array<{ __typename?: 'Court', _id?: string | null, label?: string | null, order_index?: number | null, type_name?: string | null } | null> | null }>, pagination: { __typename?: 'PaginationInfo', total: number, page: number, limit: number, pages: number } } };

export type GetRevenueRecognitionQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<RevenueRecognitionFilterInput>;
}>;


export type GetRevenueRecognitionQuery = { __typename?: 'Query', revenue_recognition: { __typename?: 'RevenueRecognitionResponse', data: Array<{ __typename?: 'RevenueRecognition', _id?: string | null, fee_category?: string | null, subtotal?: number | null, tax_total?: number | null, total?: number | null, payment_type?: string | null, start_date_time?: Date | null, end_date_time?: Date | null, paid_date?: Date | null, description?: string | null, relation_id?: string | null, transaction_type?: string | null, package_info?: Record<string, any> | null, created_at?: Date | null, updated_at?: Date | null, member_id?: { __typename?: 'Member', _id?: string | null, first_name?: string | null, last_name?: string | null, email?: string | null } | null, fee_id?: { __typename?: 'Transaction', _id?: string | null } | null, payment_id?: { __typename?: 'Transaction', _id?: string | null } | null }>, pagination: { __typename?: 'PaginationInfo', total: number, page: number, limit: number, pages: number } } };

export type GetReservationPlayersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<ReservationPlayerFilterInput>;
}>;


export type GetReservationPlayersQuery = { __typename?: 'Query', reservation_players: { __typename?: 'ReservationPlayerResponse', data: Array<{ __typename?: 'ReservationPlayer', _id?: string | null, price_to_pay?: number | null, paid_amount?: number | null, unsubscribe_from_marketing_emails?: boolean | null, unsubscribe_from_marketing_text_alerts?: boolean | null, created_at?: Date | null, updated_at?: Date | null, member_id?: { __typename?: 'Member', _id?: string | null, first_name?: string | null, last_name?: string | null, email?: string | null, phone?: string | null } | null }>, pagination: { __typename?: 'PaginationInfo', total: number, page: number, limit: number, pages: number } } };

export type GetEventRegistrationQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<EventRegistrationFilterInput>;
}>;


export type GetEventRegistrationQuery = { __typename?: 'Query', event_registrations: { __typename?: 'EventRegistrationResponse', data: Array<{ __typename?: 'EventRegistration', _id?: string | null, event_date_id?: number | null, start_time?: Date | null, end_time?: Date | null, price_to_pay?: number | null, paid_amount?: number | null, unsubscribe_from_marketing_emails?: boolean | null, unsubscribe_from_marketing_text_alerts?: boolean | null, signed_up_on_utc?: Date | null, cancelled_on_utc?: Date | null, created_at?: Date | null, updated_at?: Date | null, event_id?: { __typename?: 'Event', _id?: string | null, name?: string | null } | null, member_id?: { __typename?: 'Member', _id?: string | null, first_name?: string | null, last_name?: string | null, email?: string | null } | null }>, pagination: { __typename?: 'PaginationInfo', total: number, page: number, limit: number, pages: number } } };

export type GetOrganizationQueryVariables = Exact<{
  organization_id: Scalars['ID']['input'];
}>;


export type GetOrganizationQuery = { __typename?: 'Query', organization: { __typename?: 'OrganizationResponse', data?: { __typename?: 'OrganizationUsers', organization: { __typename?: 'Organization', _id?: string | null, name?: string | null, description?: string | null, slug?: string | null, created_at?: Date | null, updated_at?: Date | null }, userOrganizations: Array<{ __typename?: 'UserOrganization', _id?: string | null, role?: UserRole | null, user_id?: { __typename?: 'Auth', _id?: string | null, email?: string | null, first_name?: string | null, last_name?: string | null } | null, organization_id?: { __typename?: 'Organization', _id?: string | null, name?: string | null, slug?: string | null } | null }> } | null } };


export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LogoutInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ForgotPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgot_password"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reset_password"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const UpdateMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_me"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateMeMutation, UpdateMeMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefreshTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh_token"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"change_password_me"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateCourtDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCourt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CourtInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create_court"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateCourtMutation, CreateCourtMutationVariables>;
export const UpdateCourtDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCourt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CourtInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_court"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateCourtMutation, UpdateCourtMutationVariables>;
export const DeleteCourtDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCourt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_court"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteCourtMutation, DeleteCourtMutationVariables>;
export const CreateMembershipTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMembershipType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MembershipTypeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create_membership_type"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateMembershipTypeMutation, CreateMembershipTypeMutationVariables>;
export const UpdateMembershipTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMembershipType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MembershipTypeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_membership_type"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateMembershipTypeMutation, UpdateMembershipTypeMutationVariables>;
export const DeleteMembershipTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMembershipType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_membership_type"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteMembershipTypeMutation, DeleteMembershipTypeMutationVariables>;
export const CreateReservationTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReservationType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReservationTypeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create_reservation_type"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateReservationTypeMutation, CreateReservationTypeMutationVariables>;
export const UpdateReservationTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateReservationType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReservationTypeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_reservation_type"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateReservationTypeMutation, UpdateReservationTypeMutationVariables>;
export const DeleteReservationTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteReservationType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_reservation_type"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteReservationTypeMutation, DeleteReservationTypeMutationVariables>;
export const CreateFamilyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFamily"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FamilyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create_family"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateFamilyMutation, CreateFamilyMutationVariables>;
export const UpdateFamilyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFamily"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FamilyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_family"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateFamilyMutation, UpdateFamilyMutationVariables>;
export const DeleteFamilyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFamily"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_family"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteFamilyMutation, DeleteFamilyMutationVariables>;
export const CreateMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create_member"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateMemberMutation, CreateMemberMutationVariables>;
export const UpdateMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_member"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateMemberMutation, UpdateMemberMutationVariables>;
export const DeleteMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_member"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteMemberMutation, DeleteMemberMutationVariables>;
export const CreateEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create_event"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateEventMutation, CreateEventMutationVariables>;
export const UpdateEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_event"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateEventMutation, UpdateEventMutationVariables>;
export const DeleteEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_event"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteEventMutation, DeleteEventMutationVariables>;
export const CreateReservationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReservation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReservationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create_reservation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateReservationMutation, CreateReservationMutationVariables>;
export const UpdateReservationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateReservation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReservationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_reservation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateReservationMutation, UpdateReservationMutationVariables>;
export const DeleteReservationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteReservation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_reservation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteReservationMutation, DeleteReservationMutationVariables>;
export const CreateSalesSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSalesSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SalesSummaryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create_sales_summary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateSalesSummaryMutation, CreateSalesSummaryMutationVariables>;
export const UpdateSalesSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSalesSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SalesSummaryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_sales_summary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateSalesSummaryMutation, UpdateSalesSummaryMutationVariables>;
export const DeleteSalesSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSalesSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_sales_summary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteSalesSummaryMutation, DeleteSalesSummaryMutationVariables>;
export const CreateTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TransactionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create_transaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateTransactionMutation, CreateTransactionMutationVariables>;
export const UpdateTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TransactionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_transaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateTransactionMutation, UpdateTransactionMutationVariables>;
export const DeleteTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_transaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteTransactionMutation, DeleteTransactionMutationVariables>;
export const CreatePlayerReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePlayerReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlayerReportInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create_member_report"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreatePlayerReportMutation, CreatePlayerReportMutationVariables>;
export const UpdatePlayerReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePlayerReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlayerReportInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_member_report"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdatePlayerReportMutation, UpdatePlayerReportMutationVariables>;
export const DeletePlayerReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePlayerReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_member_report"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeletePlayerReportMutation, DeletePlayerReportMutationVariables>;
export const CreateRevenueRecognitionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRevenueRecognition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RevenueRecognitionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create_revenue_recognition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateRevenueRecognitionMutation, CreateRevenueRecognitionMutationVariables>;
export const UpdateRevenueRecognitionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRevenueRecognition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RevenueRecognitionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_revenue_recognition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateRevenueRecognitionMutation, UpdateRevenueRecognitionMutationVariables>;
export const DeleteRevenueRecognitionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRevenueRecognition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_revenue_recognition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteRevenueRecognitionMutation, DeleteRevenueRecognitionMutationVariables>;
export const CreateEventCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEventCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create_event_category"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateEventCategoryMutation, CreateEventCategoryMutationVariables>;
export const UpdateEventCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEventCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_event_category"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateEventCategoryMutation, UpdateEventCategoryMutationVariables>;
export const DeleteEventCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEventCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_event_category"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteEventCategoryMutation, DeleteEventCategoryMutationVariables>;
export const DeleteReservationPlayerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteReservationPlayer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_event_registration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteReservationPlayerMutation, DeleteReservationPlayerMutationVariables>;
export const UpdateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrganizationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_organization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;
export const CreateOrganizationUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrganizationUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserOrganizationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add_organization_user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateOrganizationUserMutation, CreateOrganizationUserMutationVariables>;
export const UpdateOrganizationUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrganizationUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserOrganizationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_organization_user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateOrganizationUserMutation, UpdateOrganizationUserMutationVariables>;
export const RemoveOrganizationUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveOrganizationUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveOrganizationUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"remove_organization_user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RemoveOrganizationUserMutation, RemoveOrganizationUserMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"current_organization_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role_in_current_organization"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const MeOrganizationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeOrganizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me_organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<MeOrganizationsQuery, MeOrganizationsQueryVariables>;
export const SalesSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SalesSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SalesSummaryFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sales_summary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"fee_category_name"}},{"kind":"Field","name":{"kind":"Name","value":"item_name"}},{"kind":"Field","name":{"kind":"Name","value":"revenue_category_name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"amount_with_no_tax"}},{"kind":"Field","name":{"kind":"Name","value":"tax_total"}},{"kind":"Field","name":{"kind":"Name","value":"family_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"date_of_birth"}}]}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"court_labels"}},{"kind":"Field","name":{"kind":"Name","value":"payment_type"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_type"}},{"kind":"Field","name":{"kind":"Name","value":"membership_name"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_id"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_date"}},{"kind":"Field","name":{"kind":"Name","value":"paid_date"}},{"kind":"Field","name":{"kind":"Name","value":"item_cost"}},{"kind":"Field","name":{"kind":"Name","value":"instructor_names"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}}]}}]}}]}}]} as unknown as DocumentNode<SalesSummaryQuery, SalesSummaryQueryVariables>;
export const GetTransactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTransactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TransactionsFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"member_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"date_of_birth"}},{"kind":"Field","name":{"kind":"Name","value":"family_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"transaction_type"}},{"kind":"Field","name":{"kind":"Name","value":"payment_type"}},{"kind":"Field","name":{"kind":"Name","value":"reservation_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_time"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"court_ids"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"order_index"}},{"kind":"Field","name":{"kind":"Name","value":"type_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reservation_type_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"event_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"transaction_date"}},{"kind":"Field","name":{"kind":"Name","value":"is_paid"}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"}},{"kind":"Field","name":{"kind":"Name","value":"tax_total"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"unpaid_amount"}},{"kind":"Field","name":{"kind":"Name","value":"paid_on"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"reservation_start"}},{"kind":"Field","name":{"kind":"Name","value":"reservation_end"}},{"kind":"Field","name":{"kind":"Name","value":"account_creation_date"}},{"kind":"Field","name":{"kind":"Name","value":"instructors"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}}]}}]}}]}}]} as unknown as DocumentNode<GetTransactionsQuery, GetTransactionsQueryVariables>;
export const ImportHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ImportHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ImportHistoryFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"import_history"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"collection_name"}},{"kind":"Field","name":{"kind":"Name","value":"record_count"}},{"kind":"Field","name":{"kind":"Name","value":"import_date"}},{"kind":"Field","name":{"kind":"Name","value":"checksum"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"error_message"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}}]}}]}}]}}]} as unknown as DocumentNode<ImportHistoryQuery, ImportHistoryQueryVariables>;
export const GetMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MemberFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"family_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"date_of_birth"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zip_code"}},{"kind":"Field","name":{"kind":"Name","value":"membership_type_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"membership_assignment_type"}},{"kind":"Field","name":{"kind":"Name","value":"membership_status"}},{"kind":"Field","name":{"kind":"Name","value":"membership_start_date"}},{"kind":"Field","name":{"kind":"Name","value":"membership_end_date"}},{"kind":"Field","name":{"kind":"Name","value":"family_role"}},{"kind":"Field","name":{"kind":"Name","value":"allow_child_login"}},{"kind":"Field","name":{"kind":"Name","value":"profile_image_url"}},{"kind":"Field","name":{"kind":"Name","value":"user_defined_fields"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"}},{"kind":"Field","name":{"kind":"Name","value":"external_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}}]}}]}}]}}]} as unknown as DocumentNode<GetMembersQuery, GetMembersQueryVariables>;
export const GetPublicMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MemberFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}}]}}]}}]}}]} as unknown as DocumentNode<GetPublicMembersQuery, GetPublicMembersQueryVariables>;
export const GetEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EventFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"background_color"}},{"kind":"Field","name":{"kind":"Name","value":"text_color"}},{"kind":"Field","name":{"kind":"Name","value":"is_public"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reservation_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"court_ids"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"order_index"}},{"kind":"Field","name":{"kind":"Name","value":"type_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reservation_type_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"background_color"}},{"kind":"Field","name":{"kind":"Name","value":"text_color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_time"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"background_color"}},{"kind":"Field","name":{"kind":"Name","value":"is_registered"}},{"kind":"Field","name":{"kind":"Name","value":"sso_url"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}},{"kind":"Field","name":{"kind":"Name","value":"max_registrants"}},{"kind":"Field","name":{"kind":"Name","value":"registered_count"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}}]}}]}}]}}]} as unknown as DocumentNode<GetEventsQuery, GetEventsQueryVariables>;
export const GetReservationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReservations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ReservationFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reservations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"court_ids"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"order_index"}},{"kind":"Field","name":{"kind":"Name","value":"type_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reservation_type_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"background_color"}},{"kind":"Field","name":{"kind":"Name","value":"text_color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instructors"}},{"kind":"Field","name":{"kind":"Name","value":"is_lesson"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_time"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"cancelled_on"}},{"kind":"Field","name":{"kind":"Name","value":"player_ids"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"member_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price_to_pay"}},{"kind":"Field","name":{"kind":"Name","value":"paid_amount"}},{"kind":"Field","name":{"kind":"Name","value":"unsubscribe_from_marketing_emails"}},{"kind":"Field","name":{"kind":"Name","value":"unsubscribe_from_marketing_text_alerts"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}}]}}]}}]}}]} as unknown as DocumentNode<GetReservationsQuery, GetReservationsQueryVariables>;
export const GetFamiliesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFamilies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FamilyFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"families"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}}]}}]}}]}}]} as unknown as DocumentNode<GetFamiliesQuery, GetFamiliesQueryVariables>;
export const GetCourtsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCourts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CourtFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"order_index"}},{"kind":"Field","name":{"kind":"Name","value":"type_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}}]}}]}}]}}]} as unknown as DocumentNode<GetCourtsQuery, GetCourtsQueryVariables>;
export const GetEventCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EventCategoryFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event_categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"background_color"}},{"kind":"Field","name":{"kind":"Name","value":"text_color"}},{"kind":"Field","name":{"kind":"Name","value":"is_public"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}}]}}]}}]}}]} as unknown as DocumentNode<GetEventCategoriesQuery, GetEventCategoriesQueryVariables>;
export const GetReservationTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReservationTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ReservationTypeFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reservation_types"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"background_color"}},{"kind":"Field","name":{"kind":"Name","value":"text_color"}},{"kind":"Field","name":{"kind":"Name","value":"order_index"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}}]}}]}}]}}]} as unknown as DocumentNode<GetReservationTypesQuery, GetReservationTypesQueryVariables>;
export const GetMembershipTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMembershipTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MembershipTypeFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membership_types"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order_index"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"short_code"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"is_payment_required"}},{"kind":"Field","name":{"kind":"Name","value":"purchase_start_date"}},{"kind":"Field","name":{"kind":"Name","value":"purchase_end_date"}},{"kind":"Field","name":{"kind":"Name","value":"is_restrict_by_age"}},{"kind":"Field","name":{"kind":"Name","value":"allow_min_age"}},{"kind":"Field","name":{"kind":"Name","value":"allow_max_age"}},{"kind":"Field","name":{"kind":"Name","value":"days_past_due_to_suspend"}},{"kind":"Field","name":{"kind":"Name","value":"days_past_due_to_cancel"}},{"kind":"Field","name":{"kind":"Name","value":"initiation_price"}},{"kind":"Field","name":{"kind":"Name","value":"monthly_price"}},{"kind":"Field","name":{"kind":"Name","value":"quarterly_price"}},{"kind":"Field","name":{"kind":"Name","value":"annual_price"}},{"kind":"Field","name":{"kind":"Name","value":"lifetime_price"}},{"kind":"Field","name":{"kind":"Name","value":"custom_price"}},{"kind":"Field","name":{"kind":"Name","value":"custom_frequency_value"}},{"kind":"Field","name":{"kind":"Name","value":"cost_type_additional_features"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}}]}}]}}]}}]} as unknown as DocumentNode<GetMembershipTypesQuery, GetMembershipTypesQueryVariables>;
export const GetPlayerReportsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlayerReports"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlayerReportFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player_reports"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"member_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"start_date_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_date_time"}},{"kind":"Field","name":{"kind":"Name","value":"created_on_utc"}},{"kind":"Field","name":{"kind":"Name","value":"is_cancelled"}},{"kind":"Field","name":{"kind":"Name","value":"is_approved"}},{"kind":"Field","name":{"kind":"Name","value":"cancelled_on_utc"}},{"kind":"Field","name":{"kind":"Name","value":"reservation_member_id"}},{"kind":"Field","name":{"kind":"Name","value":"court_ids"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"order_index"}},{"kind":"Field","name":{"kind":"Name","value":"type_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"booking_type"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}}]}}]}}]}}]} as unknown as DocumentNode<GetPlayerReportsQuery, GetPlayerReportsQueryVariables>;
export const GetRevenueRecognitionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRevenueRecognition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RevenueRecognitionFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revenue_recognition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"fee_category"}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"}},{"kind":"Field","name":{"kind":"Name","value":"tax_total"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"payment_type"}},{"kind":"Field","name":{"kind":"Name","value":"start_date_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_date_time"}},{"kind":"Field","name":{"kind":"Name","value":"paid_date"}},{"kind":"Field","name":{"kind":"Name","value":"member_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"fee_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payment_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"relation_id"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_type"}},{"kind":"Field","name":{"kind":"Name","value":"package_info"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}}]}}]}}]}}]} as unknown as DocumentNode<GetRevenueRecognitionQuery, GetRevenueRecognitionQueryVariables>;
export const GetReservationPlayersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReservationPlayers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ReservationPlayerFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reservation_players"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"member_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price_to_pay"}},{"kind":"Field","name":{"kind":"Name","value":"paid_amount"}},{"kind":"Field","name":{"kind":"Name","value":"unsubscribe_from_marketing_emails"}},{"kind":"Field","name":{"kind":"Name","value":"unsubscribe_from_marketing_text_alerts"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}}]}}]}}]}}]} as unknown as DocumentNode<GetReservationPlayersQuery, GetReservationPlayersQueryVariables>;
export const GetEventRegistrationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventRegistration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EventRegistrationFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event_registrations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"event_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"event_date_id"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_time"}},{"kind":"Field","name":{"kind":"Name","value":"price_to_pay"}},{"kind":"Field","name":{"kind":"Name","value":"paid_amount"}},{"kind":"Field","name":{"kind":"Name","value":"unsubscribe_from_marketing_emails"}},{"kind":"Field","name":{"kind":"Name","value":"unsubscribe_from_marketing_text_alerts"}},{"kind":"Field","name":{"kind":"Name","value":"signed_up_on_utc"}},{"kind":"Field","name":{"kind":"Name","value":"cancelled_on_utc"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}}]}}]}}]}}]} as unknown as DocumentNode<GetEventRegistrationQuery, GetEventRegistrationQueryVariables>;
export const GetOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organization_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organization_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organization_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userOrganizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization_id"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOrganizationQuery, GetOrganizationQueryVariables>;