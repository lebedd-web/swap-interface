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
  "text-base-1 font-f7",
  "transition-[background-color,color,box-shadow] duration-200 ease-in-out",
)

const primaryClasses = cn(
  "bg-main-1 text-main-4",
  "hover:bg-main-2",
  "focus-visible:bg-main-1 focus-visible:shadow-[0_0_0_2px_var(--color-main-2)]",
  "active:bg-main-1",
  "disabled:bg-base-100 disabled:text-main-6",
)

const sizeSmallClasses = cn("h-9 px-4", "rounded-sm", "[&_svg]:size-5 *:gap-2")

const sizeMediumClasses = cn("h-10 px-4", "rounded-sm", "[&_svg]:size-5 *:gap-2")

const sizeBigClasses = cn("h-12 px-4", "rounded-sm", "[&_svg]:size-5 *:gap-2")

export const buttonFilledVariants = cva(baseClasses, {
  variants: {
    variant: {
      primary: primaryClasses,
    },
    size: {
      small: sizeSmallClasses,
      medium: sizeMediumClasses,
      big: sizeBigClasses,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
})

export type ButtonFilledProps = Omit<
  ButtonBaseProps,
  "variantClasses" | "loadingSpinner"
> &
  VariantProps<typeof buttonFilledVariants>

export const ButtonFilled = React.forwardRef<HTMLButtonElement, ButtonFilledProps>(
  ({ variant, size, className, ...props }, ref) => (
    <ButtonBase
      ref={ref}
      variantClasses={buttonFilledVariants({ variant, size, className })}
      loadingSpinner={<SpinnerIcon className="size-4 shrink-0 animate-spin" />}
      {...props}
    />
  ),
)

ButtonFilled.displayName = "ButtonFilled"
