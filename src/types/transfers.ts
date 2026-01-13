// Transaction Types for History

export type TransactionType = "INTERNATIONAL" | "DOMESTIC"

export interface BaseTransaction {
  id: string
  type: TransactionType
  createdAt: string
}

export interface InternationalTransaction extends BaseTransaction {
  type: "INTERNATIONAL"
  amountJPY: number
  amountVND: number
  rate: number
  fee: number
}

export interface DomesticTransaction extends BaseTransaction {
  type: "DOMESTIC"
  amountVND: number
  recipientName: string
  recipientAccountOrPhone: string
  pointsEarned: number
  totalPointsAfter: number
}

export type Transaction = InternationalTransaction | DomesticTransaction

export interface PaginationMeta {
  page: number
  pageSize: number
  total: number
}

export interface TransferListResponse {
  data: Transaction[]
  meta: PaginationMeta
}

export interface TransferHistoryParams {
  page?: number
  pageSize?: number
  q?: string
  type?: "all" | "international" | "domestic"
}

// Type guards
export function isInternationalTransaction(tx: Transaction): tx is InternationalTransaction {
  return tx.type === "INTERNATIONAL"
}

export function isDomesticTransaction(tx: Transaction): tx is DomesticTransaction {
  return tx.type === "DOMESTIC"
}
