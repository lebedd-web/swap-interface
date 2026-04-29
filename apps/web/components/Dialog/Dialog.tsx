"use client"

import * as React from "react"

import {
  Dialog,
  DialogClose,
  DialogContent as DialogContentBase,
  DialogContentPrimitive,
  DialogDescription as DialogDescriptionBase,
  DialogFooter as DialogFooterBase,
  DialogHeader as DialogHeaderBase,
  DialogOverlay as DialogOverlayBase,
  DialogPortal,
  DialogTitle as DialogTitleBase,
  DialogTrigger,
} from "@library/ui/components/Dialog"
import { cn } from "@library/ui/lib/utils/cn"

import { CloseIcon } from "@/components/icons/CloseIcon"

type TDialogOverlayProps = React.ComponentProps<typeof DialogOverlayBase>
type TDialogContentProps = React.ComponentProps<typeof DialogContentBase>
type TDialogDescriptionProps = React.ComponentProps<typeof DialogDescriptionBase>
type TDialogFooterProps = React.ComponentProps<typeof DialogFooterBase>
type TDialogHeaderProps = React.ComponentProps<typeof DialogHeaderBase>
type TDialogTitleProps = React.ComponentProps<typeof DialogTitleBase>

const DialogOverlay: React.FC<TDialogOverlayProps> = ({ className, ...props }) => (
  <DialogOverlayBase
    className={cn("bg-(--color-overlay) backdrop-blur-[5px]", className)}
    {...props}
  />
)

const DialogContent: React.FC<TDialogContentProps> = ({
  variant = "default",
  showCloseButton = false,
  className,
  wrapperClassName,
  overlayClassName,
  closeButtonClassName,
  spacerClassName,
  ...props
}) => (
  <DialogContentBase
    variant={variant}
    showCloseButton={showCloseButton}
    contentClassName="w-full"
    spacerClassName={cn("h-4", spacerClassName)}
    overlayClassName={cn("px-4 bg-overlay-2 backdrop-blur-[5px]", overlayClassName)}
    wrapperClassName={cn(
      "max-w-[400px] rounded-lg border border-base-200 bg-base-2 px-4 py-6",
      variant === "bottomSheet" && "max-md:max-h-[90dvh] max-md:p-0",
      wrapperClassName,
    )}
    className={cn(
      "flex flex-col",
      variant === "bottomSheet" &&
        "max-md:max-h-[90dvh] max-md:p-4 max-md:pb-[calc(env(safe-area-inset-bottom)+16px)]",
      className,
    )}
    closeIcon={<CloseIcon className="size-6 md:size-6 text-main-4" />}
    closeButtonClassName={cn(
      "top-4 right-4 sm:top-6 sm:right-6 [html[dir='rtl']_&]:right-auto [html[dir='rtl']_&]:left-4 text-main-3 hover:text-main-2",
      closeButtonClassName,
    )}
    {...props}
  />
)

const DialogHeader: React.FC<TDialogHeaderProps> = ({ className, ...props }) => (
  <DialogHeaderBase className={cn("gap-2", className)} {...props} />
)

const DialogTitle: React.FC<TDialogTitleProps> = ({ className, ...props }) => (
  <DialogTitleBase className={cn("text-main-4 font-f5 pr-12", className)} {...props} />
)

const DialogDescription: React.FC<TDialogDescriptionProps> = ({
  className,
  ...props
}) => (
  <DialogDescriptionBase className={cn("text-main-4 font-f13", className)} {...props} />
)

const DialogFooter: React.FC<TDialogFooterProps> = ({ className, ...props }) => (
  <DialogFooterBase
    className={cn(
      "flex flex-col-reverse gap-3 mt-6 sm:flex-row sm:gap-4 sm:justify-end",
      className,
    )}
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
