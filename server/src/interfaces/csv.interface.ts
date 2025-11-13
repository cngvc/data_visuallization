export interface ISalesSummaryCSV {
  FeeCategoryName: string;
  ItemName: string;
  RevenueCategoryName: string;
  Amount: number;
  AmountWithNoTax: number;
  TaxTotal: number;
  OrgMemberId: number;
  OrgMemberFamilyId: number;
  MembershipName: string;
  Start: string;
  End: string;
  CourtLabels: string;
  PaymentType: string;
  TransactionType: string;
  TransactionId: number;
  TransactionDate: string;
  PaidDate: string;
  ItemCost: string;
}

export interface ITransactionCSV {
  TransactionId: number;
  TransactionType: string;
  TransactionDate: string;
  Subtotal: number;
  TaxTotal: number;
  Total: number;
  UnpaidAmount: number;
  PainOn: string;
  PaymentType: string;
  Category: string;
  Instructors: string;
  ReservationStart: string;
  ReservationEnd: string;
  OrganizationMemberId: string;
  OrganizationFirstName: string;
  OrganizationLastName: string;
  OrganizationMemberEmail: string;
  OrganizationMemberPhone: string;
  AccountCreationDate: string;
}

export interface ICourtCSV {
  Id: string;
  Label: string;
  TypeName: string;
  OrderIndex: string;
}

export interface IMembershipTypeCSV {
  Id: number;
  Name: string;
  Description?: string;
  ShortCode?: string;
  IsActive?: string;
  OrderIndex?: number;
  IsPaymentRequired?: string;
  MembershipPurchaseStartDate?: string;
  MembershipPurchaseEndDate?: string;
  IsRestrictByAge?: string;
  AllowMinAge?: number;
  AllowMaxAge?: number;
  XDaysPastDueToSuspendAccount?: number;
  XDaysPastDueToAutoCancelMembership?: number;
  InitiationPrice?: number;
  QuarterMembershipPrice?: number;
  AnnualMembershipPrice?: number;
  CustomMembershipPrice?: number;
  MonthlyMembershipPrice?: number;
  CustomFrequencyUnitValue?: string;
  LifetimeMembershipPrice?: number;
  CostTypeAdditionalFeatureJson?: string;
  CostTypeAdditionalFeatureList?: string;
}

export interface IReservationTypeCSV {
  Id?: number;
  Name: string;
  BackgroundColor?: string;
  TextColor?: string;
  OrderIndex?: number;
}

export interface IEventCategoryCSV {
  Id?: number;
  Name: string;
  BackgroundColor?: string;
  TextColor?: string;
  IsPublic?: string;
}

export interface IFamilyCSV {
  FamilyName: string;
  OrganizationMemberFamilyId: number;
  FamilyNumber: number;
}

export interface IMemberCSV {
  OrganizationMemberId: number;
  MembershipNumber: number;
  OrganizationMemberFamilyId: number;
  FirstName: string;
  LastName: string;
  Gender: string;
  PhoneNumber: string;
  DateOfBirth: string;
  Address: string;
  City: string;
  State: string;
  ZipCode: string;
  MembershipTypeName: string;
  MembershipTypeId: string;
  MembershipAssignmentType: string;
  MembershipStatus: string;
  Email: string;
  FamilyRole: string;
  UserDefinedFields: string;
  Ratings: string;
  AllowChildToLoginAndUseBookingPrivileges: string;
  MembershipStartDate: string;
  MembershipEndDate: string;
  ExternalId: string;
  ProfileImageUrl: string;
}

export interface IEventCSV {
  EventId: number;
  EventName: string;
  EventCategoryId: number;
  EventCategoryName: string;
  StartDateTime: string;
  EndDateTime: string;
  ReservationId: number;
  BackgroundColor: string;
  TextColor: string;
  IsRegistered: string;
  SsoUrl: string;
  ImageUrl: string;
  MaxRegistrants: number;
  RegisteredCount: number;
  PriceInfo: string;
  RatingRestrictions: string;
  TagsInfo: string;
}

export interface IEventRegistrationCSV {
  EventId: number;
  EventName: string;
  IsTeamEvent: string;
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
  UnsubscribeFromMarketingEmails: string;
  UnsubscribeFromMarketingTextAlerts: string;
  SignedUpOnUtc: string;
  CancelledOnUtc: string;
}

export interface IPlayerReportCSV {
  OrganizationMemberId: number;
  MemberFirstName: string;
  MemberLastName: string;
  MemberEmail: string;
  StartDateTime: string;
  EndDateTime: string;
  CreatedOnUtc: string;
  IsCancelled: string;
  IsApproved: string;
  CancelledOnUtc: string;
  ReservationMemberId: number;
  CourtData: {
    CourtId: number;
    CourtName: string;
    CourtTypeName: string;
  }[];
  BookingType: string;
  EventName: string;
  TypeName: string;
  ReservationId: number;
}

export interface IReservationPlayerCSV {
  Id: number;
  OrganizationMemberId: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  PriceToPay: number;
  PaidAmount: number;
  UnsubscribeFromMarketingEmails: string;
  UnsubscribeFromMarketingTextAlerts: string;
}

export interface IReservationCSV {
  Id: number;
  Courts: string;
  ReservationTypeId: number;
  ReservationTypeName: string;
  Instructors?: string;
  IsLesson?: string;
  StartTime: string;
  EndTime: string;
  CreatedOnUtc: string;
  UpdatedOnUtc: string;
  CancelledOn: string;
  Players?: IReservationPlayerCSV[];
  UserDefinedFields?: any[];
}

export interface IRevenueRecognitionCSV {
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
