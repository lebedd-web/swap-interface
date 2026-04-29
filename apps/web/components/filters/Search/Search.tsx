import { useEffect, useState } from "react"

import { SearchIcon } from "@/components/icons/SearchIcon"
import { InputPrimary } from "@/components/inputs/InputPrimary"

import type { TChangeFilter } from "../types"
import type { TInputConfig } from "./types"

type TProps = {
  filter?: string
  config: TInputConfig
  onChange: (d: TChangeFilter<never>) => void
  disabled?: boolean
}

const DEFAULT_DEBOUNCE_MS = 500

export const Search = ({
  filter,
  config,
  onChange,
  disabled = false,
}: TProps): React.JSX.Element => {
  const [value, setValue] = useState(filter ?? "")

  useEffect(() => {
    setValue(filter ?? "")
  }, [filter])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if ((filter ?? "") === value) return

      onChange({
        filter: {
          [config.alias]: value,
        },
      })
    }, config.debounceMs ?? DEFAULT_DEBOUNCE_MS)

    return () => window.clearTimeout(timeoutId)
  }, [config.alias, config.debounceMs, filter, onChange, value])

  return (
    <InputPrimary
      value={value}
      size="small"
      disabled={disabled}
      aria-label={config.title ?? config.alias}
      placeholder={config.placeholder}
      startAdornment={<SearchIcon className="size-4" />}
      slotClasses={{
        wrapper: "bg-[#27272A]",
        field: "bg-[#27272A]",
      }}
      onChange={(event) => setValue(event.target.value)}
    />
  )
}
