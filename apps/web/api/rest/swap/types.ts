export enum ESwapTokenId {
  ETH = "eth",
  USDC = "usdc",
  USDT = "usdt",
  WBTC = "wbtc",
  SOL = "sol",
  BNB = "bnb",
}

export enum ESwapNetworkId {
  ETHEREUM = "ethereum",
  ARBITRUM = "arbitrum",
  POLYGON = "polygon",
  BNB_CHAIN = "bnb-chain",
}

export enum ESwapTokenAccent {
  ORANGE = "orange",
  GREEN = "green",
  BLUE = "blue",
  PURPLE = "purple",
  YELLOW = "yellow",
  CYAN = "cyan",
}

export enum ESwapRecentStatus {
  COMPLETED = "completed",
  PROCESSING = "processing",
  FAILED = "failed",
}

export type TSwapToken = {
  id: ESwapTokenId
  symbol: string
  name: string
  balance: string
  priceUsd: number
  accent: ESwapTokenAccent
}

export type TSwapNetwork = {
  id: ESwapNetworkId
  name: string
  feeUsd: string
  confirmationTime: string
}

export type TSwapDefaultState = {
  networkId: ESwapNetworkId
  fromTokenId: ESwapTokenId
  toTokenId: ESwapTokenId
  amount: string
  slippage: string
}

export type TSwapConfigRes = {
  tokens: TSwapToken[]
  networks: TSwapNetwork[]
  defaultState: TSwapDefaultState
}

export type TPostSwapQuoteReq = {
  networkId: ESwapNetworkId
  fromTokenId: ESwapTokenId
  toTokenId: ESwapTokenId
  amount: string
  slippage: string
}

export type TSwapQuoteRes = {
  quoteId: string
  networkId: ESwapNetworkId
  fromTokenId: ESwapTokenId
  toTokenId: ESwapTokenId
  fromAmount: string
  toAmount: string
  rate: string
  inverseRate: string
  minimumReceived: string
  priceImpactPercent: string
  networkFeeUsd: string
  gasEstimate: string
  slippage: string
  estimatedTime: string
  route: ESwapTokenId[]
  updatedAt: string
}

export type TSubmitSwapReq = TPostSwapQuoteReq & {
  quoteId: string
}

export type TSwapRecentItem = {
  id: string
  transactionHash: string
  networkId: ESwapNetworkId
  fromTokenId: ESwapTokenId
  toTokenId: ESwapTokenId
  fromAmount: string
  toAmount: string
  status: ESwapRecentStatus
  createdAt: string
}

export type TSubmitSwapRes = {
  swap: TSwapRecentItem
}
