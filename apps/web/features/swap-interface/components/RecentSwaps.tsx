import {
  ESwapRecentStatus,
  type TSwapNetwork,
  type TSwapRecentItem,
  type TSwapToken,
} from "@/api/rest/swap/types"

import { CheckIcon } from "@/components/icons/CheckIcon"
import { ErrorIcon } from "@/components/icons/ErrorIcon"
import { HistoryIcon } from "@/components/icons/HistoryIcon"
import { SpinnerIcon } from "@/components/icons/SpinnerIcon"

import { formatTokenAmount } from "../utils/format-token-amount"

type TRecentSwapsProps = {
  title: string
  description: string
  empty: string
  swaps: TSwapRecentItem[]
  tokens: TSwapToken[]
  networks: TSwapNetwork[]
  statusLabels: Record<ESwapRecentStatus, string>
}

const formatDate = (value: string): string =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value))

export const RecentSwaps = ({
  title,
  description,
  empty,
  swaps,
  tokens,
  networks,
  statusLabels,
}: TRecentSwapsProps): React.JSX.Element => {
  const tokenById = new Map(tokens.map((token) => [token.id, token]))
  const networkById = new Map(networks.map((network) => [network.id, network]))

  return (
    <section className="flex flex-col gap-4 rounded-lg border border-base-4 bg-base-2 p-4 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-base-4 text-main-1">
          <HistoryIcon className="size-5" />
        </span>
        <div className="flex flex-col gap-1">
          <h2 className="font-f5 text-main-4">{title}</h2>
          <p className="font-f13 text-main-5">{description}</p>
        </div>
      </div>

      {swaps.length === 0 ? (
        <p className="rounded-sm border border-dashed border-base-4 px-4 py-6 text-center font-f13 text-main-6">
          {empty}
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-base-4">
          {swaps.map((swap) => {
            const fromToken = tokenById.get(swap.fromTokenId)
            const toToken = tokenById.get(swap.toTokenId)
            const network = networkById.get(swap.networkId)
            const isCompleted = swap.status === ESwapRecentStatus.COMPLETED
            const isFailed = swap.status === ESwapRecentStatus.FAILED
            const StatusIcon = isCompleted
              ? CheckIcon
              : isFailed
                ? ErrorIcon
                : SpinnerIcon

            return (
              <article
                key={swap.id}
                className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <div className="flex min-w-0 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-f12 text-main-4">
                      {fromToken?.symbol} / {toToken?.symbol}
                    </span>
                    <span className="rounded-xs bg-base-4 px-2 py-1 font-f14 text-main-6">
                      {network?.name}
                    </span>
                  </div>
                  <span className="font-f13 text-main-5">
                    {formatTokenAmount(swap.fromAmount)} {fromToken?.symbol}
                    {" -> "}
                    {formatTokenAmount(swap.toAmount)} {toToken?.symbol}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <span
                    className={`inline-flex items-center gap-1.5 font-f13 ${
                      isCompleted
                        ? "text-main-8"
                        : isFailed
                          ? "text-main-9"
                          : "text-main-10"
                    }`}
                  >
                    <StatusIcon
                      className={`size-4 ${swap.status === ESwapRecentStatus.PROCESSING ? "animate-spin" : ""}`}
                    />
                    {statusLabels[swap.status]}
                  </span>
                  <span className="font-f14 text-main-6">
                    {formatDate(swap.createdAt)}
                  </span>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
