"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"

import { toast } from "@library/ui/components/Toast"

import { useErrors } from "../../store/errors"

export const GlobalError = (): React.JSX.Element | null => {
  const t = useTranslations("errors")
  const globalError = useErrors((state) => state.globalError)
  const clearGlobalError = useErrors((state) => state.clearGlobalError)
  const toastIdRef = useRef<string | number | null>(null)

  useEffect(() => {
    if (!globalError) {
      if (toastIdRef.current !== null) toast.dismiss(toastIdRef.current)
      toastIdRef.current = null
      return
    }

    const errorMessage =
      typeof globalError === "string" ? globalError : t("globalErrorDefault")

    if (toastIdRef.current !== null) toast.dismiss(toastIdRef.current)

    toastIdRef.current = toast.warning(errorMessage, {
      onAutoClose: clearGlobalError,
      onDismiss: clearGlobalError,
    })
  }, [clearGlobalError, globalError])

  return null
}
