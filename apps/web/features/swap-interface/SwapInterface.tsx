"use client"

import { useEffect, useState } from "react"
import { apiSwap } from "@/api/rest/swap"
import {
  ESwapRecentStatus,
  type TSwapConfigRes,
  type TSwapRecentItem,
} from "@/api/rest/swap/types"
import { handleRestErrors } from "@/features/errors"
import { useTranslations } from "next-intl"

import { Card } from "@/components/Card"
import { ShieldCheckIcon } from "@/components/icons/ShieldCheckIcon"
import { SpinnerIcon } from "@/components/icons/SpinnerIcon"

import { InfoPill } from "./components/InfoPill"
import { NetworkBadge } from "./components/NetworkBadge"
import { RecentSwaps } from "./components/RecentSwaps"
import { SwapWidget } from "./modules/swap-widget/SwapWidget"
import { formatUsd } from "./utils/format-token-amount"

const EMPTY_VALUE = "\u00A0"

const LoadingState = (): React.JSX.Element => (
  <section className="flex h-full min-h-[520px] flex-col gap-5 rounded-lg border border-base-4 bg-base-2 p-4 shadow-sm sm:p-5">
    <div className="flex flex-1 items-center justify-center">
      <SpinnerIcon className="size-8 animate-spin text-main-1" />
    </div>
  </section>
)

export const SwapInterface = (): React.JSX.Element => {
  const t = useTranslations("swapInterface")
  const [config, setConfig] = useState<TSwapConfigRes | null>(null)
  const [recentSwaps, setRecentSwaps] = useState<TSwapRecentItem[]>([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    const loadData = async (): Promise<void> => {
      setLoading(true)

      try {
        const [configRes, recentRes] = await Promise.all([
          apiSwap.getConfig(),
          apiSwap.getRecentSwaps(),
        ])

        if (!isActive) return

        setConfig(configRes.data)
        setRecentSwaps(recentRes.data)
      } catch (e) {
        if (!isActive) return
        handleRestErrors({ e })
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    void loadData()

    return () => {
      isActive = false
    }
  }, [])

  const handleSwapCreated = (swap: TSwapRecentItem): void => {
    setRecentSwaps((prev) => [swap, ...prev].slice(0, 6))
  }

  const defaultNetwork = config?.networks[0]
  const bestNetwork = config?.networks[1] ?? defaultNetwork
  const stableToken = config?.tokens.find((token) => token.symbol === "USDC")
  const ethToken = config?.tokens.find((token) => token.symbol === "ETH")

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 pb-12 pt-8 md:px-10 md:pb-16 md:pt-12 lg:px-14">
      <section className="grid gap-8 xl:grid-cols-[minmax(0,0.75fr)_minmax(680px,1fr)] xl:items-stretch">
        <div className="flex min-w-0 flex-col gap-6 xl:h-full">
          <div className="flex max-w-[760px] flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {bestNetwork ? (
                <NetworkBadge network={bestNetwork} />
              ) : (
                <div
                  className="inline-flex items-center gap-2 rounded-sm border border-base-4 bg-base-2 px-3 py-2 opacity-0"
                  aria-hidden
                >
                  <span className="size-2 rounded-full" />
                  <span className="font-f12">{EMPTY_VALUE}</span>
                  <span className="font-f14">{EMPTY_VALUE}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="max-w-[720px] font-f1 text-main-4">{t("hero.title")}</h1>
              <p className="max-w-[640px] font-f11 text-main-5">
                {t("hero.description")}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <InfoPill
              label={t("metrics.bestRoute")}
              value={bestNetwork?.name ?? EMPTY_VALUE}
            />
            <InfoPill
              label={t("metrics.networkFee")}
              value={bestNetwork ? formatUsd(bestNetwork.feeUsd) : EMPTY_VALUE}
            />
            <InfoPill
              label={t("metrics.referencePair")}
              value={
                ethToken && stableToken
                  ? `${ethToken.symbol} / ${stableToken.symbol}`
                  : EMPTY_VALUE
              }
            />
          </div>

          <Card className="flex flex-col gap-4 p-4 sm:p-6 xl:flex-1">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-base-4 text-main-1">
                <ShieldCheckIcon className="size-5" />
              </span>
              <div className="flex flex-col gap-1">
                <h2 className="font-f5 text-main-4">{t("trust.title")}</h2>
                <p className="font-f13 text-main-5">{t("trust.description")}</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-sm border border-base-4 bg-base-1 px-3 py-3">
                <p className="font-f12 text-main-4">{t("trust.items.noCustody.title")}</p>
                <p className="font-f14 text-main-6">
                  {t("trust.items.noCustody.description")}
                </p>
              </div>
              <div className="rounded-sm border border-base-4 bg-base-1 px-3 py-3">
                <p className="font-f12 text-main-4">{t("trust.items.mocked.title")}</p>
                <p className="font-f14 text-main-6">
                  {t("trust.items.mocked.description")}
                </p>
              </div>
              <div className="rounded-sm border border-base-4 bg-base-1 px-3 py-3">
                <p className="font-f12 text-main-4">{t("trust.items.api.title")}</p>
                <p className="font-f14 text-main-6">{t("trust.items.api.description")}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="xl:sticky xl:top-[104px] xl:h-full">
          {isLoading || !config ? (
            <LoadingState />
          ) : (
            <SwapWidget config={config} onSwapCreated={handleSwapCreated} />
          )}
        </div>
      </section>

      {config ? (
        <RecentSwaps
          title={t("recentSwaps.title")}
          description={t("recentSwaps.description")}
          empty={t("recentSwaps.empty")}
          swaps={recentSwaps}
          tokens={config.tokens}
          networks={config.networks}
          statusLabels={{
            [ESwapRecentStatus.COMPLETED]: t("recentSwaps.status.completed"),
            [ESwapRecentStatus.PROCESSING]: t("recentSwaps.status.processing"),
            [ESwapRecentStatus.FAILED]: t("recentSwaps.status.failed"),
          }}
        />
      ) : null}
    </div>
  )
}
