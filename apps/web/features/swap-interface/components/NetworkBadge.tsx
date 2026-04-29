import type { TSwapNetwork } from "@/api/rest/swap/types"

type TNetworkBadgeProps = {
  network: TSwapNetwork
}

export const NetworkBadge = ({ network }: TNetworkBadgeProps): React.JSX.Element => (
  <div className="inline-flex items-center gap-2 rounded-sm border border-base-4 bg-base-2 px-3 py-2">
    <span className="size-2 rounded-full bg-main-8 shadow-[0_0_8px_var(--color-main-8)]" />
    <span className="font-f12 text-main-4">{network.name}</span>
    <span className="font-f14 text-main-6">{network.confirmationTime}</span>
  </div>
)
