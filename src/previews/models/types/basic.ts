export type BillTypeType = 'PURCHASE' | 'JOBWORK' | 'OUTWARD' | 'SALES';
export type ClientType =
  | 'PURCHASE_PARTY'
  | 'JOBWORK_PARTY'
  | 'SALES_PARTY'
  | 'INWARD_PARTY'
  | 'BROKER_PARTY';
export type PaymentStatusType =
  | 'PAID'
  | 'NOT_PAID'
  | 'PART_PAID'
  | 'PENDING'
  | 'DUE';
export type DesignStatusType =
  | 'SKETCHING'
  | 'TRACING'
  | 'PUNCHING'
  | 'REVIEW'
  | 'COMPLETE';
export type StockCategoryType =
  | 'INWARD'
  | 'PURCHASE'
  | 'JOBWORK'
  | 'OUTWARD'
  | 'SALES'
  | 'DESIGN'
  | 'DELIVERED';
export type Unit = 'KALI' | 'PCS' | 'KG' | 'GM' | 'M' | 'CM';
export type PaymentModeType = 'CASH' | 'CHEQUE' | 'RETURN_NOTE';
export type ReturnNoteType = 'DEBIT_NOTE' | 'CREDIT_NOTE';
export type InspectionStatusType = 'ALL' | 'OK' | 'SHORT' | 'RF' | 'SHORT';
export type JobStatusType =
  | 'ALL'
  | 'DUE'
  | 'PENDING'
  | 'IN_PROCESS'
  | 'PART_RECEIVED'
  | 'MOVED_TO_OUTWARD'
  | 'READY_FOR_OUTWARD'
  | 'COMPLETE';
export type SerialStatusType =
  | 'all'
  | 'onlyAvailable'
  | 'unavailable'
  | 'lowInStock';
