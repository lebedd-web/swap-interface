"use client"

import * as React from "react"

import {
  InputSelectBase,
  type TInputBaseSlotClasses,
} from "@library/ui/components/Input/InputSelectBase"
import { cn } from "@library/ui/lib/utils/cn"

import { ArrowIcon } from "@/components/icons/ArrowIcon"
import { CheckIcon } from "@/components/icons/CheckIcon"

export type TInputSelectSize = "md"

export type InputSelectProps = Omit<
  React.ComponentProps<typeof InputSelectBase>,
  "slotClasses" | "triggerIcon" | "optionsIcon"
> & {
  size?: TInputSelectSize
  optionsIcon?: boolean
  slotClasses?: TInputBaseSlotClasses
}

const SLOT_CLASSES: TInputBaseSlotClasses = {
  trigger: cn(
    "group",
    "border",
    "border-base-200",
    "bg-base-4",
    "text-main-4",
    "hover:border-main-6",
    "focus:outline-none",
    "focus-visible:border-main-1",
    "focus-visible:outline-none",
    "data-[state=open]:border-main-1",
    "data-placeholder:text-main-6",
    "data-disabled:pointer-events-none data-disabled:opacity-60",
    "data-[invalid=true]:border-main-9",
    "data-[invalid=true]:focus:border-main-9",
    "data-[invalid=true]:focus-visible:border-main-9",
    "data-[invalid=true]:data-[state=open]:border-main-9",
  ),
  content: cn(
    "border border-base-200 bg-base-2 text-main-4 shadow-[0px_8px_24px_rgba(0,0,0,0.24)]",
    "data-[side=bottom]:translate-y-2 data-[side=top]:-translate-y-2",
    "p-1",
  ),
  viewport: cn("flex flex-col gap-1 py-0"),
  item: cn(
    "justify-between rounded-[6px] text-main-4",
    "focus:bg-base-4",
    "data-highlighted:bg-base-4",
    "data-[state=checked]:bg-base-200",
    "data-disabled:opacity-50",
  ),
}

const SIZE_SLOT_CLASSES: Record<TInputSelectSize, TInputBaseSlotClasses> = {
  md: {
    trigger: cn("h-9 rounded-[8px] px-3 py-2 font-f13"),
    content: cn("rounded-[8px]"),
    viewport: cn("py-0"),
    item: cn("min-h-9 w-full px-2 py-2 font-f13"),
  },
}

export const getInputSelectSlotClasses = (
  size: TInputSelectSize,
): TInputBaseSlotClasses => {
  const sizeClasses = SIZE_SLOT_CLASSES[size]
  return {
    trigger: cn(SLOT_CLASSES.trigger, sizeClasses.trigger),
    content: cn(SLOT_CLASSES.content, sizeClasses.content),
    viewport: cn(SLOT_CLASSES.viewport, sizeClasses.viewport),
    item: cn(SLOT_CLASSES.item, sizeClasses.item),
  }
}

export const SelectPrimary = ({
  size = "md",
  slotClasses,
  optionsIcon = false,
  ...props
}: InputSelectProps): React.JSX.Element => {
  const baseClasses = getInputSelectSlotClasses(size)
  return (
    <InputSelectBase
      slotClasses={{
        trigger: cn(baseClasses.trigger, slotClasses?.trigger),
        valueWrap: cn("min-w-0 flex-1 truncate text-left", slotClasses?.valueWrap),
        content: cn(baseClasses.content, slotClasses?.content),
        viewport: cn(baseClasses.viewport, slotClasses?.viewport),
        item: cn(baseClasses.item, slotClasses?.item),
      }}
      triggerIcon={({ className }) => (
        <ArrowIcon
          orientation="down"
          className={cn(
            className,
            "ml-3 h-4 w-4 shrink-0 text-main-6 group-data-[state=open]:text-main-1",
          )}
        />
      )}
      optionsIcon={
        optionsIcon
          ? ({ className }) => (
              <CheckIcon className={cn(className, "ml-3 h-4 w-4 text-main-5")} />
            )
          : undefined
      }
      {...props}
    />
  )
}

SelectPrimary.displayName = "SelectPrimary"
