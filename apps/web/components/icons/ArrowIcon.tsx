import React from "react"

import { cn } from "@library/ui/lib/utils/cn"

type TArrowIconProps = React.SVGProps<SVGSVGElement> & {
  orientation?: "left" | "right" | "up" | "down"
}

export const ArrowIcon = ({
  className,
  orientation = "left",
  style,
  ...props
}: TArrowIconProps): React.JSX.Element => {
  const shouldMirrorInRTL = orientation === "left" || orientation === "right"

  const rotationMap: Record<NonNullable<TArrowIconProps["orientation"]>, number> = {
    left: 0,
    right: 180,
    up: 90,
    down: 270,
  }

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(shouldMirrorInRTL && "[html[dir='rtl']_&]:scale-x-[-1]", className)}
      style={style}
      {...props}
    >
      <g transform={`rotate(${rotationMap[orientation]} 12 12)`}>
        <path
          d="M14.1428 4.22666C14.4451 3.92451 14.9353 3.92438 15.2376 4.22666C15.5396 4.52896 15.5396 5.01914 15.2376 5.32144L9.28886 11.2701C8.88868 11.6703 8.88868 12.3297 9.28886 12.7298L15.2376 18.6785C15.5397 18.9808 15.5396 19.471 15.2376 19.7733C14.9353 20.0756 14.4451 20.0755 14.1428 19.7733L8.19408 13.8246C7.18921 12.8198 7.18921 11.1802 8.19408 10.1754L14.1428 4.22666Z"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}
