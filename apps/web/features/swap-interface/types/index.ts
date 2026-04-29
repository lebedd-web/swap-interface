import type {
  ESwapNetworkId,
  ESwapTokenId,
  TSwapDefaultState,
} from "@/api/rest/swap/types"

export enum ESwapFormStatus {
  ENTER_AMOUNT = "enterAmount",
  SAME_TOKEN = "sameToken",
  INSUFFICIENT_BALANCE = "insufficientBalance",
  READY = "ready",
}

export type TSwapState = TSwapDefaultState

export type TSwapRequestState = {
  networkId: ESwapNetworkId
  fromTokenId: ESwapTokenId
  toTokenId: ESwapTokenId
  amount: string
  slippage: string
}
