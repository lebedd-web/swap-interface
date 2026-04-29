import { cn } from "@library/ui/lib/utils/cn"

import { SLIPPAGE_OPTIONS } from "../constants/trade"

type TSlippageControlProps = {
  label: string
  value: string
  onChange: (value: string) => void
}

export const SlippageControl = ({
  label,
  value,
  onChange,
}: TSlippageControlProps): React.JSX.Element => (
  <div className="flex flex-col gap-3">
    <span className="font-f12 text-main-5">{label}</span>
    <div className="grid grid-cols-3 gap-2">
      {SLIPPAGE_OPTIONS.map((option) => {
        const isSelected = option === value

        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "h-10 rounded-sm border px-3 font-f12 transition-colors",
              isSelected
                ? "border-main-1 bg-base-100 text-main-1"
                : "border-base-200 bg-base-4 text-main-5 hover:border-main-6 hover:text-main-4",
            )}
          >
            {option}%
          </button>
        )
      })}
    </div>
  </div>
)
