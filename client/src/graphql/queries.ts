import { gql, type TypedDocumentNode } from '@apollo/client';

export interface IFilter {
  page?: number;
  limit?: number;
  [key: string]: any;
}

export type UserRole = 'super_admin' | 'org_admin' | 'user';
export const UserRole = {
  SUPER_ADMIN: 'super_admin' as UserRole,
  ORG_ADMIN: 'org_admin' as UserRole,
  USER: 'user' as UserRole
} as const;

export interface Document {
  _id: string;
}

export interface IBaseFilter {
  search?: string;
  start_date?: string;
  end_date?: string;
}

export interface IFamily extends Document {
  name: string;
  number: string;
  created_at: string;
  updated_at: string;
}

export interface IMembershipType extends Document {
  name: string;
  order_index: number;
  description: string;
  short_code: string;
  is_active: boolean;
  is_payment_required: boolean;
  purchase_start_date: string | null;
  purchase_end_date: string | null;
  is_restrict_by_age?: boolean;
  allow_min_age: number | null;
  allow_max_age: number | null;
  days_past_due_to_suspend?: number | null;
  days_past_due_to_cancel?: number | null;
  initiation_price: number | null;
  monthly_price: number | null;
  quarterly_price: number | null;
  annual_price: number | null;
  lifetime_price: number | null;
  custom_price: number | null;
  custom_frequency_value: string | null;
  cost_type_additional_features?: any;
  created_at: string;
  updated_at: string;
}

export interface IMember extends Document {
  family_id?: IFamily;
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
  membership_type_id?: IMembershipType;
  membership_assignment_type?: string;
  membership_status?: string;
  membership_start_date?: string;
  membership_end_date?: string;
  family_role?: string;
  allow_child_login?: boolean;
  profile_image_url?: string;
  user_defined_fields?: any;
  ratings?: any;
  external_id?: string;
  created_at: string;
  updated_at: string;
}

export interface IReservationPlayer extends Document {
  id?: string;
  member_id: IMember;
  price_to_pay: number | null;
  paid_amount: number | null;
  unsubscribe_from_marketing_emails?: boolean;
  unsubscribe_from_marketing_text_alerts?: boolean;
  created_at: string;
  updated_at: string;
}

export interface IEventRegistration extends Document {
  id?: string;
  event_id: IEvent;
  member_id: IMember;
  event_date_id: number;
  start_time: string;
  end_time: string;
  price_to_pay: number | null;
  paid_amount: number | null;
  unsubscribe_from_marketing_emails?: boolean;
  unsubscribe_from_marketing_text_alerts?: boolean;
  signed_up_on_utc: string;
  cancelled_on_utc: string;
  created_at: string;
  updated_at: string;
}

export interface IReservation extends Document {
  id?: string;
  court_ids: ICourt[];
  reservation_type_id: IReservationType;
  instructors?: string;
  is_lesson?: boolean;
  start_time: string;
  end_time: string;
  status?: string;
  created_at: string;
  updated_at: string;
  cancelled_on?: string | null;
  player_ids: IReservationPlayer[];
}

export interface IEvent extends Document {
  id?: string;
  category_id: IEventCategory;
  reservation_id: IReservation;
  name: string;
  start_date: string;
  end_date: string;
  background_color: string;
  is_registered: boolean;
  sso_url: string;
  image_url: string;
  max_registrants: number;
  registered_count: number;
  created_at: string;
  updated_at: string;
}

export interface IEventCategory extends Document {
  name: string;
  background_color: string;
  text_color: string;
  is_public: boolean;
}

export interface IReservationType extends Document {
  name: string;
  background_color: string;
  text_color: string;
  order_index: number;
}

export interface IPlayerReport extends Document {
  member_id: IMember;
  start_date_time: string | null;
  end_date_time: string | null;
  created_on_utc: string;
  is_cancelled: boolean;
  is_approved: boolean;
  cancelled_on_utc: string | null;
  reservation_member_id: number;
  court_ids: ICourt[];
  booking_type: string;
  reservation_id: IReservation;
  created_at: string;
}

export interface IRevenueRecognition extends Document {
  fee_category: string;
  subtotal: number;
  tax_total: number;
  total: number;
  payment_type: string;
  member_id: IMember;
  start_date_time: string;
  end_date_time: string;
  paid_date: string;
  description: string;
  additional_dates: string[];
  fee_id: ITransaction;
  payment_id: ITransaction;
  transaction_type: string;
  instructor_names: string;
  membership_name: string;
  package_info: any | null;
  created_at: string;
  updated_at: string;
}

