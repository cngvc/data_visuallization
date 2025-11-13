import { gql, type TypedDocumentNode } from '@apollo/client';

export interface MutationResponse {
  success: boolean;
  message: string;
}

export interface CourtInput {
  order_index: number;
  label: string;
  type_name: string;
}

export interface ReservationTypeInput {
  name: string;
  background_color: string;
  text_color: string;
  order_index: number;
}

export interface SalesSummaryInput {
  fee_category_name?: string;
  item_name?: string;
  revenue_category_name?: string;
  amount?: number;
  amount_with_no_tax?: number;
  tax_total?: number;
  family_id?: string;
  member_id?: string;
  start?: string;
  end?: string;
  court_labels?: string;
  payment_type?: string;
  transaction_type?: string;
  transaction_id?: string;
  transaction_date?: string;
  paid_date?: string;
  item_cost?: number;
}

export interface TransactionInput {
  member_id?: string;
  transaction_type?: string;
  payment_type?: string;
  transaction_date?: string;
  is_paid?: boolean;
  subtotal?: number;
  tax_total?: number;
  total?: number;
  unpaid_amount?: number;
  paid_on?: string;
  category?: string;
  reservation_start?: string;
  reservation_end?: string;
  account_creation_date?: string;
}

export interface FamilyInput {
  name: string;
  number?: string;
}

export interface MemberInput {
  family_id?: string;
  first_name: string;
  last_name: string;
  gender?: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  membership_type_id?: string;
  membership_assignment_type?: string;
  membership_status?: string;
  membership_start_date?: string;
  membership_end_date?: string;
  family_role?: string;
  allow_child_login?: boolean;
  profile_image_url?: string;
}

export interface EventCategoryInput {
  name: string;
  background_color?: string;
  text_color?: string;
  is_public?: boolean;
}

export interface EventInput {
  category_id?: string;
  reservation_id?: string;
  name: string;
  start_date: string;
  end_date?: string;
  background_color?: string;
  is_registered?: boolean;
  sso_url?: string;
  image_url?: string;
  max_registrants?: number;
  registered_count?: number;
}

export interface MembershipTypeInput {
  name: string;
  order_index: number;
  description?: string;
  short_code?: string;
  is_active?: boolean;
  is_payment_required?: boolean;
  purchase_start_date?: string | null;
  purchase_end_date?: string | null;
  is_restrict_by_age?: boolean;
  allow_min_age?: number | null;
  allow_max_age?: number | null;
  days_past_due_to_suspend?: number | null;
  days_past_due_to_cancel?: number | null;
  initiation_price?: number | null;
  monthly_price?: number | null;
  quarterly_price?: number | null;
  annual_price?: number | null;
  lifetime_price?: number | null;
  custom_price?: number | null;
  custom_frequency_value?: string | null;
}

export interface ReservationInput {
  reservation_type_id: string;
  court_ids: string[];
  start_time: string;
  end_time: string;
  status?: string;
  cancelled_on?: string | null;
  player_ids?: string[];
}

export interface PlayerReportInput {
  member_id: string;
  start_date_time: string;
  end_date_time: string;
  is_cancelled?: boolean;
  is_approved?: boolean;
  cancelled_on_utc?: string | null;
  reservation_member_id?: number;
  court_ids?: string[];
  booking_type: string;
  reservation_id?: string;
}

export interface RevenueRecognitionInput {
  fee_category: string;
  subtotal: number;
  tax_total: number;
  total: number;
  payment_type: string;
  start_date_time: string;
  end_date_time: string;
  paid_date?: string;
  member_id?: string;
  description?: string;
  additional_dates?: string[];
  fee_id?: string;
  transaction_type: string;
  package_info?: any;
}

export interface OrganizationInput {
  name: string;
  description?: string;
}

export interface OrganizationUserInput {
  user_id?: string;
  organization_id: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  role: string;
}

export interface UserOrganizationInput {
  user_id?: string;
  organization_id: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  role: string;
}

export const CREATE_COURT: TypedDocumentNode<
  {
    create_court: MutationResponse;
  },
  { input: CourtInput }
