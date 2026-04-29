"use client"

import * as React from "react"

import { cn } from "@library/ui/lib/utils/cn"

import { useInputNumber } from "./utils/use-input-number"

export type InputBaseSlotClasses = {
  input?: string
  wrapper?: string
  field?: string
  adornment?: string
}

export type InputBaseProps = React.ComponentProps<"input"> & {
  slotClasses?: InputBaseSlotClasses
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  startAdornmentInteractive?: boolean
  endAdornmentInteractive?: boolean
  decimals?: number
}

export const InputBase = React.forwardRef<HTMLInputElement, InputBaseProps>(
  (
    {
      className,
      slotClasses,
      disabled,
      startAdornment,
      endAdornment,
      startAdornmentInteractive = false,
      endAdornmentInteractive = false,
      decimals,
      type,
      dir,
      onChange,
      ...props
    },
    ref,
  ) => {
    const onChangeNumber = useInputNumber<React.ChangeEvent<HTMLInputElement>>({
      decimals,
      onChange,
    })

    const isNumberMode = decimals !== undefined
    const emailDir = type === "email" ? "ltr" : undefined
    const emailTextAlignClass = type === "email" ? "[text-align:start]" : undefined
    const ariaInvalid = props["aria-invalid"] === true || props["aria-invalid"] === "true"
    const isReadonly = props.readOnly === true

    const input = (
      <input
        dir={emailDir ?? dir}
        ref={ref}
        data-slot="input"
        type={isNumberMode ? "text" : type}
        inputMode={
          isNumberMode ? (decimals === 0 ? "numeric" : "decimal") : props.inputMode
        }
        className={cn("input-base", emailTextAlignClass, slotClasses?.input, className)}
        disabled={disabled}
        onChange={onChangeNumber}
        {...props}
      />
    )

    if (!startAdornment && !endAdornment) {
      return input
    }

    return (
      <div
        className={cn("input-base-wrapper", slotClasses?.wrapper)}
        data-disabled={disabled}
        data-invalid={ariaInvalid}
        data-readonly={isReadonly}
        dir={dir}
      >
        {startAdornment && (
          <span
            className={cn(
              "input-base-adornment text-main-6",
              !startAdornmentInteractive && "pointer-events-none",
              slotClasses?.adornment,
            )}
          >
            {startAdornment}
          </span>
        )}
        <input
          dir={emailDir}
          ref={ref}
          data-slot="input"
          type={isNumberMode ? "text" : type}
          className={cn(
            "input-base-field min-w-0",
            emailTextAlignClass,
            slotClasses?.field,
            className,
          )}
          disabled={disabled}
          onChange={onChangeNumber}
          {...props}
        />
        {endAdornment && (
          <span
            className={cn(
              "input-base-adornment",
              !endAdornmentInteractive && "pointer-events-none",
              slotClasses?.adornment,
            )}
          >
            {endAdornment}
          </span>
        )}
      </div>
    )
  },
)

InputBase.displayName = "InputBase"
