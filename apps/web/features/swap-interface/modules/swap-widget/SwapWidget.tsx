"use client"

import { useMemo, useState } from "react"
import { apiSwap } from "@/api/rest/swap"
import type {
  ESwapNetworkId,
  ESwapTokenId,
  TSwapConfigRes,
  TSwapRecentItem,
} from "@/api/rest/swap/types"
import { handleRestErrors } from "@/features/errors"
import { useTranslations } from "next-intl"

import { toast } from "@library/ui/components/Toast"

import { ButtonFilled } from "@/components/Button/ButtonFilled"
import { ButtonIcon } from "@/components/Button/ButtonIcon"
import { RefreshIcon } from "@/components/icons/RefreshIcon"
import { Select } from "@/components/Select"

import { QuoteDetails } from "../../components/QuoteDetails"
import { RoutePreview } from "../../components/RoutePreview"
import { SlippageControl } from "../../components/SlippageControl"
import { SwapStatus } from "../../components/SwapStatus"
import { TokenAmountField } from "../../components/TokenAmountField"
import { DEFAULT_RECEIVE_VALUE } from "../../constants/trade"
import { ESwapFormStatus, type TSwapState } from "../../types"
import { formatTokenAmount } from "../../utils/format-token-amount"
import { getSwapStatus } from "../../utils/get-swap-status"
import { useSwapQuote } from "./use-swap-quote"

type TSwapWidgetProps = {
  config: TSwapConfigRes
  onSwapCreated: (swap: TSwapRecentItem) => void
}

