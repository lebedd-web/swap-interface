"use client"

import { type ToasterProps } from "sonner"

import { ToastBase } from "@library/ui/components/Toast"

import { ErrorIcon } from "@/components/icons/ErrorIcon"
import { SuccessIcon } from "@/components/icons/SuccessIcon"
import { WarningIcon } from "@/components/icons/WarningIcon"

type TAppToastProps = ToasterProps

export const Toast: React.FC<TAppToastProps> = (props) => (
  <ToastBase
    className="toaster group"
    style={
      {
        "--width": "343px",
        "--normal-bg": "var(--color-base-2)",
        "--normal-text": "var(--color-main-3)",
        "--normal-border": "var(--color-base-3)",
      } as ToasterProps["style"]
    }
    closeButton
    icons={{
      error: (
        <span className="flex size-10 items-center justify-center rounded-full bg-main-9/60 text-main-9">
          <ErrorIcon className="size-6" />
        </span>
      ),
      warning: (
        <span className="flex size-10 items-center justify-center rounded-full bg-main-10/60 text-main-10">
          <WarningIcon className="size-6" />
        </span>
      ),
      info: (
        <span className="flex size-10 items-center justify-center rounded-full bg-main-10/60 text-main-10">
          <WarningIcon className="size-6" />
        </span>
      ),
      success: (
        <span className="flex size-10 items-center justify-center rounded-full bg-main-8/60 text-main-8">
          <SuccessIcon className="size-6" />
        </span>
      ),
    }}
    toastOptions={{
      classNames: {
        toast:
          "!overflow-hidden !bg-base-2 !border !border-base-200 !border-solid !rounded-[var(--radius-lg)] !px-3 !py-3 !flex !items-start !gap-3 !w-full min-[601px]:!w-[343px] !max-w-[343px] !mx-auto !after:content-[''] !after:absolute !after:left-[3px] !after:right-[3px] !after:bottom-0 !after:h-[2px] !after:rounded-[32px]",
        title: "!font-f6 !m-0 !p-0 !text-main-4",
        description: "!font-f14 !m-0 !p-0 !text-main-4",
        content: "!m-0 !p-0 !flex !flex-col !gap-1 !min-w-0",
        icon: "!m-0 !p-0 !size-10 !shrink-0",
        closeButton:
          "!absolute !inset-0 !h-full !w-full !opacity-0 !p-0 !m-0 !bg-transparent !border-0 !rounded-[var(--radius-lg)] !transform-none",
        actionButton: "!relative !z-10",
        cancelButton: "!relative !z-10",
        error: "!after:!bg-main-9",
        warning: "!after:!bg-main-10",
        info: "!after:!bg-main-10",
        success: "!after:!bg-main-8",
      },
    }}
    {...props}
  />
)
