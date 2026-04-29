/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios"
import type { UseFormSetError } from "react-hook-form"

import { setGlobalError } from "../store/errors"
import { E_ERROR_STATUS } from "../types/error-status"

export type TResponse<M, E = unknown> = {
  statusCode: number
  message: M
  error?: string
} & E

type THandleRestErrorProps<M, E> = {
  e: unknown
  custom?: (status: number, data: TResponse<M, E>) => boolean
  setFieldErrors?: UseFormSetError<any>
}

export const handleRestErrors = <M = string, E = unknown>({
  e,
  custom,
  setFieldErrors,
}: THandleRestErrorProps<M, E>): void => {
  if (axios.isCancel(e)) return

  if (!axios.isAxiosError<TResponse<M, E>>(e) || !e.response) return

  const { status, data } = e.response

  if (custom) {
    const hasReturn = custom(status, data as TResponse<M, E>)
    if (hasReturn) return
  }

  if (setFieldErrors && status === E_ERROR_STATUS.VALIDATION) {
    const message = data.message

    if (typeof message === "string") {
      setGlobalError(message)
      return
    }

    if (message && typeof message === "object") {
      Object.entries(message as Record<string, unknown>).forEach(([key, value]) => {
        const messageText = Array.isArray(value)
          ? String(value[0] ?? "")
          : String(value ?? "")

        setFieldErrors(key as never, {
          type: "server",
          message: messageText,
        })
      })

      return
    }
  }

  setGlobalError(data.message as string)
}
