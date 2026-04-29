"use client"

import * as React from "react"

import {
  Switch as SwitchBase,
  type TSwitchProps as TSwitchBaseProps,
  type TSwitchSlotClasses,
} from "@library/ui/components/Switch"
import { cn } from "@library/ui/lib/utils/cn"

export type TSwitchProps = Omit<TSwitchBaseProps, "slotClasses"> & {
  slotClasses?: TSwitchSlotClasses
}

const SLOT_CLASSES: TSwitchSlotClasses = {
  root: cn(
    "group/switch peer inline-flex h-8 w-[52px] shrink-0 cursor-pointer items-center rounded-full p-1",
    "bg-main-7 transition-[background-color] duration-200 ease-in-out",
    "focus-visible:outline-none",
    "data-[state=checked]:bg-main-1",
    "disabled:cursor-default disabled:data-[state=checked]:bg-base-100",
    "disabled:focus-visible:shadow-none",
    "disabled:**:data-[slot=switch-thumb]:bg-main-6",
    "disabled:[&_[data-slot=switch-thumb]::before]:hidden",
  ),
  thumb: cn(
    "pointer-events-none relative block size-6 rounded-full bg-main-4 transition-transform duration-200 ease-in-out",
    "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
    "before:absolute before:left-1/2 before:top-1/2 before:hidden before:-translate-x-1/2 before:-translate-y-1/2",
    "before:rounded-full before:content-['']",
    "data-[state=checked]:before:bg-main-3 data-[state=unchecked]:before:bg-main-5",
    "group-hover/switch:before:block group-hover/switch:before:size-10",
    "group-focus-visible/switch:before:block group-focus-visible/switch:before:size-10",
    "group-active/switch:before:block group-active/switch:before:size-[46px]",
    "data-[state=checked]:group-hover/switch:before:opacity-25",
    "data-[state=unchecked]:group-hover/switch:before:opacity-15",
    "data-[state=checked]:group-focus-visible/switch:before:opacity-35",
    "data-[state=unchecked]:group-focus-visible/switch:before:opacity-25",
    "data-[state=checked]:group-active/switch:before:opacity-35",
    "data-[state=unchecked]:group-active/switch:before:opacity-15",
  ),
}

export const Switch = React.forwardRef<React.ElementRef<typeof SwitchBase>, TSwitchProps>(
  ({ className, slotClasses, ...props }, ref) => (
    <SwitchBase
      ref={ref}
      className={cn(SLOT_CLASSES.root, className, slotClasses?.root)}
      slotClasses={{
        thumb: cn(SLOT_CLASSES.thumb, slotClasses?.thumb),
      }}
      {...props}
    />
  ),
)

Switch.displayName = "Switch"
