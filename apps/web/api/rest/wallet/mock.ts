import { api } from "@/api/rest/instance"
import { AxiosHeaders, type AxiosPromise } from "axios"

import {
  EWalletActivityStatus,
  EWalletActivityType,
  EWalletAssetAccent,
  EWalletAssetId,
  EWalletNetworkId,
  type TWalletActivityItem,
  type TWalletAsset,
  type TWalletConnectRes,
  type TWalletNetwork,
  type TWalletOverviewRes,
  type TWalletReceiveAddressReq,
  type TWalletReceiveAddressRes,
  type TWalletSecurityItem,
  type TWalletSendReq,
  type TWalletSendRes,
} from "./types"

const MOCK_ADDRESS = "0x8f12aB45d24D9F98C091Bf7C739c06E927B54A21"

const MOCK_ASSETS: TWalletAsset[] = [
  {
    id: EWalletAssetId.ETH,
    symbol: "ETH",
    name: "Ethereum",
    balance: "3.42",
    priceUsd: "3250",
    change24hPercent: "2.4",
    accent: EWalletAssetAccent.BLUE,
  },
  {
    id: EWalletAssetId.USDC,
    symbol: "USDC",
    name: "USD Coin",
    balance: "18420.55",
    priceUsd: "1",
    change24hPercent: "0.0",
    accent: EWalletAssetAccent.GREEN,
  },
  {
    id: EWalletAssetId.WBTC,
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    balance: "0.28",
    priceUsd: "64800",
    change24hPercent: "1.2",
    accent: EWalletAssetAccent.ORANGE,
  },
  {
    id: EWalletAssetId.SOL,
    symbol: "SOL",
    name: "Solana",
    balance: "76.8",
    priceUsd: "142",
    change24hPercent: "-0.8",
    accent: EWalletAssetAccent.PURPLE,
  },
  {
    id: EWalletAssetId.MATIC,
    symbol: "MATIC",
    name: "Polygon",
    balance: "2400",
    priceUsd: "0.72",
    change24hPercent: "3.1",
    accent: EWalletAssetAccent.YELLOW,
  },
]

const MOCK_NETWORKS: TWalletNetwork[] = [
  {
    id: EWalletNetworkId.ETHEREUM,
    name: "Ethereum",
    confirmationTime: "~2 min",
    feeUsd: "7.80",
  },
  {
    id: EWalletNetworkId.ARBITRUM,
    name: "Arbitrum",
    confirmationTime: "~12 sec",
    feeUsd: "0.38",
  },
  {
    id: EWalletNetworkId.POLYGON,
    name: "Polygon",
    confirmationTime: "~8 sec",
    feeUsd: "0.04",
  },
  {
    id: EWalletNetworkId.SOLANA,
    name: "Solana",
    confirmationTime: "~4 sec",
    feeUsd: "0.01",
  },
]

const MOCK_SECURITY_ITEMS: TWalletSecurityItem[] = [
  {
    id: "non-custodial",
    title: "Non-custodial",
    description: "Private keys never leave the user device.",
  },
  {
    id: "device-approval",
    title: "Device approval",
    description: "Sensitive actions require local confirmation.",
  },
  {
    id: "backup",
    title: "Encrypted backup",
    description: "Recovery data is encrypted before storage.",
  },
]

let walletConnected = false
let selectedNetworkId = EWalletNetworkId.ARBITRUM

const wait = async (delayMs: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, delayMs))

let mockActivity: TWalletActivityItem[] = [
  {
    id: "act-1007",
    type: EWalletActivityType.RECEIVE,
    status: EWalletActivityStatus.COMPLETED,
    assetId: EWalletAssetId.USDC,
    title: "Received USDC",
    amount: "1250",
    valueUsd: "1250",
    createdAt: "2026-04-27T09:22:00.000Z",
    counterparty: "0xf21...92a8",
  },
  {
    id: "act-1006",
    type: EWalletActivityType.SWAP,
    status: EWalletActivityStatus.COMPLETED,
    assetId: EWalletAssetId.ETH,
    title: "Swapped ETH to USDC",
    amount: "0.42",
    valueUsd: "1365",
    createdAt: "2026-04-27T08:10:00.000Z",
    counterparty: "Swap route",
  },
  {
    id: "act-1005",
    type: EWalletActivityType.SEND,
    status: EWalletActivityStatus.PENDING,
    assetId: EWalletAssetId.SOL,
    title: "Sent SOL",
    amount: "8.5",
    valueUsd: "1207",
    createdAt: "2026-04-26T18:42:00.000Z",
    counterparty: "9Q1p...7k2m",
  },
  {
    id: "act-1004",
    type: EWalletActivityType.BUY,
    status: EWalletActivityStatus.COMPLETED,
    assetId: EWalletAssetId.WBTC,
    title: "Bought WBTC",
    amount: "0.03",
    valueUsd: "1944",
    createdAt: "2026-04-26T15:12:00.000Z",
    counterparty: "Card top-up",
  },
]

