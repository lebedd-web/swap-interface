"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import {
  ButtonBase,
  type ButtonBaseProps,
} from "@library/ui/components/Button/ButtonBase"
import { cn } from "@library/ui/lib/utils/cn"

import { SpinnerIcon } from "@/components/icons/SpinnerIcon"

const baseClasses = cn(
  "button-base",
  "bg-transparent border border-transparent",
  "hover:rounded-sm focus-visible:rounded-sm active:rounded-sm",
  "data-[loading=true]:rounded-sm disabled:rounded-sm",
  "transition-[background-color,color,border-color,border-radius] duration-200 ease-in-out",
)

const primaryClasses = cn(
  "h-9",
  "px-4",
  "font-f7 text-main-1",
  "rounded-xs",
  "hover:bg-base-100",
  "focus-visible:bg-base-100 focus-visible:border-main-1",
  "active:bg-base-100",
  "data-[loading=true]:bg-base-100",
  "disabled:text-main-6",
)

const secondaryClasses = cn(
  "h-9",
  "px-3",
  "font-f12 text-main-5",
  "rounded-xs",
  "hover:bg-base-4",
  "focus-visible:bg-base-4 focus-visible:border-main-6",
  "active:bg-base-4",
  "data-[loading=true]:bg-base-4",
  "disabled:text-main-7",
)

const tertiaryClasses = cn(
  "h-5",
  "px-3",
  "font-f12 text-main-4",
  "hover:text-main-1",
  "focus-visible:text-main-1",
  "active:text-main-1",
  "data-[loading=true]:text-main-1",
  "disabled:text-main-7",
)

const sizeSmallClasses = cn("[&_svg]:size-5 *:gap-2")

export const buttonTextVariants = cva(baseClasses, {
  variants: {
    variant: {
      primary: primaryClasses,
      secondary: secondaryClasses,
      tertiary: tertiaryClasses,
    },
    size: {
      small: sizeSmallClasses,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "small",
  },
})

export type ButtonTextProps = Omit<ButtonBaseProps, "variantClasses" | "loadingSpinner"> &
  VariantProps<typeof buttonTextVariants>

export const ButtonText = React.forwardRef<HTMLButtonElement, ButtonTextProps>(
  ({ variant, size, className, loading, ...props }, ref) => (
    <ButtonBase
      ref={ref}
      loading={loading}
      variantClasses={buttonTextVariants({ variant, size, className })}
      loadingSpinner={<SpinnerIcon className="size-4 shrink-0 animate-spin" />}
      {...props}
    />
  ),
)

ButtonText.displayName = "ButtonText"
