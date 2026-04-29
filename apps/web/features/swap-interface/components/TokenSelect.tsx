import type { ESwapTokenId, TSwapToken } from "@/api/rest/swap/types"

import { cn } from "@library/ui/lib/utils/cn"

import { Select } from "@/components/Select"

type TTokenSelectProps = {
  value: ESwapTokenId
  tokens: TSwapToken[]
  onChange: (value: ESwapTokenId) => void
  ariaLabel: string
  className?: string
  containerClassName?: string
  menuClassName?: string
}

export const TokenSelect = ({
  value,
  tokens,
  onChange,
  ariaLabel,
  className,
  containerClassName,
  menuClassName,
}: TTokenSelectProps): React.JSX.Element => (
  <div
    aria-label={ariaLabel}
    className={cn("w-full min-w-[150px] sm:w-[190px]", containerClassName)}
  >
    <Select
      value={value}
      options={tokens.map((token) => ({
        value: token.id,
        label: `${token.symbol} · ${token.name}`,
      }))}
      onChange={(nextValue) => onChange(nextValue as ESwapTokenId)}
      className={cn(
        "h-12 border-base-200 bg-base-4 px-3 py-0 font-f12 lg:font-f12",
        className,
      )}
      menuClassName={cn("min-w-[220px]", menuClassName)}
    />
  </div>
)
