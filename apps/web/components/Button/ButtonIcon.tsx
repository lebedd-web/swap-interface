"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import {
  ButtonBase,
  type ButtonBaseProps,
} from "@library/ui/components/Button/ButtonBase"
import { cn } from "@library/ui/lib/utils/cn"

import { SpinnerIcon } from "@/components/icons/SpinnerIcon"

const baseClasses = [
  "button-base",
  "border",
  "transition-[background-color,color,border-color,box-shadow] duration-200 ease-in-out",
]

const borderVariantClasses = [
  "bg-base-4 text-main-4 border-base-200",
  "hover:bg-base-200 hover:border-base-200",
  "focus-visible:bg-base-4 focus-visible:shadow-[0_0_0_2px_var(--color-main-6)]",
  "active:bg-base-200 active:border-base-200",
  "data-[loading=true]:bg-base-200 data-[loading=true]:border-base-200",
  "disabled:bg-base-4 disabled:text-main-6 disabled:border-base-200",
]

const withoutBorderVariantClasses = [
  "text-main-4 border-transparent",
  "hover:text-main-1 hover:border-transparent",
  "focus-visible:text-main-4 focus-visible:shadow-[0_0_0_2px_var(--color-main-6)]",
  "active:text-main-1 active:border-transparent",
  "data-[loading=true]:text-main-1 data-[loading=true]:border-transparent",
  "disabled:text-main-6 disabled:border-transparent",
]

const sizeSmallClasses = cn("size-9 rounded-sm", "[&_svg]:size-5")

const buttonIconVariants = cva(baseClasses, {
  variants: {
    variant: {
      border: borderVariantClasses,
      withoutBorder: withoutBorderVariantClasses,
    },
    size: {
      small: sizeSmallClasses,
    },
  },
  defaultVariants: {
    variant: "border",
    size: "small",
  },
})

export type ButtonIconProps = Omit<ButtonBaseProps, "variantClasses" | "loadingSpinner"> &
  VariantProps<typeof buttonIconVariants>

export const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ variant, size, className, loading, ...props }, ref) => (
    <ButtonBase
      ref={ref}
      loading={loading}
      variantClasses={buttonIconVariants({ variant, size, className })}
      loadingSpinner={<SpinnerIcon className="size-4 shrink-0 animate-spin" />}
      {...props}
    />
  ),
)

ButtonIcon.displayName = "ButtonIcon"
