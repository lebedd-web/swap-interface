"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"

import { cn } from "@library/ui/lib/utils/cn"

type FormSelectOption = {
  label: React.ReactNode
  value: string
}

export type TInputBaseSlotClasses = {
  trigger?: string
  valueWrap?: string
  content?: string
  viewport?: string
  item?: string
}

type SelectTriggerIconRender = (props: { className: string }) => React.ReactElement
type SelectOptionsIconRender = (props: { className: string }) => React.ReactElement

type SelectTriggerProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
> & {
  icon: SelectTriggerIconRender
}

type SelectContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
  "className"
> & {
  contentClassName?: string
  viewportClassName?: string
}

const Select = SelectPrimitive.Root
const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, icon, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "group",
      "flex",
      "items-center",
      "justify-between",
      "w-full",
      "outline-none",
      "cursor-pointer",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      {icon({
        className: cn(" transition-transform group-data-[state=open]:rotate-180"),
      })}
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))

const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(
  (
    { contentClassName, viewportClassName, children, position = "popper", ...props },
    ref,
  ) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "relative z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden",
          contentClassName,
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport className={viewportClassName}>
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  ),
)

type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
  optionsIcon?: SelectOptionsIconRender
}

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, optionsIcon, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative",
      "flex",
      "w-full",
      "cursor-pointer",
      "select-none",
      "items-center",
      "outline-none",
      "data-[state=checked]:pointer-events-none",
      "data-[disabled]:pointer-events-none",
      className,
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    {optionsIcon && (
      <SelectPrimitive.ItemIndicator asChild>
        {optionsIcon({ className: "" })}
      </SelectPrimitive.ItemIndicator>
    )}
  </SelectPrimitive.Item>
))

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName
SelectContent.displayName = SelectPrimitive.Content.displayName
SelectItem.displayName = SelectPrimitive.Item.displayName

export type SelectInputProps = {
  triggerIcon: SelectTriggerIconRender
  optionsIcon?: SelectOptionsIconRender
  slotClasses?: TInputBaseSlotClasses
  label?: React.ReactNode
  invalid?: boolean
  value?: string
  disabled?: boolean
  onValueChange?: (value: string) => void
  blurOnClose?: boolean
  placeholder?: React.ReactNode
  options: FormSelectOption[]
}

export const InputSelectBase = ({
  triggerIcon,
  optionsIcon,
  label,
  invalid,
  placeholder,
  options,
  value,
  disabled,
  onValueChange,
  blurOnClose = false,
  slotClasses,
}: SelectInputProps): React.JSX.Element => {
  const ariaInvalid = invalid ?? undefined
  const triggerRef =
    React.useRef<React.ComponentRef<typeof SelectPrimitive.Trigger>>(null)

  const handleCloseAutoFocus = (event: Event): void => {
    if (!blurOnClose) return
    event.preventDefault()
    requestAnimationFrame(() => {
      triggerRef.current?.blur()
    })
  }

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger
        ref={triggerRef}
        icon={triggerIcon}
        aria-label={typeof label === "string" ? label : undefined}
        aria-invalid={ariaInvalid}
        data-invalid={ariaInvalid}
        disabled={disabled}
        className={slotClasses?.trigger}
      >
        <span className={slotClasses?.valueWrap}>
          <SelectValue placeholder={placeholder} />
        </span>
      </SelectTrigger>
      <SelectContent
        contentClassName={slotClasses?.content}
        viewportClassName={slotClasses?.viewport}
        onCloseAutoFocus={handleCloseAutoFocus}
      >
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className={slotClasses?.item}
            optionsIcon={optionsIcon}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
