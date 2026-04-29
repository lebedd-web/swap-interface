import * as React from "react"

import { SelectPrimary } from "@/components/inputs/SelectPrimary"

import { TChangeFilter } from "../types"
import { TSelectConfig } from "./types"

type TProps = {
  filter?: string
  config: TSelectConfig
  onChange: (d: TChangeFilter<never>) => void
  loading?: boolean
} & Omit<
  React.ComponentProps<typeof SelectPrimary>,
  "value" | "options" | "optionsIcon" | "label" | "onValueChange" | "disabled"
>

export const Select = ({
  config,
  filter,
  onChange,
  loading,
  ...selectProps
}: TProps): React.JSX.Element => {
  const [value, setValue] = React.useState<string | undefined>(filter)

  React.useEffect(() => {
    setValue(filter)
  }, [filter])

  const options = config.items.map((item) => ({
    label: item.name,
    value: item.value,
  }))

  return (
    <div>
      <SelectPrimary
        value={value}
        options={options}
        optionsIcon
        disabled={options.length === 0 || loading}
        label={config.title ?? config.alias}
        placeholder={config.placeholder}
        onValueChange={(nextValue) => {
          setValue(nextValue)
          onChange({ filter: { [config.alias]: nextValue } })
        }}
        {...selectProps}
      />
    </div>
  )
}
