import * as React from "react"

import { cn } from "@library/ui/lib/utils/cn"

type TCardProps = React.HTMLAttributes<HTMLDivElement>

type TCardHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  rightSlot?: React.ReactNode
}

export const Card: React.FC<TCardProps> = ({ className, ...props }) => (
  <section
    data-slot="card"
    className={cn(
      "rounded-lg border border-base-4 bg-base-2 px-4 py-6 sm:p-6",
      className,
    )}
    {...props}
  />
)

export const CardHeader: React.FC<TCardHeaderProps> = ({
  title,
  description,
  icon,
  rightSlot,
  className,
  ...props
}) => {
  const hasDescription = Boolean(description)

  return (
    <header
      data-slot="card-header"
      className={cn("flex w-full items-center gap-4", className)}
      {...props}
    >
      {icon ? (
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-main-1 p-2.5">
          {icon}
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        <div
          className={cn(hasDescription ? "font-f3 text-main-4" : "font-f4 text-main-4")}
        >
          {title}
        </div>

        {description ? <div className="font-f13 text-main-5">{description}</div> : null}
      </div>

      {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
    </header>
  )
}