const getAssetValueUsd = (asset: TWalletAsset): number =>
  Number(asset.balance) * Number(asset.priceUsd)

const getTotalBalanceUsd = (): string =>
  MOCK_ASSETS.reduce((acc, asset) => acc + getAssetValueUsd(asset), 0).toFixed(2)

const getActivityValue = (payload: TWalletSendReq): string => {
  const asset = MOCK_ASSETS.find((item) => item.id === payload.assetId)

  if (!asset) return "0.00"

  return (Number(payload.amount) * Number(asset.priceUsd)).toFixed(2)
}

export const getWalletOverviewMock = (): AxiosPromise<TWalletOverviewRes> =>
  api.get("/wallet/overview", {
    adapter: async (config) => ({
      data: {
        data: {
          connected: walletConnected,
          address: walletConnected ? MOCK_ADDRESS : "",
          totalBalanceUsd: getTotalBalanceUsd(),
          change24hUsd: "842.18",
          change24hPercent: "2.08",
          selectedNetworkId,
          assets: MOCK_ASSETS,
          networks: MOCK_NETWORKS,
          securityItems: MOCK_SECURITY_ITEMS,
        },
      },
      status: 200,
      statusText: "OK",
      headers: new AxiosHeaders(),
      config,
    }),
  })

export const getWalletActivityMock = (): AxiosPromise<TWalletActivityItem[]> =>
  api.get("/wallet/activity", {
    adapter: async (config) => ({
      data: { data: mockActivity },
      status: 200,
      statusText: "OK",
      headers: new AxiosHeaders(),
      config,
    }),
  })

export const connectWalletMock = (): AxiosPromise<TWalletConnectRes> =>
  api.post("/wallet/connect", null, {
    adapter: async (config) => {
      await wait(350)
      walletConnected = true

      return {
        data: { data: { connected: walletConnected, address: MOCK_ADDRESS } },
        status: 200,
        statusText: "OK",
        headers: new AxiosHeaders(),
        config,
      }
    },
  })

export const getReceiveAddressMock = (
  payload: TWalletReceiveAddressReq,
): AxiosPromise<TWalletReceiveAddressRes> =>
  api.get("/wallet/receive-address", {
    params: payload,
    adapter: async (config) => {
      await wait(250)
      selectedNetworkId = payload.networkId

      return {
        data: {
          data: {
            address: MOCK_ADDRESS,
            networkId: payload.networkId,
          },
        },
        status: 200,
        statusText: "OK",
        headers: new AxiosHeaders(),
        config,
      }
    },
  })

export const sendWalletAssetMock = (
  payload: TWalletSendReq,
): AxiosPromise<TWalletSendRes> =>
  api.post("/wallet/send", payload, {
    adapter: async (config) => {
      await wait(450)
      const activity: TWalletActivityItem = {
        id: `act-${Date.now()}`,
        type: EWalletActivityType.SEND,
        status: EWalletActivityStatus.COMPLETED,
        assetId: payload.assetId,
        title: "Sent asset",
        amount: payload.amount,
        valueUsd: getActivityValue(payload),
        createdAt: new Date().toISOString(),
        counterparty: payload.address,
      }

      selectedNetworkId = payload.networkId
      mockActivity = [activity, ...mockActivity].slice(0, 8)

      return {
        data: { data: { activity } },
        status: 201,
        statusText: "Created",
        headers: new AxiosHeaders(),
        config,
      }
    },
  })
