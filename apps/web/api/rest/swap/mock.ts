import { api } from "@/api/rest/instance"
import { AxiosHeaders, type AxiosPromise } from "axios"

import {
  ESwapNetworkId,
  ESwapRecentStatus,
  ESwapTokenAccent,
  ESwapTokenId,
  type TPostSwapQuoteReq,
  type TSubmitSwapReq,
  type TSubmitSwapRes,
  type TSwapConfigRes,
  type TSwapNetwork,
  type TSwapQuoteRes,
  type TSwapRecentItem,
  type TSwapToken,
} from "./types"

const MOCK_TOKENS: TSwapToken[] = [
  {
    id: ESwapTokenId.ETH,
    symbol: "ETH",
    name: "Ethereum",
    balance: "4.284",
    priceUsd: 3250,
    accent: ESwapTokenAccent.BLUE,
  },
  {
    id: ESwapTokenId.USDC,
    symbol: "USDC",
    name: "USD Coin",
    balance: "12840.50",
    priceUsd: 1,
    accent: ESwapTokenAccent.GREEN,
  },
  {
    id: ESwapTokenId.USDT,
    symbol: "USDT",
    name: "Tether USD",
    balance: "6420.00",
    priceUsd: 1,
    accent: ESwapTokenAccent.CYAN,
  },
  {
    id: ESwapTokenId.WBTC,
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    balance: "0.382",
    priceUsd: 64800,
    accent: ESwapTokenAccent.ORANGE,
  },
  {
    id: ESwapTokenId.SOL,
    symbol: "SOL",
    name: "Solana",
    balance: "95.25",
    priceUsd: 142,
    accent: ESwapTokenAccent.PURPLE,
  },
  {
    id: ESwapTokenId.BNB,
    symbol: "BNB",
    name: "BNB",
    balance: "28.4",
    priceUsd: 590,
    accent: ESwapTokenAccent.YELLOW,
  },
]

const MOCK_NETWORKS: TSwapNetwork[] = [
  {
    id: ESwapNetworkId.ETHEREUM,
    name: "Ethereum",
    feeUsd: "9.84",
    confirmationTime: "~2 min",
  },
  {
    id: ESwapNetworkId.ARBITRUM,
    name: "Arbitrum",
    feeUsd: "0.42",
    confirmationTime: "~12 sec",
  },
  {
    id: ESwapNetworkId.POLYGON,
    name: "Polygon",
    feeUsd: "0.06",
    confirmationTime: "~8 sec",
  },
  {
    id: ESwapNetworkId.BNB_CHAIN,
    name: "BNB Chain",
    feeUsd: "0.18",
    confirmationTime: "~5 sec",
  },
]

const ROUTE_FACTORS: Record<ESwapNetworkId, number> = {
  [ESwapNetworkId.ETHEREUM]: 0.9968,
  [ESwapNetworkId.ARBITRUM]: 0.9987,
  [ESwapNetworkId.POLYGON]: 0.9991,
  [ESwapNetworkId.BNB_CHAIN]: 0.9984,
}

let mockRecentSwaps: TSwapRecentItem[] = [
  {
    id: "swap-1006",
    transactionHash: "0xd8c3f2a9b77a48ef98c4d26e31a0c54ed19b8a12",
    networkId: ESwapNetworkId.ARBITRUM,
    fromTokenId: ESwapTokenId.ETH,
    toTokenId: ESwapTokenId.USDC,
    fromAmount: "0.84",
    toAmount: "2719.24",
    status: ESwapRecentStatus.COMPLETED,
    createdAt: "2026-04-27T08:46:00.000Z",
  },
  {
    id: "swap-1005",
    transactionHash: "0x3ae9c3d89cbf4f08a748b94f77d24e87d8fa0c6b",
    networkId: ESwapNetworkId.POLYGON,
    fromTokenId: ESwapTokenId.USDT,
    toTokenId: ESwapTokenId.SOL,
    fromAmount: "950.00",
    toAmount: "6.68",
    status: ESwapRecentStatus.PROCESSING,
    createdAt: "2026-04-27T07:18:00.000Z",
  },
  {
    id: "swap-1004",
    transactionHash: "0xf8caa9e14b8c4a2fb36b6e1d42869db7a0d06d2f",
    networkId: ESwapNetworkId.ETHEREUM,
    fromTokenId: ESwapTokenId.WBTC,
    toTokenId: ESwapTokenId.ETH,
    fromAmount: "0.05",
    toAmount: "0.99",
    status: ESwapRecentStatus.COMPLETED,
    createdAt: "2026-04-26T19:04:00.000Z",
  },
  {
    id: "swap-1003",
    transactionHash: "0x146a4b15d24e4c77a9235f07d180fe61b5df1b84",
    networkId: ESwapNetworkId.BNB_CHAIN,
    fromTokenId: ESwapTokenId.BNB,
    toTokenId: ESwapTokenId.USDC,
    fromAmount: "4.5",
    toAmount: "2648.50",
    status: ESwapRecentStatus.COMPLETED,
    createdAt: "2026-04-26T15:32:00.000Z",
  },
]

