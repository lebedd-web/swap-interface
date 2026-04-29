import type { ESwapTokenId, TSwapToken } from "@/api/rest/swap/types"

import { ArrowIcon } from "@/components/icons/ArrowIcon"

type TRoutePreviewProps = {
  label: string
  route: ESwapTokenId[]
  tokens: TSwapToken[]
}

export const RoutePreview = ({
  label,
  route,
  tokens,
}: TRoutePreviewProps): React.JSX.Element => {
  const tokenById = new Map(tokens.map((token) => [token.id, token]))

  return (
    <div className="flex flex-col gap-3">
      <span className="font-f12 text-main-5">{label}</span>
      <div className="flex flex-wrap items-center gap-2">
        {route.map((tokenId, index) => {
          const token = tokenById.get(tokenId)

          return (
            <div key={`${tokenId}-${index}`} className="flex items-center gap-2">
              <span className="rounded-sm border border-base-4 bg-base-1 px-3 py-2 font-f12 text-main-4">
                {token?.symbol ?? tokenId}
              </span>
              {index < route.length - 1 ? (
                <ArrowIcon orientation="right" className="size-4 text-main-6" />
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