export const SwapWidget = ({
  config,
  onSwapCreated,
}: TSwapWidgetProps): React.JSX.Element => {
  const t = useTranslations("swapInterface")
  const [state, setState] = useState<TSwapState>(config.defaultState)
  const [isSubmitting, setSubmitting] = useState(false)
  const tokenById = useMemo(
    () => new Map(config.tokens.map((token) => [token.id, token])),
    [config.tokens],
  )
  const fromToken = tokenById.get(state.fromTokenId) ?? config.tokens[0]!
  const toToken = tokenById.get(state.toTokenId) ?? config.tokens[1] ?? config.tokens[0]!
  const selectedNetwork =
    config.networks.find((network) => network.id === state.networkId) ??
    config.networks[0]!
  const status = getSwapStatus({
    amount: state.amount,
    fromToken,
    toToken,
  })
  const canRequestQuote = status === ESwapFormStatus.READY
  const { quote, isLoading } = useSwapQuote(
    canRequestQuote
      ? {
          networkId: state.networkId,
          fromTokenId: state.fromTokenId,
          toTokenId: state.toTokenId,
          amount: state.amount,
          slippage: state.slippage,
        }
      : null,
  )
  const receiveValue = quote?.toAmount ?? DEFAULT_RECEIVE_VALUE
  const isSubmitDisabled =
    status !== ESwapFormStatus.READY || isLoading || isSubmitting || !quote

  const updateState = (payload: Partial<TSwapState>): void => {
    setState((prev) => ({ ...prev, ...payload }))
  }

  const switchTokens = (): void => {
    setState((prev) => ({
      ...prev,
      fromTokenId: prev.toTokenId,
      toTokenId: prev.fromTokenId,
    }))
  }

  const submitSwap = async (): Promise<void> => {
    if (isSubmitDisabled || !quote) return

    setSubmitting(true)

    try {
      const { data } = await apiSwap.submit({
        quoteId: quote.quoteId,
        networkId: state.networkId,
        fromTokenId: state.fromTokenId,
        toTokenId: state.toTokenId,
        amount: state.amount,
        slippage: state.slippage,
      })

      onSwapCreated(data.swap)
      toast.success(t("toast.success"), { id: "swap-interface-success" })
    } catch (e) {
      handleRestErrors({ e })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="flex h-full flex-col gap-5 rounded-lg border border-base-4 bg-base-2 p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-f4 text-main-4">{t("widget.title")}</h2>
          <p className="font-f13 text-main-5">{t("widget.description")}</p>
        </div>
        <span className="rounded-sm border border-base-4 bg-base-1 px-3 py-2 font-f14 text-main-6">
          {selectedNetwork.confirmationTime}
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(300px,340px)]">
        <div className="flex min-w-0 flex-col gap-3">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px] lg:grid-cols-1">
            <div className="flex flex-col gap-2">
              <label className="font-f12 text-main-5" htmlFor="swap-network">
                {t("network.label")}
              </label>
              <Select
                value={state.networkId}
                options={config.networks.map((network) => ({
                  value: network.id,
                  label: `${network.name} · ${network.confirmationTime}`,
                }))}
                onChange={(value) => updateState({ networkId: value as ESwapNetworkId })}
                className="h-10 border-base-200 bg-base-4 py-0"
              />
            </div>

            <SlippageControl
              label={t("form.slippage")}
              value={state.slippage}
              onChange={(slippage) => updateState({ slippage })}
            />
          </div>

          <TokenAmountField
            id="swap-from-amount"
            label={t("form.youPay")}
            balanceLabel={t("form.balance")}
            tokenSelectLabel={t("form.fromToken")}
            value={state.amount}
            tokenId={state.fromTokenId}
            token={fromToken}
            tokens={config.tokens}
            placeholder={t("form.amountPlaceholder")}
            compact
            onValueChange={(amount) => updateState({ amount })}
            onTokenChange={(fromTokenId: ESwapTokenId) => updateState({ fromTokenId })}
          />

          <div className="flex justify-center">
            <ButtonIcon
              type="button"
              aria-label={t("form.switchTokens")}
              className="-my-1 rounded-full border-base-200 bg-base-4 text-main-1"
              onClick={switchTokens}
            >
              <RefreshIcon className="size-5" />
            </ButtonIcon>
          </div>

          <div className="lg:mt-auto lg:translate-y-1">
            <TokenAmountField
              id="swap-to-amount"
              label={t("form.youReceive")}
              balanceLabel={t("form.balance")}
              tokenSelectLabel={t("form.toToken")}
              value={formatTokenAmount(receiveValue)}
              tokenId={state.toTokenId}
              token={toToken}
              tokens={config.tokens}
              readOnly
              compact
              onTokenChange={(toTokenId: ESwapTokenId) => updateState({ toTokenId })}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <RoutePreview
            label={t("quote.route")}
            route={quote?.route ?? [state.fromTokenId, state.toTokenId]}
            tokens={config.tokens}
          />

          <QuoteDetails
            quote={quote}
            isLoading={isLoading}
            fromToken={fromToken}
            toToken={toToken}
            labels={{
              title: t("quote.title"),
              rate: t("quote.rate"),
              networkFee: t("quote.networkFee"),
              priceImpact: t("quote.priceImpact"),
              minimumReceived: t("quote.minimumReceived"),
              estimatedTime: t("quote.estimatedTime"),
              noQuote: t("quote.noQuote"),
            }}
          />

          <SwapStatus
            status={status}
            isLoading={isLoading}
            labels={{
              loading: t("status.loading"),
              [ESwapFormStatus.ENTER_AMOUNT]: t("status.enterAmount"),
              [ESwapFormStatus.SAME_TOKEN]: t("status.sameToken"),
              [ESwapFormStatus.INSUFFICIENT_BALANCE]: t("status.insufficientBalance"),
              [ESwapFormStatus.READY]: t("status.ready"),
            }}
          />

          <ButtonFilled
            type="button"
            size="big"
            className="w-full"
            disabled={isSubmitDisabled}
            loading={isSubmitting}
            onClick={() => void submitSwap()}
          >
            {status === ESwapFormStatus.READY
              ? t("form.swapButton")
              : t("form.reviewButton")}
          </ButtonFilled>
        </div>
      </div>
    </section>
  )
}
