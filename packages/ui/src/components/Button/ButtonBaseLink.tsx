"use client"

import * as React from "react"

import { cn } from "@library/ui/lib/utils/cn"

export type TButtonBaseProps = React.ComponentPropsWithoutRef<"a"> & {
  LinkComponent: React.ElementType
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  variantClasses?: string
  loading?: boolean
  disabled?: boolean
}

export const ButtonBaseLink = React.forwardRef<HTMLAnchorElement, TButtonBaseProps>(
  (
    {
      className,
      LinkComponent,
      startIcon,
      endIcon,
      children,
      disabled,
      variantClasses,
      loading,
      ...props
    },
    ref,
  ) => {
    const internalRef = React.useRef<HTMLAnchorElement>(null)
    const buttonRef = (ref as React.RefObject<HTMLAnchorElement>) || internalRef

    const handleMouseLeave = (): void => {
      buttonRef.current?.blur()
    }

    const renderContent = (): React.ReactNode => (
      <>
        {startIcon && <span className="inline-flex">{startIcon}</span>}
        {children}
        {endIcon && <span className="inline-flex">{endIcon}</span>}
      </>
    )

    return (
      <LinkComponent
        ref={buttonRef}
        data-slot="button"
        data-loading={loading || undefined}
        className={cn(
          variantClasses,
          (disabled || loading) && "pointer-events-none cursor-not-allowed",
          className,
        )}
        aria-disabled={disabled || loading}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <span className="relative z-1 inline-flex items-center justify-center">
          {renderContent()}
        </span>
      </LinkComponent>
    )
  },
)

ButtonBaseLink.displayName = "ButtonBaseLink"
