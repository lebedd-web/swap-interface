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
  "text-main-4 font-f7",
  "border border-base-200",
  "transition-[background-color,color,border-color,box-shadow] duration-200 ease-in-out",
)

const secondaryClasses = cn(
  "bg-base-4 text-main-4 border-base-200",
  "hover:bg-base-200",
  "focus-visible:bg-base-4 focus-visible:shadow-[0_0_0_2px_var(--color-main-6)]",
  "active:bg-base-200",
  "disabled:bg-base-4 disabled:text-main-6 disabled:border-base-200",
)

const sizeMediumClasses = cn("h-9 px-4", "rounded-sm", "[&_svg]:size-5 *:gap-2")

const sizeBigClasses = cn("h-12 px-4", "rounded-sm", "[&_svg]:size-5 *:gap-2")

export const buttonOutlinedVariants = cva(baseClasses, {
  variants: {
    variant: {
      secondary: secondaryClasses,
    },
    size: {
      medium: sizeMediumClasses,
      big: sizeBigClasses,
    },
  },
  defaultVariants: {
    variant: "secondary",
    size: "medium",
  },
})

export type ButtonOutlinedProps = Omit<
  ButtonBaseProps,
  "variantClasses" | "loadingSpinner"
> &
  VariantProps<typeof buttonOutlinedVariants>

export const ButtonOutlined = React.forwardRef<HTMLButtonElement, ButtonOutlinedProps>(
  ({ variant, size, className, ...props }, ref) => (
    <ButtonBase
      ref={ref}
      variantClasses={buttonOutlinedVariants({ variant, size, className })}
      loadingSpinner={<SpinnerIcon className="size-4 shrink-0 animate-spin" />}
      {...props}
    />
  ),
)

ButtonOutlined.displayName = "ButtonOutlined"