> = gql`
  mutation CreateCourt($input: CourtInput!) {
    create_court(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_COURT: TypedDocumentNode<
  {
    update_court: MutationResponse;
  },
  { id: string; input: CourtInput }
> = gql`
  mutation UpdateCourt($id: ID!, $input: CourtInput!) {
    update_court(id: $id, input: $input) {
      success
      message
    }
  }
`;

export const DELETE_COURT: TypedDocumentNode<
  {
    delete_court: MutationResponse;
  },
  { id: string }
> = gql`
  mutation DeleteCourt($id: ID!) {
    delete_court(id: $id) {
      success
      message
    }
  }
`;

export const CREATE_MEMBERSHIP_TYPE: TypedDocumentNode<
  {
    create_membership_type: MutationResponse;
  },
  { input: MembershipTypeInput }
> = gql`
  mutation CreateMembershipType($input: MembershipTypeInput!) {
    create_membership_type(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_MEMBERSHIP_TYPE: TypedDocumentNode<
  {
    update_membership_type: MutationResponse;
  },
  { id: string; input: MembershipTypeInput }
> = gql`
  mutation UpdateMembershipType($id: ID!, $input: MembershipTypeInput!) {
    update_membership_type(id: $id, input: $input) {
      success
      message
    }
  }
`;

export const DELETE_MEMBERSHIP_TYPE: TypedDocumentNode<
  {
    delete_membership_type: MutationResponse;
  },
  { id: string }
> = gql`
  mutation DeleteMembershipType($id: ID!) {
    delete_membership_type(id: $id) {
      success
      message
    }
  }
`;

export const CREATE_RESERVATION_TYPE: TypedDocumentNode<{ create_reservation_type: MutationResponse }, { input: ReservationTypeInput }> =
  gql`
    mutation CreateReservationType($input: ReservationTypeInput!) {
      create_reservation_type(input: $input) {
        success
        message
      }
    }
  `;

export const UPDATE_RESERVATION_TYPE: TypedDocumentNode<
  { update_reservation_type: MutationResponse },
  { id: string; input: ReservationTypeInput }
> = gql`
  mutation UpdateReservationType($id: ID!, $input: ReservationTypeInput!) {
    update_reservation_type(id: $id, input: $input) {
      success
      message
    }
  }
`;

export const DELETE_RESERVATION_TYPE: TypedDocumentNode<{ delete_reservation_type: MutationResponse }, { id: string }> = gql`
  mutation DeleteReservationType($id: ID!) {
    delete_reservation_type(id: $id) {
      success
      message
    }
  }
`;

export const CREATE_FAMILY: TypedDocumentNode<
  {
    create_family: MutationResponse;
  },
  { input: FamilyInput }
> = gql`
  mutation CreateFamily($input: FamilyInput!) {
    create_family(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_FAMILY: TypedDocumentNode<
  {
    update_family: MutationResponse;
  },
  { id: string; input: FamilyInput }
> = gql`
  mutation UpdateFamily($id: ID!, $input: FamilyInput!) {
    update_family(id: $id, input: $input) {
      success
      message
    }
  }
`;

export const DELETE_FAMILY: TypedDocumentNode<
  {
    delete_family: MutationResponse;
  },
  { id: string }
> = gql`
  mutation DeleteFamily($id: ID!) {
    delete_family(id: $id) {
      success
      message
    }
  }
`;

export const CREATE_MEMBER: TypedDocumentNode<
  {
    create_member: MutationResponse;
  },
  { input: MemberInput }
> = gql`
  mutation CreateMember($input: MemberInput!) {
    create_member(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_MEMBER: TypedDocumentNode<
  {
    update_member: MutationResponse;
  },
  { id: string; input: MemberInput }
> = gql`
  mutation UpdateMember($id: ID!, $input: MemberInput!) {
    update_member(id: $id, input: $input) {
      success
      message
    }
  }
`;

export const DELETE_MEMBER: TypedDocumentNode<
  {
    delete_member: MutationResponse;
  },
  { id: string }
> = gql`
  mutation DeleteMember($id: ID!) {
    delete_member(id: $id) {
      success
      message
    }
  }
`;

export const CREATE_EVENT: TypedDocumentNode<
  {
    create_event: MutationResponse;
  },
  { input: EventInput }
> = gql`
  mutation CreateEvent($input: EventInput!) {
    create_event(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_EVENT: TypedDocumentNode<
  {
    update_event: MutationResponse;
  },
  { id: string; input: EventInput }
> = gql`
  mutation UpdateEvent($id: ID!, $input: EventInput!) {
    update_event(id: $id, input: $input) {
      success
      message
    }
  }
`;

export const DELETE_EVENT: TypedDocumentNode<
  {
    delete_event: MutationResponse;
  },
  { id: string }
> = gql`
  mutation DeleteEvent($id: ID!) {
    delete_event(id: $id) {
      success
      message
    }
  }
`;

export const CREATE_RESERVATION: TypedDocumentNode<
  {
    create_reservation: MutationResponse;
  },
  { input: ReservationInput }
> = gql`
  mutation CreateReservation($input: ReservationInput!) {
    create_reservation(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_RESERVATION: TypedDocumentNode<
  {
    update_reservation: MutationResponse;
  },
  { id: string; input: ReservationInput }
> = gql`
  mutation UpdateReservation($id: ID!, $input: ReservationInput!) {
    update_reservation(id: $id, input: $input) {
      success
      message
    }
  }
`;

export const DELETE_RESERVATION: TypedDocumentNode<
  {
    delete_reservation: MutationResponse;
  },
  { id: string }
> = gql`
  mutation DeleteReservation($id: ID!) {
    delete_reservation(id: $id) {
      success
      message
    }
  }
`;

export const CREATE_SALES_SUMMARY: TypedDocumentNode<
  {
    create_sales_summary: MutationResponse;
  },
  { input: SalesSummaryInput }
> = gql`
  mutation CreateSalesSummary($input: SalesSummaryInput!) {
    create_sales_summary(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_SALES_SUMMARY: TypedDocumentNode<
  {
    update_sales_summary: MutationResponse;
  },
  { id: string; input: SalesSummaryInput }
> = gql`
  mutation UpdateSalesSummary($id: ID!, $input: SalesSummaryInput!) {
    update_sales_summary(id: $id, input: $input) {
      success
      message
    }
  }
`;

export const DELETE_SALES_SUMMARY: TypedDocumentNode<
  {
    delete_sales_summary: MutationResponse;
  },
  { id: string }
> = gql`
  mutation DeleteSalesSummary($id: ID!) {
    delete_sales_summary(id: $id) {
      success
      message
    }
  }
`;

export const CREATE_TRANSACTION: TypedDocumentNode<
  {
    create_transaction: MutationResponse;
  },
  { input: TransactionInput }
> = gql`
  mutation CreateTransaction($input: TransactionInput!) {
    create_transaction(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_TRANSACTION: TypedDocumentNode<
  {
    update_transaction: MutationResponse;
  },
  { id: string; input: TransactionInput }
> = gql`
  mutation UpdateTransaction($id: ID!, $input: TransactionInput!) {
    update_transaction(id: $id, input: $input) {
      success
      message
    }
  }
`;

export const DELETE_TRANSACTION: TypedDocumentNode<
  {
    delete_transaction: MutationResponse;
  },
  { id: string }
> = gql`
  mutation DeleteTransaction($id: ID!) {
    delete_transaction(id: $id) {
      success
      message
    }
  }
`;

export const CREATE_MEMBER_REPORT: TypedDocumentNode<
  {
    create_member_report: MutationResponse;
  },
  { input: PlayerReportInput }
> = gql`
  mutation CreatePlayerReport($input: PlayerReportInput!) {
    create_member_report(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_MEMBER_REPORT: TypedDocumentNode<
  {
    update_member_report: MutationResponse;
  },
  { id: string; input: PlayerReportInput }
> = gql`
  mutation UpdatePlayerReport($id: ID!, $input: PlayerReportInput!) {
    update_member_report(id: $id, input: $input) {
      success
      message
    }
  }
`;

export const DELETE_MEMBER_REPORT: TypedDocumentNode<
  {
    delete_member_report: MutationResponse;
  },
  { id: string }
> = gql`
  mutation DeletePlayerReport($id: ID!) {
    delete_member_report(id: $id) {
      success
      message
    }
  }
`;

export const CREATE_REVENUE_RECOGNITION: TypedDocumentNode<
  {
    create_revenue_recognition: MutationResponse;
  },
  { input: RevenueRecognitionInput }
> = gql`
  mutation CreateRevenueRecognition($input: RevenueRecognitionInput!) {
    create_revenue_recognition(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_REVENUE_RECOGNITION: TypedDocumentNode<
  {
    update_revenue_recognition: MutationResponse;
  },
  { id: string; input: RevenueRecognitionInput }
> = gql`
  mutation UpdateRevenueRecognition($id: ID!, $input: RevenueRecognitionInput!) {
    update_revenue_recognition(id: $id, input: $input) {
      success
      message
    }
  }
`;

export const DELETE_REVENUE_RECOGNITION: TypedDocumentNode<
  {
    delete_revenue_recognition: MutationResponse;
  },
  { id: string }
> = gql`
  mutation DeleteRevenueRecognition($id: ID!) {
    delete_revenue_recognition(id: $id) {
      success
      message
    }
  }
`;

export const CREATE_EVENT_CATEGORY: TypedDocumentNode<
  {
    create_event_category: MutationResponse;
  },
  { input: EventCategoryInput }
> = gql`
  mutation CreateEventCategory($input: EventCategoryInput!) {
    create_event_category(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_EVENT_CATEGORY: TypedDocumentNode<
  {
    update_event_category: MutationResponse;
  },
  { id: string; input: EventCategoryInput }
> = gql`
  mutation UpdateEventCategory($id: ID!, $input: EventCategoryInput!) {
    update_event_category(id: $id, input: $input) {
      success
      message
    }
  }
`;

export const DELETE_EVENT_CATEGORY: TypedDocumentNode<
  {
    delete_event_category: MutationResponse;
  },
  { id: string }
> = gql`
  mutation DeleteEventCategory($id: ID!) {
    delete_event_category(id: $id) {
      success
      message
    }
  }
`;

export const DELETE_EVENT_REGISTRATION: TypedDocumentNode<
  {
    delete_event_registration: MutationResponse;
  },
  { id: string }
> = gql`
  mutation DeleteReservationPlayer($id: ID!) {
    delete_event_registration(id: $id) {
      success
      message
    }
  }
`;

export const UPDATE_ORGANIZATION_MUTATION: TypedDocumentNode<
  {
    update_organization: MutationResponse;
  },
  { id: string; input: OrganizationInput }
> = gql`
  mutation UpdateOrganization($id: ID!, $input: OrganizationInput!) {
    update_organization(id: $id, input: $input) {
      success
      message
    }
  }
`;

export const ADD_ORGANIZATION_USER: TypedDocumentNode<
  {
    add_organization_user: MutationResponse & { userId?: string };
  },
  { input: UserOrganizationInput }
> = gql`
  mutation CreateOrganizationUser($input: UserOrganizationInput!) {
    add_organization_user(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_ORGANIZATION_USER: TypedDocumentNode<
  {
    update_organization_user: MutationResponse;
  },
  { id: string; input: UserOrganizationInput }
> = gql`
  mutation UpdateOrganizationUser($id: ID!, $input: UserOrganizationInput!) {
    update_organization_user(id: $id, input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_ORGANIZATION_USER: TypedDocumentNode<
  {
    remove_organization_user: MutationResponse;
  },
  { input: { user_id: string; organization_id: string } }
> = gql`
  mutation RemoveOrganizationUser($input: RemoveOrganizationUserInput!) {
    remove_organization_user(input: $input) {
      success
      message
    }
  }
`;
