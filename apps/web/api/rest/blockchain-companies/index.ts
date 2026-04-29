import type { AxiosPromise } from "axios"

import { createBlockchainCompaniesInquiryMock, getBlockchainCompaniesMock } from "./mock"
import type {
  TBlockchainCompaniesFilters,
  TBlockchainCompaniesInquiryReq,
  TBlockchainCompaniesInquiryRes,
  TBlockchainCompaniesRes,
} from "./types"

const getCompanies = (
  params?: TBlockchainCompaniesFilters,
): AxiosPromise<TBlockchainCompaniesRes> => getBlockchainCompaniesMock(params)

const createInquiry = (
  payload: TBlockchainCompaniesInquiryReq,
): AxiosPromise<TBlockchainCompaniesInquiryRes> =>
  createBlockchainCompaniesInquiryMock(payload)

export const apiBlockchainCompanies = {
  getCompanies,
  createInquiry,
}
