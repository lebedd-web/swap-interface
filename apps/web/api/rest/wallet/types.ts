export enum EWalletAssetId {
  ETH = "eth",
  USDC = "usdc",
  WBTC = "wbtc",
  SOL = "sol",
  MATIC = "matic",
}

export enum EWalletNetworkId {
  ETHEREUM = "ethereum",
  ARBITRUM = "arbitrum",
  POLYGON = "polygon",
  SOLANA = "solana",
}

export enum EWalletAssetAccent {
  ORANGE = "orange",
  GREEN = "green",
  BLUE = "blue",
  PURPLE = "purple",
  YELLOW = "yellow",
}

export enum EWalletActivityType {
  SEND = "send",
  RECEIVE = "receive",
  SWAP = "swap",
  BUY = "buy",
}

export enum EWalletActivityStatus {
  COMPLETED = "completed",
  PENDING = "pending",
  FAILED = "failed",
}

export type TWalletAsset = {
  id: EWalletAssetId
  symbol: string
  name: string
  balance: string
  priceUsd: string
  change24hPercent: string
  accent: EWalletAssetAccent
}

export type TWalletNetwork = {
  id: EWalletNetworkId
  name: string
  confirmationTime: string
  feeUsd: string
}

export type TWalletSecurityItem = {
  id: string
  title: string
  description: string
}

export type TWalletOverviewRes = {
  connected: boolean
  address: string
  totalBalanceUsd: string
  change24hUsd: string
  change24hPercent: string
  selectedNetworkId: EWalletNetworkId
  assets: TWalletAsset[]
  networks: TWalletNetwork[]
  securityItems: TWalletSecurityItem[]
}

export type TWalletActivityItem = {
  id: string
  type: EWalletActivityType
  status: EWalletActivityStatus
  assetId: EWalletAssetId
  title: string
  amount: string
  valueUsd: string
  createdAt: string
  counterparty: string
}

export type TWalletConnectRes = {
  connected: boolean
  address: string
}

export type TWalletReceiveAddressReq = {
  networkId: EWalletNetworkId
}

export type TWalletReceiveAddressRes = {
  address: string
  networkId: EWalletNetworkId
}

export type TWalletSendReq = {
  networkId: EWalletNetworkId
  assetId: EWalletAssetId
  address: string
  amount: string
}

export type TWalletSendRes = {
  activity: TWalletActivityItem
}
