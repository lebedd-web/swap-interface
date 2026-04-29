import type { ESwapTokenId, TSwapToken } from "@/api/rest/swap/types"

import { cn } from "@library/ui/lib/utils/cn"

import { InputPrimary } from "@/components/inputs/InputPrimary"

import { TOKEN_ACCENT_CLASSES } from "../constants/token-accent"
import { formatTokenAmount } from "../utils/format-token-amount"
import { TokenSelect } from "./TokenSelect"

type TTokenAmountFieldProps = {
  id: string
  label: string
  balanceLabel: string
  tokenSelectLabel: string
  value: string
  tokenId: ESwapTokenId
  token: TSwapToken
  tokens: TSwapToken[]
  readOnly?: boolean
  placeholder?: string
  compact?: boolean
  onValueChange?: (value: string) => void
  onTokenChange: (value: ESwapTokenId) => void
}

export const TokenAmountField = ({
  id,
  label,
  balanceLabel,
  tokenSelectLabel,
  value,
  tokenId,
  token,
  tokens,
  readOnly,
  placeholder,
  compact,
  onValueChange,
  onTokenChange,
}: TTokenAmountFieldProps): React.JSX.Element => (
  <div
    className={cn(
      "flex flex-col rounded-lg border border-base-4 bg-base-1",
      compact ? "gap-2 p-3" : "gap-3 p-4",
    )}
  >
    <div className="flex items-center justify-between gap-3">
      <label htmlFor={id} className="font-f12 text-main-5">
        {label}
      </label>
      <span className="truncate font-f14 text-main-6">
        {balanceLabel}: {formatTokenAmount(token.balance)} {token.symbol}
      </span>
    </div>

    <div
      className={cn(
        "grid gap-3 sm:grid-cols-[1fr_190px]",
        compact && "gap-2 sm:grid-cols-[minmax(0,1fr)_190px]",
      )}
    >
      <InputPrimary
        id={id}
        value={value}
        readOnly={readOnly}
        decimals={6}
        placeholder={placeholder}
        aria-label={label}
        onChange={(event) => onValueChange?.(event.target.value)}
        slotClasses={{
          input: cn(
            "rounded-sm border-base-200 bg-base-4",
            compact ? "h-10 font-f6" : "h-12 font-f5",
          ),
        }}
      />
      <TokenSelect
        value={tokenId}
        tokens={tokens}
        ariaLabel={tokenSelectLabel}
        onChange={onTokenChange}
        className={compact ? "h-10" : undefined}
        containerClassName={compact ? "sm:w-[190px]" : undefined}
      />
    </div>

    {!compact && (
      <div className="flex items-center gap-2">
        <span
          className={`flex size-7 shrink-0 items-center justify-center rounded-full font-f14 ${TOKEN_ACCENT_CLASSES[token.accent]}`}
        >
          {token.symbol.slice(0, 1)}
        </span>
        <span className="min-w-0 truncate font-f13 text-main-5">{token.name}</span>
      </div>
    )}
  </div>
)
