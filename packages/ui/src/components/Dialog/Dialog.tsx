"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@library/ui/lib/utils/cn"

const Dialog = ({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>): React.JSX.Element => (
  <DialogPrimitive.Root data-slot="dialog" {...props} />
)

const DialogTrigger = ({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>): React.JSX.Element => (
  <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
)

const DialogPortal = ({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>): React.JSX.Element => (
  <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
)

const DialogClose = ({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>): React.JSX.Element => (
  <DialogPrimitive.Close data-slot="dialog-close" {...props} />
)

const DialogOverlay = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>): React.JSX.Element => (
  <DialogPrimitive.Overlay
    data-slot="dialog-overlay"
    className={cn(
      "overflow-y-auto flex flex-col items-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50",
      className,
    )}
    {...props}
  />
)

const DialogContent = ({
  className,
  children,
  placement = "center",
  variant = "default",
  showCloseButton = true,
  wrapperClassName,
  overlayClassName,
  closeButtonClassName,
  spacerClassName,
  contentClassName,
  closeIcon,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  placement?: "center" | "top"
  variant?: "default" | "bottomSheet"
  showCloseButton?: boolean
  wrapperClassName?: string
  overlayClassName?: string
  closeButtonClassName?: string
  spacerClassName?: string
  contentClassName?: string
  closeIcon?: React.ReactNode
}): React.JSX.Element => (
  <DialogPortal data-slot="dialog-portal">
    <DialogOverlay
      className={cn(
        variant === "bottomSheet" && "max-md:px-0 max-md:overflow-hidden",
        overlayClassName,
      )}
    >
      <div
        className={cn(
          "shrink-0",
          spacerClassName,
          variant === "bottomSheet" && "max-md:h-0",
        )}
      />
      <div
        className={cn(
          "w-full flex flex-1 items-start justify-center mx-auto",
          variant === "bottomSheet" && "max-md:items-end",
        )}
      >
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={cn(
            "max-w-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 relative duration-200",
            "outline-none focus:outline-none focus-visible:outline-none",
            variant === "default" &&
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            variant === "bottomSheet" &&
              "max-md:transition-transform max-md:ease-out max-md:data-[state=closed]:translate-y-full max-md:data-[state=open]:translate-y-0",
            placement === "center" && "my-auto",
            variant === "bottomSheet" && "max-md:my-0",
            variant === "bottomSheet" && "max-md:w-full max-md:mx-0",
            contentClassName,
          )}
          {...props}
        >
          <div
            className={cn(
              "mx-auto relative w-full",
              variant === "bottomSheet" &&
                "max-md:w-full max-md:max-w-none max-md:rounded-b-none max-md:overflow-hidden",
              wrapperClassName,
            )}
          >
            {showCloseButton && (
              <DialogPrimitive.Close
                data-slot="dialog-close"
                className={cn(
                  "cursor-pointer absolute rounded-xs transition-colors disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6 z-10 outline-none focus:outline-none focus:ring-0",
                  closeButtonClassName,
                )}
              >
                {closeIcon}
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            )}
            <div
              className={cn(
                variant === "bottomSheet" && "max-md:overflow-y-auto",
                className,
              )}
            >
              {children}
            </div>
          </div>
        </DialogPrimitive.Content>
      </div>
      <div
        className={cn(
          "shrink-0",
          spacerClassName,
          variant === "bottomSheet" && "max-md:h-0",
        )}
      />
    </DialogOverlay>
  </DialogPortal>
)

const DialogHeader = ({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element => (
  <div
    data-slot="dialog-header"
    className={cn("flex flex-col gap-2 text-left", className)}
    {...props}
  />
)

const DialogTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>): React.JSX.Element => (
  <DialogPrimitive.Title
    data-slot="dialog-title"
    className={cn("text-left break-words", className)}
    {...props}
  />
)

const DialogDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>): React.JSX.Element => (
  <DialogPrimitive.Description
    data-slot="dialog-description"
    className={cn("text-left whitespace-pre-line", className)}
    {...props}
  />
)

const DialogFooter = ({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element => (
  <div data-slot="dialog-footer" className={cn(className)} {...props} />
)

const DialogContentPrimitive = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>): React.JSX.Element => (
  <DialogPrimitive.Content
    data-slot="dialog-content-primitive"
    className={className}
    {...props}
  />
)

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogContentPrimitive,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
