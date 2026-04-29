import type { AxiosPromise } from "axios"

import {
  connectWalletMock,
  getReceiveAddressMock,
  getWalletActivityMock,
  getWalletOverviewMock,
  sendWalletAssetMock,
} from "./mock"
import type {
  TWalletActivityItem,
  TWalletConnectRes,
  TWalletOverviewRes,
  TWalletReceiveAddressReq,
  TWalletReceiveAddressRes,
  TWalletSendReq,
  TWalletSendRes,
} from "./types"

const getOverview = (): AxiosPromise<TWalletOverviewRes> => getWalletOverviewMock()

const getActivity = (): AxiosPromise<TWalletActivityItem[]> => getWalletActivityMock()

const connect = (): AxiosPromise<TWalletConnectRes> => connectWalletMock()

const getReceiveAddress = (
  payload: TWalletReceiveAddressReq,
): AxiosPromise<TWalletReceiveAddressRes> => getReceiveAddressMock(payload)

const send = (payload: TWalletSendReq): AxiosPromise<TWalletSendRes> =>
  sendWalletAssetMock(payload)

export const apiWallet = {
  getOverview,
  getActivity,
  connect,
  getReceiveAddress,
  send,
}
