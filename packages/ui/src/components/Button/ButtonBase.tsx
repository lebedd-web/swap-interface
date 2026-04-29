"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@library/ui/lib/utils/cn"

export type ButtonBaseProps = React.ComponentProps<"button"> & {
  asChild?: boolean
  loading?: boolean
  loadingSpinner: React.ReactNode
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  variantClasses?: string
}

export const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (
    {
      className,
      asChild = false,
      loading = false,
      startIcon,
      endIcon,
      children,
      disabled,
      variantClasses,
      loadingSpinner,
      ...props
    },
    ref,
  ) => {
    const internalRef = React.useRef<HTMLButtonElement>(null)
    const buttonRef = (ref as React.RefObject<HTMLButtonElement>) || internalRef

    const handleMouseLeave = (): void => {
      buttonRef.current?.blur()
    }

    const hasIcons = Boolean(startIcon || endIcon)

    const renderContent = (): React.ReactNode => {
      if (loading && !hasIcons) {
        return (
          <>
            <span className="opacity-0 inline-flex items-center">{children}</span>
            <span className="absolute inset-0 flex items-center justify-center">
              {loadingSpinner}
            </span>
          </>
        )
      }

      if (loading) {
        return (
          <>
            {loadingSpinner}
            {children}
          </>
        )
      }

      return (
        <>
          {startIcon && <span className="inline-flex">{startIcon}</span>}
          {children}
          {endIcon && <span className="inline-flex">{endIcon}</span>}
        </>
      )
    }

    if (asChild) {
      return (
        <Slot
          data-loading={loading || undefined}
          className={cn(
            variantClasses,
            loading && "pointer-events-none cursor-not-allowed",
            className,
          )}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <button
        ref={buttonRef}
        data-slot="button"
        data-loading={loading || undefined}
        className={cn(
          variantClasses,
          loading && "pointer-events-none cursor-not-allowed",
          className,
        )}
        disabled={disabled}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <span className="relative z-1 inline-flex items-center justify-center">
          {renderContent()}
        </span>
      </button>
    )
  },
)

ButtonBase.displayName = "ButtonBase"
