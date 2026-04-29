import { TSelectConfig } from "../types"

type TFunction = (p: { config: TSelectConfig; filter?: string }) => boolean

export const isValid: TFunction = ({ config, filter }) =>
  config.items.some((item) => item.value === filter)
