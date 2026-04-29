import type { TSwapToken } from "@/api/rest/swap/types"

import { ESwapFormStatus } from "../types"

type TGetSwapStatusProps = {
  amount: string
  fromToken: TSwapToken
  toToken: TSwapToken
}

export const getSwapStatus = ({
  amount,
  fromToken,
  toToken,
}: TGetSwapStatusProps): ESwapFormStatus => {
  const amountValue = Number(amount)

  if (!amount.trim() || !Number.isFinite(amountValue) || amountValue <= 0) {
    return ESwapFormStatus.ENTER_AMOUNT
  }

  if (fromToken.id === toToken.id) {
    return ESwapFormStatus.SAME_TOKEN
  }

  if (amountValue > Number(fromToken.balance)) {
    return ESwapFormStatus.INSUFFICIENT_BALANCE
  }

  return ESwapFormStatus.READY
}
