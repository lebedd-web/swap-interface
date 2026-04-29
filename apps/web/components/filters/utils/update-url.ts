import type { TFilters } from "../types"

type TProps = {
  current: TFilters
  newFilters: TFilters
}

type TUpdateUrl = (p: TProps) => TFilters

export const updateUrl: TUpdateUrl = ({ current, newFilters }) => {
  const query = { ...current }
  Object.keys(newFilters).forEach((alias) => {
    if (!newFilters[alias]) {
      delete query[alias]
      return
    }
    query[alias] = newFilters[alias]
  })
  return query
}
