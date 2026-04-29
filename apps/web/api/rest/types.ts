import type { AxiosResponse } from "axios"

export interface PaginationMeta {
  limit: number
  page: number
  total: number
}

export type TCursor = string | null

export interface TPaginationMetaCursor {
  limit: number
  nextCursor: TCursor
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: PaginationMeta
}

export interface PaginatedCursorResponse<T> {
  data: T[]
  pagination: TPaginationMetaCursor
}

/**
 * Generic type for paginated API responses after the interceptor.
 * The interceptor unwraps response.data.data -> response.data
 * and adds response.data.pagination -> response.pagination.
 *
 * @example
 * const getTransactions = (params?: Params): PaginatedApiResponse<Transaction> =>
 *   api.get("/transactions", { params })
 *
 * const response = await getTransactions()
 * response.data // Transaction[]
 * response.pagination // { limit, page, total }
 */
export type PaginatedApiResponse<T> = Promise<
  AxiosResponse<T[], unknown> & { pagination: PaginationMeta }
>

export type PaginatedCursorApiResponse<T> = Promise<
  AxiosResponse<T[], unknown> & { pagination: TPaginationMetaCursor }
>