export interface ICourt extends Document {
  label: string;
  type_name: string;
  order_index: number;
}

export interface ISalesSummary extends Document {
  fee_category_name: string;
  item_name: string;
  revenue_category_name: string;
  amount: number;
  amount_with_no_tax: number;
  tax_total: number;
  family_id?: IFamily;
  member_id: IMember;
  start: string;
  end: string;
  court_labels: string;
  payment_type: string;
  transaction_type: string;
  membership_name: string;
  instructor_names: string;
  transaction_id: string;
  transaction_date: string;
  paid_date: string;
  item_cost: number;
}

export interface ITransaction extends Document {
  member_id: IMember;
  transaction_type: string;
  payment_type: string;
  reservation_id: IReservation;
  event_id: IEvent;
  transaction_date: string;
  is_paid: boolean;
  transaction_id?: number;
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

export interface IImportHistory extends Document {
  filename: string;
  collection_name: string;
  record_count: number;
  import_date: string;
  checksum?: string;
  status: 'success' | 'failed' | 'duplicate';
  error_message?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface IEvent extends Document {
  category_id: IEventCategory;
  reservation_id: IReservation;
  name: string;
  start_date: string;
  end_date: string;
  background_color: string;
  is_registered: boolean;
  sso_url: string;
  image_url: string;
  max_registrants: number;
  registered_count: number;
  created_at: string;
  updated_at: string;
}

export interface IOrganization extends Document {
  name: string;
  description?: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface IUserOrganization extends Document {
  user_id: IAuthUser;
  organization_id: IOrganization;
  role: string;
}

export interface IAuthUser extends Document {
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  current_organization_id: IOrganization;
  role_in_current_organization: UserRole | null;
}

export interface Response<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface MeResponse {
  data: IAuthUser;
}

export interface MeOrganizationsResponse {
  data: IUserOrganization[];
}

export interface OrganizationResponse {
  data: {
    organization: IOrganization;
    userOrganizations: IUserOrganization[];
  };
}

export interface QueryVariables<T = unknown> {
  page?: number;
  limit?: number;
  filters?: T;
}

export type EventCategoryFilterInput = IBaseFilter & {
  is_public?: boolean;
};

export type ReservationPlayerFilterInput = IBaseFilter & {
  status?: 'Active' | 'Cancelled';
};

export type EventRegistrationFilterInput = IBaseFilter & {
  status?: 'Active' | 'Cancelled';
};

export type FamilyFilterInput = IBaseFilter;

export type SalesSummaryFilterInput = IBaseFilter;

export type TransactionsFilterInput = IBaseFilter & {
  member_id?: string;
  category?: string;
  payment_type?: string;
  transaction_type?: string;
};

export type ImportHistoryFilterInput = IBaseFilter & {
  status: string;
  collection_name: string;
};

export type MemberFilterInput = IBaseFilter & {
  membership_type_id?: string;
  membership_status?: string[];
  membership_date_range?: {
    start?: string;
    end?: string;
  };
};

export type EventFilterInput = IBaseFilter & {
  category_id?: string;
  name?: string;
  location?: string;
  is_registered?: boolean;
};

export type ReservationFilterInput = IBaseFilter & {
  search?: string;
  member_id?: string;
  court_ids?: string[];
  reservation_type_id?: string;
  start_date?: string;
  end_date?: string;
  status?: string;
  is_lesson?: boolean;
};

export type RevenueRecognitionFilterInput = IBaseFilter & {
  transaction_type?: string;
  payment_type?: string;
};

export type ReservationTypeFilterInput = IBaseFilter;

export type MembershipTypeFilterInput = IBaseFilter;

export type CourtFilterInput = IBaseFilter;

export type PlayerReportFilterInput = IBaseFilter & {
  member_id?: string;
  booking_type?: string;
  is_approved?: boolean;
  court_ids?: string[];
};

export const ME_QUERY: TypedDocumentNode<{ me: MeResponse }> = gql`
  query Me {
    me {
      data {
        _id
        email
        first_name
        last_name
        role
        current_organization_id {
          _id
          name
          description
          slug
        }
        role_in_current_organization
      }
    }
  }
`;

export const ME_ORGANIZATIONS_QUERY: TypedDocumentNode<{ me_organizations: MeOrganizationsResponse }> = gql`
  query MeOrganizations {
    me_organizations {
      data {
        _id
        user_id {
          _id
          email
          first_name
          last_name
        }
        organization_id {
          _id
          name
          description
          slug
        }
        role
      }
    }
  }
`;

export const SALES_SUMMARY_QUERY: TypedDocumentNode<
  {
    sales_summary: Response<ISalesSummary>;
  },
  QueryVariables<SalesSummaryFilterInput>
> = gql`
  query SalesSummary($page: Int, $limit: Int, $filters: SalesSummaryFilterInput) {
    sales_summary(page: $page, limit: $limit, filters: $filters) {
      data {
        _id
        fee_category_name
        item_name
        revenue_category_name
        amount
        amount_with_no_tax
        tax_total
        family_id {
          _id
          name
          number
          created_at
          updated_at
        }
        member_id {
          _id
          first_name
          last_name
          email
          phone
          date_of_birth
        }
        start
        end
        court_labels
        payment_type
        transaction_type
        membership_name
        transaction_id
        transaction_date
        paid_date
        item_cost
        instructor_names
      }
      pagination {
        total
        page
        limit
        pages
      }
    }
  }
`;

export const TRANSACTIONS_QUERY: TypedDocumentNode<
  {
    transactions: Response<ITransaction>;
  },
  QueryVariables<TransactionsFilterInput>
> = gql`
  query GetTransactions($page: Int, $limit: Int, $filters: TransactionsFilterInput) {
    transactions(page: $page, limit: $limit, filters: $filters) {
      data {
        _id
        member_id {
          _id
          first_name
          last_name
          email
          phone
          date_of_birth
          family_id {
            _id
            name
          }
        }
        transaction_type
        payment_type
        reservation_id {
          _id
          start_time
          end_time
          status
          court_ids {
            _id
            label
            order_index
            type_name
          }
          reservation_type_id {
            _id
            name
          }
        }
        event_id {
          _id
          name
          category_id {
            _id
            name
          }
          start_date
          end_date
        }
        transaction_date
        is_paid
        subtotal
        tax_total
        total
        unpaid_amount
        paid_on
        category
        reservation_start
        reservation_end
        account_creation_date
        instructors
      }
      pagination {
        total
        page
        limit
        pages
      }
    }
  }
`;

export const IMPORT_HISTORY_QUERY: TypedDocumentNode<
  {
    import_history: Response<IImportHistory>;
  },
  QueryVariables<{
    start_date?: string;
    end_date?: string;
    status?: 'success' | 'failed' | 'duplicate';
    collection_name?: string;
  }>
> = gql`
  query ImportHistory($page: Int, $limit: Int, $filters: ImportHistoryFilterInput) {
    import_history(page: $page, limit: $limit, filters: $filters) {
      data {
        _id
        filename
        collection_name
        record_count
        import_date
        checksum
        status
        error_message
        metadata
      }
      pagination {
        total
        page
        limit
        pages
      }
    }
  }
`;

export const MEMBERS_QUERY: TypedDocumentNode<
  {
    members: Response<IMember>;
  },
  QueryVariables<MemberFilterInput>
> = gql`
  query GetMembers($page: Int, $limit: Int, $filters: MemberFilterInput) {
    members(page: $page, limit: $limit, filters: $filters) {
      data {
        _id
        family_id {
          _id
          name
          number
        }
        first_name
        last_name
        gender
        email
        phone
        date_of_birth
        address
        city
        state
        zip_code
        membership_type_id {
          _id
          name
        }
        membership_assignment_type
        membership_status
        membership_start_date
        membership_end_date
        family_role
        allow_child_login
        profile_image_url
        user_defined_fields
        ratings
        external_id
        created_at
        updated_at
      }
      pagination {
        total
        page
        limit
        pages
      }
    }
  }
`;

export const PUBLIC_MEMBERS_QUERY: TypedDocumentNode<
  {
    members: Response<IMember>;
  },
  QueryVariables<MemberFilterInput>
> = gql`
  query GetPublicMembers($page: Int, $limit: Int, $filters: MemberFilterInput) {
    members(page: $page, limit: $limit, filters: $filters) {
      data {
        _id
        first_name
        last_name
      }
      pagination {
        total
        page
        limit
        pages
      }
    }
  }
`;

export const EVENTS_QUERY: TypedDocumentNode<
  {
    events: Response<IEvent>;
  },
  QueryVariables<EventFilterInput>
> = gql`
  query GetEvents($page: Int, $limit: Int, $filters: EventFilterInput) {
    events(page: $page, limit: $limit, filters: $filters) {
      data {
        _id
        category_id {
          _id
          name
          background_color
          text_color
          is_public
        }
        reservation_id {
          _id
          court_ids {
            _id
            label
            order_index
            type_name
          }
          reservation_type_id {
            _id
            name
            background_color
            text_color
          }
          start_time
          end_time
          status
        }
        name
        start_date
        end_date
        background_color
        is_registered
        sso_url
        image_url
        max_registrants
        registered_count
        created_at
        updated_at
      }
      pagination {
        total
        page
        limit
        pages
      }
    }
  }
`;

export const RESERVATIONS_QUERY: TypedDocumentNode<
  {
    reservations: Response<IReservation>;
  },
  QueryVariables<ReservationFilterInput>
> = gql`
  query GetReservations($page: Int, $limit: Int, $filters: ReservationFilterInput) {
    reservations(page: $page, limit: $limit, filters: $filters) {
      data {
        _id
        court_ids {
          _id
          label
          order_index
          type_name
        }
        reservation_type_id {
          _id
          name
          background_color
          text_color
        }
        instructors
        is_lesson
        start_time
        end_time
        status
        created_at
        updated_at
        cancelled_on
        player_ids {
          _id
          member_id {
            _id
            first_name
            last_name
            email
          }
          price_to_pay
          paid_amount
          unsubscribe_from_marketing_emails
          unsubscribe_from_marketing_text_alerts
        }
      }
      pagination {
        total
        page
        limit
        pages
      }
    }
  }
`;

export const FAMILIES_QUERY: TypedDocumentNode<
  {
    families: Response<IFamily>;
  },
  QueryVariables<FamilyFilterInput>
> = gql`
  query GetFamilies($page: Int, $limit: Int, $filters: FamilyFilterInput) {
    families(page: $page, limit: $limit, filters: $filters) {
      data {
        _id
        name
        number
        created_at
        updated_at
      }
      pagination {
        total
        page
        limit
        pages
      }
    }
  }
`;

export const COURTS_QUERY: TypedDocumentNode<
  {
    courts: Response<ICourt>;
  },
  QueryVariables<CourtFilterInput>
> = gql`
  query GetCourts($page: Int, $limit: Int, $filters: CourtFilterInput) {
    courts(page: $page, limit: $limit, filters: $filters) {
      data {
        _id
        label
        order_index
        type_name
      }
      pagination {
        total
        page
        limit
        pages
      }
    }
  }
`;

export const EVENT_CATEGORIES_QUERY: TypedDocumentNode<
  {
    event_categories: Response<IEventCategory>;
  },
  QueryVariables<EventCategoryFilterInput>
> = gql`
  query GetEventCategories($page: Int, $limit: Int, $filters: EventCategoryFilterInput) {
    event_categories(page: $page, limit: $limit, filters: $filters) {
      data {
        _id
        name
        background_color
        text_color
        is_public
      }
      pagination {
        total
        page
        limit
        pages
      }
    }
  }
`;

export const RESERVATION_TYPES_QUERY: TypedDocumentNode<
  {
    reservation_types: Response<IReservationType>;
  },
  QueryVariables<ReservationTypeFilterInput>
> = gql`
  query GetReservationTypes($page: Int, $limit: Int, $filters: ReservationTypeFilterInput) {
    reservation_types(page: $page, limit: $limit, filters: $filters) {
      data {
        _id
        name
        background_color
        text_color
        order_index
      }
      pagination {
        total
        page
        limit
        pages
      }
    }
  }
`;

export const MEMBERSHIP_TYPES_QUERY: TypedDocumentNode<
  {
    membership_types: Response<IMembershipType>;
  },
  QueryVariables<MembershipTypeFilterInput>
> = gql`
  query GetMembershipTypes($page: Int, $limit: Int, $filters: MembershipTypeFilterInput) {
    membership_types(page: $page, limit: $limit, filters: $filters) {
      data {
        _id
        name
        order_index
        description
        short_code
        is_active
        is_payment_required
        purchase_start_date
        purchase_end_date
        is_restrict_by_age
        allow_min_age
        allow_max_age
        days_past_due_to_suspend
        days_past_due_to_cancel
        initiation_price
        monthly_price
        quarterly_price
        annual_price
        lifetime_price
        custom_price
        custom_frequency_value
        cost_type_additional_features
        created_at
        updated_at
      }
      pagination {
        total
        page
        limit
        pages
      }
    }
  }
`;

export const MEMBER_REPORTS_QUERY: TypedDocumentNode<
  {
    player_reports: Response<IPlayerReport>;
  },
  QueryVariables<PlayerReportFilterInput>
> = gql`
  query GetPlayerReports($page: Int, $limit: Int, $filters: PlayerReportFilterInput) {
    player_reports(page: $page, limit: $limit, filters: $filters) {
      data {
        _id
        member_id {
          _id
          first_name
          last_name
          email
        }
        start_date_time
        end_date_time
        created_on_utc
        is_cancelled
        is_approved
        cancelled_on_utc
        reservation_member_id
        court_ids {
          _id
          label
          order_index
          type_name
        }
        booking_type
        created_at
        updated_at
      }
      pagination {
        total
        page
        limit
        pages
      }
    }
  }
`;

export const REVENUE_RECOGNITION_QUERY: TypedDocumentNode<
  {
    revenue_recognition: Response<IRevenueRecognition>;
  },
  QueryVariables<RevenueRecognitionFilterInput>
> = gql`
  query GetRevenueRecognition($page: Int, $limit: Int, $filters: RevenueRecognitionFilterInput) {
    revenue_recognition(page: $page, limit: $limit, filters: $filters) {
      data {
        _id
        fee_category
        subtotal
        tax_total
        total
        payment_type
        start_date_time
        end_date_time
        paid_date
        member_id {
          _id
          first_name
          last_name
          email
        }
        description
        fee_id {
          _id
        }
        payment_id {
          _id
        }
        relation_id
        transaction_type
        package_info
        created_at
        updated_at
      }
      pagination {
        total
        page
        limit
        pages
      }
    }
  }
`;

export const RESERVATION_PLAYERS_QUERY: TypedDocumentNode<
  {
    reservation_players: Response<IReservationPlayer>;
  },
  QueryVariables<ReservationPlayerFilterInput>
> = gql`
  query GetReservationPlayers($page: Int, $limit: Int, $filters: ReservationPlayerFilterInput) {
    reservation_players(page: $page, limit: $limit, filters: $filters) {
      data {
        _id
        member_id {
          _id
          first_name
          last_name
          email
          phone
        }
        price_to_pay
        paid_amount
        unsubscribe_from_marketing_emails
        unsubscribe_from_marketing_text_alerts
        created_at
        updated_at
      }
      pagination {
        total
        page
        limit
        pages
      }
    }
  }
`;

export const EVENT_REGISTRATIONS_QUERY: TypedDocumentNode<
  {
    event_registrations: Response<IEventRegistration>;
  },
  QueryVariables<EventRegistrationFilterInput>
> = gql`
  query GetEventRegistration($page: Int, $limit: Int, $filters: EventRegistrationFilterInput) {
    event_registrations(page: $page, limit: $limit, filters: $filters) {
      data {
        _id
        event_id {
          _id
          name
        }
        member_id {
          _id
          first_name
          last_name
          email
        }
        event_date_id
        start_time
        end_time
        price_to_pay
        paid_amount
        unsubscribe_from_marketing_emails
        unsubscribe_from_marketing_text_alerts
        signed_up_on_utc
        cancelled_on_utc
        created_at
        updated_at
      }
      pagination {
        total
        page
        limit
        pages
      }
    }
  }
`;

export const GET_ORGANIZATION: TypedDocumentNode<
  {
    organization: OrganizationResponse;
  },
  { organization_id: string }
> = gql`
  query GetOrganization($organization_id: ID!) {
    organization(organization_id: $organization_id) {
      data {
        organization {
          _id
          name
          description
          slug
          created_at
          updated_at
        }
        userOrganizations {
          _id
          user_id {
            _id
            email
            first_name
            last_name
          }
          organization_id {
            _id
            name
            slug
          }
          role
        }
      }
    }
  }
`;
