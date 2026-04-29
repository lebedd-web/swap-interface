"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@library/ui/lib/utils/cn"

export type TSwitchSlotClasses = {
  root?: string
  thumb?: string
}

export type TSwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & {
  slotClasses?: TSwitchSlotClasses
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  TSwitchProps
>(({ className, slotClasses, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    data-slot="switch"
    className={cn(className, slotClasses?.root)}
    {...props}
  >
    <SwitchPrimitive.Thumb data-slot="switch-thumb" className={cn(slotClasses?.thumb)} />
  </SwitchPrimitive.Root>
))

Switch.displayName = "Switch"

export { Switch }
