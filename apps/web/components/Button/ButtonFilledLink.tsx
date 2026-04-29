"use client"

import * as React from "react"
import { Link } from "@/i18n/navigation"
import { type VariantProps } from "class-variance-authority"

import {
  ButtonBaseLink,
  type TButtonBaseProps,
} from "@library/ui/components/Button/ButtonBaseLink"

import { buttonFilledVariants } from "./ButtonFilled"

export type ButtonFilledLinkProps = Omit<
  TButtonBaseProps,
  "variantClasses" | "LinkComponent"
> &
  VariantProps<typeof buttonFilledVariants>

export const ButtonFilledLink = React.forwardRef<
  HTMLAnchorElement,
  ButtonFilledLinkProps
>(({ variant, size, className, ...props }, ref) => (
  <ButtonBaseLink
    ref={ref}
    LinkComponent={Link}
    variantClasses={buttonFilledVariants({ variant, size, className })}
    {...props}
  />
))

ButtonFilledLink.displayName = "ButtonFilledLink"
