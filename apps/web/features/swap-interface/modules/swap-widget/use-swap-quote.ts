import { useEffect, useState } from "react"
import { apiSwap } from "@/api/rest/swap"
import type { TPostSwapQuoteReq, TSwapQuoteRes } from "@/api/rest/swap/types"
import { handleRestErrors } from "@/features/errors"

export const useSwapQuote = (
  request: TPostSwapQuoteReq | null,
): {
  quote: TSwapQuoteRes | null
  isLoading: boolean
} => {
  const [quote, setQuote] = useState<TSwapQuoteRes | null>(null)
  const [isLoading, setLoading] = useState(false)
  const networkId = request?.networkId
  const fromTokenId = request?.fromTokenId
  const toTokenId = request?.toTokenId
  const amount = request?.amount
  const slippage = request?.slippage

  useEffect(() => {
    let isActive = true

    if (!networkId || !fromTokenId || !toTokenId || !amount || !slippage) {
      setQuote(null)
      setLoading(false)
      return () => {
        isActive = false
      }
    }

    setLoading(true)

    void apiSwap
      .postQuote({
        networkId,
        fromTokenId,
        toTokenId,
        amount,
        slippage,
      })
      .then(({ data }) => {
        if (!isActive) return
        setQuote(data)
      })
      .catch((e) => {
        if (!isActive) return
        setQuote(null)
        handleRestErrors({ e })
      })
      .finally(() => {
        if (!isActive) return
        setLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [amount, fromTokenId, networkId, slippage, toTokenId])

  return { quote, isLoading }
}
