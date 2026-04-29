import { CheckIcon } from "@/components/icons/CheckIcon"
import { ErrorIcon } from "@/components/icons/ErrorIcon"
import { SpinnerIcon } from "@/components/icons/SpinnerIcon"

import { ESwapFormStatus } from "../types"

type TSwapStatusProps = {
  status: ESwapFormStatus
  isLoading: boolean
  labels: Record<ESwapFormStatus | "loading", string>
}

export const SwapStatus = ({
  status,
  isLoading,
  labels,
}: TSwapStatusProps): React.JSX.Element => {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 font-f13 text-main-5">
        <SpinnerIcon className="size-4 animate-spin" />
        <span>{labels.loading}</span>
      </div>
    )
  }

  const isReady = status === ESwapFormStatus.READY
  const Icon = isReady ? CheckIcon : ErrorIcon

  return (
    <div
      className={`flex items-center gap-2 font-f13 ${isReady ? "text-main-8" : "text-main-9"}`}
    >
      <Icon className="size-4 shrink-0" />
      <span>{labels[status]}</span>
    </div>
  )
}
