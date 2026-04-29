import type { AxiosPromise } from "axios"

import {
  getRecentSwapsMock,
  getSwapConfigMock,
  postSwapQuoteMock,
  submitSwapMock,
} from "./mock"
import type {
  TPostSwapQuoteReq,
  TSubmitSwapReq,
  TSubmitSwapRes,
  TSwapConfigRes,
  TSwapQuoteRes,
  TSwapRecentItem,
} from "./types"

const getConfig = (): AxiosPromise<TSwapConfigRes> => getSwapConfigMock()

const postQuote = (payload: TPostSwapQuoteReq): AxiosPromise<TSwapQuoteRes> =>
  postSwapQuoteMock(payload)

const getRecentSwaps = (): AxiosPromise<TSwapRecentItem[]> => getRecentSwapsMock()

const submit = (payload: TSubmitSwapReq): AxiosPromise<TSubmitSwapRes> =>
  submitSwapMock(payload)

export const apiSwap = {
  getConfig,
  postQuote,
  getRecentSwaps,
  submit,
}
