"use client"

import * as React from "react"

import { cn } from "@library/ui/lib/utils/cn"

import { ArrowIcon } from "@/components/icons/ArrowIcon"

type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}

type SelectProps = {
  value?: string
  placeholder?: string
  options: SelectOption[]
  onChange: (value: string) => void
  className?: string
  menuClassName?: string
  disabled?: boolean
}

export const Select = ({
  value,
  placeholder,
  options,
  onChange,
  className,
  menuClassName,
  disabled,
}: SelectProps): React.JSX.Element => {
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)
  const label = selectedOption?.label ?? placeholder ?? ""
  const isPlaceholder = !selectedOption && Boolean(placeholder)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (!containerRef.current) return
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  const handleSelect = (option: SelectOption): void => {
    if (option.disabled) return
    onChange(option.value)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between rounded-sm border border-base-200 bg-base-4 px-4 py-4 font-f11 text-main-4 outline-none transition-colors lg:font-f9",
          "hover:border-main-6",
          "focus-visible:border-main-1",
          open && "bg-base-2",
          disabled && "cursor-not-allowed text-main-5 opacity-60",
          className,
        )}
      >
        <span
          className={cn(
            "min-w-0 truncate whitespace-nowrap text-main-4",
            isPlaceholder && "text-main-5",
          )}
        >
          {label}
        </span>
        <ArrowIcon
          orientation="down"
          className={cn(
            "h-4 w-4 text-main-1 transition-transform lg:h-5 lg:w-5",
            open && "rotate-180",
            disabled && "text-main-5",
          )}
        />
      </button>
      {open && (
        <div
          role="listbox"
          className={cn(
            "absolute left-0 top-full z-10 mt-2 w-full overflow-hidden rounded-sm border border-base-200 bg-base-2 p-1 shadow-[0_12px_24px_rgba(0,0,0,0.2)]",
            menuClassName,
          )}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              disabled={option.disabled}
              onClick={() => handleSelect(option)}
              className={cn(
                "flex min-h-12 w-full cursor-pointer items-center justify-between truncate whitespace-nowrap rounded-xs px-3 py-2 text-left font-f12 text-main-5 transition-colors",
                option.value === value && "bg-base-4 text-main-1",
                option.disabled
                  ? "cursor-not-allowed text-main-7"
                  : "hover:bg-base-4 hover:text-main-4",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
