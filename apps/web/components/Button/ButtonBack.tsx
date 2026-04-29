"use client"

import * as React from "react"
import { useRouter } from "@/i18n/navigation"
import { useTranslations } from "next-intl"

import { ButtonText, type ButtonTextProps } from "@/components/Button/ButtonText"
import { ArrowIcon } from "@/components/icons/ArrowIcon"

type TRoute = Parameters<ReturnType<typeof useRouter>["push"]>[0]

type TButtonBackProps = Omit<
  ButtonTextProps,
  "variant" | "size" | "startIcon" | "children"
> & {
  text?: React.ReactNode
  route?: TRoute
}

export const ButtonBack = React.forwardRef<HTMLButtonElement, TButtonBackProps>(
  ({ text, route, onClick, ...props }, ref) => {
    const t = useTranslations("buttonBack")
    const router = useRouter()
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
      onClick?.(event)
      if (event.defaultPrevented) return

      const canGoBack = window.history.length > 1
      if (canGoBack) {
        router.back()
        return
      }

      if (route) router.push(route)
    }

    return (
      <ButtonText
        ref={ref}
        variant="secondary"
        size="small"
        startIcon={<ArrowIcon orientation="left" className="size-5" />}
        onClick={handleClick}
        {...props}
      >
        {text ?? t("back")}
      </ButtonText>
    )
  },
)

ButtonBack.displayName = "ButtonBack"
