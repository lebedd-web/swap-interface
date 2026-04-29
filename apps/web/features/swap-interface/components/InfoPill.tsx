import { cn } from "@library/ui/lib/utils/cn"

type TInfoPillProps = {
  label: string
  value: string
  className?: string
}

export const InfoPill = ({
  label,
  value,
  className,
}: TInfoPillProps): React.JSX.Element => (
  <div
    className={cn(
      "flex min-h-16 flex-col justify-center gap-1 rounded-lg border border-base-4 bg-base-2 px-4 py-3",
      className,
    )}
  >
    <span className="font-f14 text-main-6">{label}</span>
    <span className="font-f7 text-main-4">{value}</span>
  </div>
)
