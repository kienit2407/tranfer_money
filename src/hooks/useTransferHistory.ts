import { useQuery, useQueryClient } from "@tanstack/react-query"
import { transfersApi } from "../services/transfers.api"
import type { TransferHistoryParams, TransferListResponse } from "../types/transfers"
import { useAuth } from "./useAuth"

export const TRANSFER_HISTORY_KEYS = {
  all: ["transfers"] as const,
  list: (params: TransferHistoryParams, type: string) =>
    [...TRANSFER_HISTORY_KEYS.all, "list", type, params] as const,
  international: (params: TransferHistoryParams) =>
    [...TRANSFER_HISTORY_KEYS.all, "international", params] as const,
  domestic: (params: TransferHistoryParams) =>
    [...TRANSFER_HISTORY_KEYS.all, "domestic", params] as const,
}

export function useInternationalHistory(params: TransferHistoryParams) {
  return useQuery({
    queryKey: TRANSFER_HISTORY_KEYS.international(params),
    queryFn: () => transfersApi.getInternational(params),
    staleTime: 1000 * 60, // 1 minute
  })
}

export function useDomesticHistory(params: TransferHistoryParams, enabled = true) {
  return useQuery({
    queryKey: TRANSFER_HISTORY_KEYS.domestic(params),
    queryFn: () => transfersApi.getDomestic(params),
    enabled,
    staleTime: 1000 * 60,
  })
}

export function useAllTransferHistory(params: TransferHistoryParams) {
  const { isAuthenticated } = useAuth()

  return useQuery<TransferListResponse>({
    queryKey: TRANSFER_HISTORY_KEYS.list(params, "all"),
    queryFn: () => transfersApi.getAll(params, isAuthenticated),
    staleTime: 1000 * 60,
  })
}

export function useTransferHistory(
  params: TransferHistoryParams,
  tab: "all" | "international" | "domestic"
) {
  const { isAuthenticated } = useAuth()

  const allQuery = useAllTransferHistory(params)
  const internationalQuery = useInternationalHistory(params)
  const domesticQuery = useDomesticHistory(params, isAuthenticated)

  // Return query based on tab
  switch (tab) {
    case "international":
      return {
        ...internationalQuery,
        data: internationalQuery.data
          ? {
              data: internationalQuery.data.data.map((tx) => ({
                ...tx,
                type: "INTERNATIONAL" as const,
              })),
              meta: internationalQuery.data.meta,
            }
          : undefined,
      }
    case "domestic":
      return {
        ...domesticQuery,
        data: domesticQuery.data
          ? {
              data: domesticQuery.data.data.map((tx) => ({
                ...tx,
                type: "DOMESTIC" as const,
              })),
              meta: domesticQuery.data.meta,
            }
          : undefined,
      }
    default:
      return allQuery
  }
}

export function useInvalidateTransferHistory() {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({ queryKey: TRANSFER_HISTORY_KEYS.all })
  }
}