const wait = async (delayMs: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, delayMs))

const findToken = (id: ESwapTokenId): TSwapToken =>
  MOCK_TOKENS.find((token) => token.id === id) ?? MOCK_TOKENS[0]!

const findNetwork = (id: ESwapNetworkId): TSwapNetwork =>
  MOCK_NETWORKS.find((network) => network.id === id) ?? MOCK_NETWORKS[0]!

const formatAmount = (value: number, decimals = 6): string => {
  if (!Number.isFinite(value)) return "0"

  return value.toFixed(decimals).replace(/\.?0+$/, "")
}

const createQuote = (payload: TPostSwapQuoteReq): TSwapQuoteRes => {
  const fromToken = findToken(payload.fromTokenId)
  const toToken = findToken(payload.toTokenId)
  const network = findNetwork(payload.networkId)
  const amount = Number(payload.amount)
  const routeFactor = ROUTE_FACTORS[payload.networkId]
  const slippage = Number(payload.slippage)
  const safeAmount = Number.isFinite(amount) && amount > 0 ? amount : 0
  const receiveAmount = (safeAmount * fromToken.priceUsd * routeFactor) / toToken.priceUsd
  const minimumReceived = receiveAmount * (1 - slippage / 100)
  const rate = (fromToken.priceUsd * routeFactor) / toToken.priceUsd
  const inverseRate = toToken.priceUsd / (fromToken.priceUsd * routeFactor)
  const priceImpact = Math.max(0.02, Math.min(0.48, safeAmount * 0.003 + 0.08))
  const hasStableRoute =
    fromToken.id !== ESwapTokenId.USDC && toToken.id !== ESwapTokenId.USDC

  return {
    quoteId: `quote-${Date.now()}`,
    networkId: payload.networkId,
    fromTokenId: payload.fromTokenId,
    toTokenId: payload.toTokenId,
    fromAmount: formatAmount(safeAmount),
    toAmount: formatAmount(receiveAmount),
    rate: formatAmount(rate, 8),
    inverseRate: formatAmount(inverseRate, 8),
    minimumReceived: formatAmount(minimumReceived),
    priceImpactPercent: formatAmount(priceImpact, 2),
    networkFeeUsd: network.feeUsd,
    gasEstimate: network.confirmationTime,
    slippage: payload.slippage,
    estimatedTime: network.confirmationTime,
    route: hasStableRoute
      ? [fromToken.id, ESwapTokenId.USDC, toToken.id]
      : [fromToken.id, toToken.id],
    updatedAt: new Date().toISOString(),
  }
}

export const getSwapConfigMock = (): AxiosPromise<TSwapConfigRes> =>
  api.get("/swap/config", {
    adapter: async (config) => ({
      data: {
        data: {
          tokens: MOCK_TOKENS,
          networks: MOCK_NETWORKS,
          defaultState: {
            networkId: ESwapNetworkId.ARBITRUM,
            fromTokenId: ESwapTokenId.ETH,
            toTokenId: ESwapTokenId.USDC,
            amount: "0.25",
            slippage: "0.5",
          },
        },
      },
      status: 200,
      statusText: "OK",
      headers: new AxiosHeaders(),
      config,
    }),
  })

export const postSwapQuoteMock = (
  payload: TPostSwapQuoteReq,
): AxiosPromise<TSwapQuoteRes> =>
  api.post("/swap/quote", payload, {
    adapter: async (config) => ({
      data: { data: createQuote(payload) },
      status: 200,
      statusText: "OK",
      headers: new AxiosHeaders(),
      config,
    }),
  })

export const getRecentSwapsMock = (): AxiosPromise<TSwapRecentItem[]> =>
  api.get("/swap/recent-swaps", {
    adapter: async (config) => ({
      data: { data: mockRecentSwaps },
      status: 200,
      statusText: "OK",
      headers: new AxiosHeaders(),
      config,
    }),
  })

export const submitSwapMock = (payload: TSubmitSwapReq): AxiosPromise<TSubmitSwapRes> =>
  api.post("/swap/submit", payload, {
    adapter: async (config) => {
      await wait(400)
      const quote = createQuote(payload)
      const swap: TSwapRecentItem = {
        id: `swap-${Date.now()}`,
        transactionHash: `0x${Math.random().toString(16).slice(2).padEnd(40, "0")}`,
        networkId: payload.networkId,
        fromTokenId: payload.fromTokenId,
        toTokenId: payload.toTokenId,
        fromAmount: quote.fromAmount,
        toAmount: quote.toAmount,
        status: ESwapRecentStatus.COMPLETED,
        createdAt: new Date().toISOString(),
      }

      mockRecentSwaps = [swap, ...mockRecentSwaps].slice(0, 6)

      return {
        data: { data: { swap } },
        status: 201,
        statusText: "Created",
        headers: new AxiosHeaders(),
        config,
      }
    },
  })
