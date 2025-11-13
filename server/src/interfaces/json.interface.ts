export interface IFamilyJSON {
  FamilyName: string;
  OrganizationMemberFamilyId: string;
  FamilyNumber: string;
}

export interface IMemberJSON {
  OrganizationMemberId: number;
  MembershipTypeId: number;
  MembershipTypeName: string;
  OrganizationMemberFamilyId?: number;
  FirstName: string;
  LastName: string;
  Gender?: string;
  Email: string;
  Phone?: string;
  DateOfBirth?: string;
  Address?: string;
  City?: string;
  State?: string;
  ZipCode?: string;
  MembershipAssignmentType?: string;
  MembershipStatus?: string;
  FamilyRole?: string;
  AllowChildLogin?: boolean;
  MembershipStartDate?: string;
  MembershipEndDate?: string;
  ProfileImageUrl?: string;
  UserDefinedFields?: any[];
  Ratings?: any[];
  ExternalId?: string;
}

export interface IMembershipTypeJSON {
  Id: number;
  Name: string;
  Description?: string;
  ShortCode?: string;
  IsActive?: boolean;
  OrderIndex?: number;
  IsPaymentRequired?: boolean;
  PurchaseStartDate?: string;
  PurchaseEndDate?: string;
  IsRestrictByAge?: boolean;
  AllowMinAge?: number;
  AllowMaxAge?: number;
  DaysPastDueToSuspend?: number;
  DaysPastDueToCancel?: number;
  InitiationPrice?: number;
  MonthlyPrice?: number;
  QuarterlyPrice?: number;
  AnnualPrice?: number;
  LifetimePrice?: number;
  CustomPrice?: number;
  CustomFrequencyValue?: string;
  CostTypeAdditionalFeatures?: string;
}

export interface ISalesSummaryJSON {
  FeeCategoryName: string;
  ItemName: string;
  RevenueCategoryName: string;
  Amount: number;
  AmountWithNoTax: number;
  TaxTotal: number;
  OrgMemberFamilyId?: string;
  FamilyName?: string;
  OrgMemberId: number;
  MemberFullName: string;
  MembershipName: string;
  Start: string;
  End: string;
  CourtLabels?: string;
  PaymentType: string;
  TransactionType: string;
  InstructorNames?: string;
  TransactionId: number;
  TransactionDate: string;
  PaidDate?: string;
  ItemCost?: number;
}

export interface ICourtJSON {
  Id: number;
  Label?: string;
  TypeName?: string;
  OrderIndex?: number;
}

export interface IRevenueRecognitionJSON {
  FeeCategory: string;
  Subtotal: number;
  TaxTotal: number;
  Total: number;
  PaymentType: string;
  StartDateTime: string;
  EndDateTime: string;
  PaidDate: string;
  OrganizationMemberId: number;
  MemberFirstName: string;
  MemberLastName: string;
  Description: string;
  AdditionalDates: [];
  FeeId: string;
  PaymentId: string;
  RelationId: string;
  TransactionType: string;
  PackageInfo: any;
}

export interface IEventCategoryJSON {
  Id?: string;
  Name: string;
  BackgroundColor: string;
  TextColor: string;
  IsPublic?: boolean;
}

export interface IEventJSON {
  EventId: string;
  EventName: string;
  EventCategoryId: number;
  EventCategoryName: string;
  StartDateTime: string;
  EndDateTime: string;
  ReservationId: string;
  BackgroundColor: string;
  TextColor: string;
  IsRegistered: boolean;
  SsoUrl: string;
  ImageUrl: string;
  MaxRegistrants: number;
  RegisteredCount: number;
  PriceInfo: any[];
  RatingRestrictions: any[];
  TagsInfo: any[];
}

export interface IReservationTypeJSON {
  Id?: number;
  Name: string;
  Description?: string;
  BackgroundColor?: string;
  TextColor?: string;
  OrderIndex?: number;
}

export interface IReservationPlayerJSON {
  OrganizationMemberId: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  PriceToPay: number;
  PaidAmount: number;
  UnsubscribeFromMarketingEmails: boolean;
  UnsubscribeFromMarketingTextAlerts: boolean;
}

export interface IReservationJSON {
  Id: number;
  Courts: string;
  ReservationTypeId: number;
  ReservationTypeName: string;
  Instructors?: string;
  IsLesson?: boolean;
  StartTime: string;
  EndTime: string;
  CreatedOnUtc: string;
  UpdatedOnUtc: string;
  CancelledOn: string;
  Players?: IReservationPlayerJSON[];
  UserDefinedFields?: any[];
}

export interface IPlayerReportJSON {
  OrganizationMemberId: number;
  MemberFirstName: string;
  MemberLastName: string;
  MemberEmail: string;
  StartDateTime: string;
  EndDateTime: string;
  CreatedOnUtc: string;
  IsCancelled: boolean;
  IsApproved: boolean;
  CancelledOnUtc: string | null;
  ReservationMemberId: string;
  CourtData: {
    CourtId: number;
    CourtName: string;
    CourtTypeName: string;
  }[];
  BookingType: string;
  EventName: string;
  TypeName: string;
  ReservationId: string;
}

export interface ITransactionJSON {
  TransactionId: number;
  TransactionType: string;
  TransactionDate: string;
  Subtotal: number;
  TaxTotal: number;
  Total: number;
  UnpaidAmount: number;
  PaidOn: string;
  PaymentType: string;
  Category: string;
  ReservationStart: string;
  ReservationEnd: string;
  Instructors: string;
  OrganizationMemberId: number;
  OrganizationFirstName: string;
  OrganizationLastName: string;
  OrganizationMemberEmail: string;
  OrganizationMemberPhone: string;
  AccountCreationDate: string;
}

export interface IEventRegistrationJSON {
  EventId: number;
  EventName: string;
  EventCategoryId: number;
  EventCategoryName: string;
  EventDateId: number;
  StartTime: string;
  EndTime: string;
  OrganizationMemberId: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  PriceToPay: number;
  PaidAmount: number;
  UnsubscribeFromMarketingEmails: boolean;
  UnsubscribeFromMarketingTextAlerts: boolean | null;
  SignedUpOnUtc: string;
  CancelledOnUtc: string | null;
}
