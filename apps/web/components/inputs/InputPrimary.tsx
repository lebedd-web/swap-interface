"use client"

import * as React from "react"

import {
  InputBase,
  type InputBaseProps,
  type InputBaseSlotClasses,
} from "@library/ui/components/Input/InputBase"
import { cn } from "@library/ui/lib/utils/cn"

export type TInputPrimarySize = "small" | "large"

export type InputPrimaryProps = Omit<InputBaseProps, "size"> & {
  size?: TInputPrimarySize
}

const BASE_SLOT_CLASSES = {
  input: cn(
    "w-full border border-base-200 bg-base-4",
    "font-f13 text-main-4 placeholder:text-main-6",
    "hover:border-main-6 focus:border-main-1",
    "disabled:text-main-7 disabled:placeholder:text-main-7",
    "read-only:hover:border-base-200 read-only:focus:border-base-200",
    "aria-invalid:border-main-9",
    "autofill:[-webkit-text-fill-color:var(--color-main-4)]",
  ),
  wrapper: cn(
    "w-full border border-base-200 bg-base-4 text-main-4",
    "hover:border-main-6 focus-within:border-main-1 focus-within:hover:border-main-1",
    "data-[invalid=true]:border-main-9 data-[invalid=true]:focus-within:border-main-9",
    "data-[disabled=true]:[&_.input-base-field]:text-main-7",
    "data-[disabled=true]:[&_.input-base-field]:placeholder:text-main-7",
    "data-[disabled=true]:[&_.input-base-adornment]:text-main-6",
    "data-[readonly=true]:hover:border-base-200 data-[readonly=true]:focus-within:border-base-200",
  ),
  field: cn(
    "bg-base-4 font-f13 text-main-4 placeholder:text-main-6",
    "autofill:[-webkit-text-fill-color:var(--color-main-4)]",
  ),
  adornment: cn("font-f5 text-main-5"),
}

const SIZE_SMALL_COMMON = cn("h-9 rounded-[8px] px-4")
const SIZE_LARGE_COMMON = cn("h-12 rounded-[8px] px-4")

const SIZE_SLOT_CLASSES: Record<TInputPrimarySize, InputBaseSlotClasses> = {
  small: {
    input: cn(SIZE_SMALL_COMMON, "py-2"),
    wrapper: cn(SIZE_SMALL_COMMON, "gap-2"),
  },
  large: {
    input: cn(SIZE_LARGE_COMMON, "py-3"),
    wrapper: cn(SIZE_LARGE_COMMON, "gap-2"),
  },
}

export const getInputPrimarySlotClasses = (
  size: TInputPrimarySize,
): InputBaseSlotClasses => {
  const sizeClasses = SIZE_SLOT_CLASSES[size]

  return {
    input: cn(BASE_SLOT_CLASSES.input, sizeClasses.input),
    wrapper: cn(BASE_SLOT_CLASSES.wrapper, sizeClasses.wrapper),
    field: cn(BASE_SLOT_CLASSES.field, sizeClasses.field),
    adornment: cn(BASE_SLOT_CLASSES.adornment, sizeClasses.adornment),
  }
}

export const InputPrimary = React.forwardRef<HTMLInputElement, InputPrimaryProps>(
  ({ size = "large", slotClasses, ...props }, ref) => {
    const baseClasses = getInputPrimarySlotClasses(size)

    return (
      <InputBase
        ref={ref}
        slotClasses={{
          input: cn(baseClasses.input, slotClasses?.input),
          wrapper: cn(baseClasses.wrapper, slotClasses?.wrapper),
          field: cn(baseClasses.field, slotClasses?.field),
          adornment: cn(baseClasses.adornment, slotClasses?.adornment),
        }}
        {...props}
      />
    )
  },
)

InputPrimary.displayName = "InputPrimary"
