import type { TSwapQuoteRes, TSwapToken } from "@/api/rest/swap/types"

import { formatTokenAmount, formatUsd } from "../utils/format-token-amount"

type TQuoteDetailsProps = {
  quote: TSwapQuoteRes | null
  isLoading: boolean
  fromToken: TSwapToken
  toToken: TSwapToken
  labels: {
    title: string
    rate: string
    networkFee: string
    priceImpact: string
    minimumReceived: string
    estimatedTime: string
    noQuote: string
  }
}

type TQuoteRowProps = {
  label: string
  value: string
  isLoading: boolean
}

const QuoteRow = ({ label, value, isLoading }: TQuoteRowProps): React.JSX.Element => (
  <div className="flex items-center justify-between gap-4">
    <span className="font-f13 text-main-6">{label}</span>
    {isLoading ? (
      <span className="h-4 w-24 animate-pulse rounded-xs bg-base-4" />
    ) : (
      <span className="text-right font-f12 text-main-4">{value}</span>
    )}
  </div>
)

export const QuoteDetails = ({
  quote,
  isLoading,
  fromToken,
  toToken,
  labels,
}: TQuoteDetailsProps): React.JSX.Element => {
  const hasQuote = Boolean(quote)

  return (
    <div className="flex min-h-[176px] flex-col gap-3 rounded-lg border border-base-4 bg-base-1 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-f5 text-main-4">{labels.title}</h3>
        {!hasQuote && !isLoading ? (
          <span className="font-f14 text-main-6">{labels.noQuote}</span>
        ) : null}
      </div>

      <div className="flex flex-col gap-3">
        <QuoteRow
          label={labels.rate}
          value={
            quote
              ? `1 ${fromToken.symbol} = ${formatTokenAmount(quote.rate, 8)} ${toToken.symbol}`
              : "-"
          }
          isLoading={isLoading}
        />
        <QuoteRow
          label={labels.networkFee}
          value={quote ? formatUsd(quote.networkFeeUsd) : "-"}
          isLoading={isLoading}
        />
        <QuoteRow
          label={labels.priceImpact}
          value={quote ? `${quote.priceImpactPercent}%` : "-"}
          isLoading={isLoading}
        />
        <QuoteRow
          label={labels.minimumReceived}
          value={
            quote ? `${formatTokenAmount(quote.minimumReceived)} ${toToken.symbol}` : "-"
          }
          isLoading={isLoading}
        />
        <QuoteRow
          label={labels.estimatedTime}
          value={quote?.estimatedTime ?? "-"}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
