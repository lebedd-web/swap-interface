import type { TFilters } from "../types"

type TProps = {
  pathname: string
  query: TFilters
  replace?: boolean
}

type TPushUrlQuery = (p: TProps) => string

export const pushUrlQuery: TPushUrlQuery = ({ pathname, query, replace = false }) => {
  const params = new URLSearchParams(query).toString()
  const href = params ? `${pathname}?${params}` : pathname

  if (replace) {
    window.history.replaceState(null, "", href)
    return href
  }

  window.history.pushState(null, "", href)
  return href
}
