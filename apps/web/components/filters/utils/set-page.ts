import { DEFAULT_PAGE } from "../constants"
import type { TFilters } from "../types"
import { EPageAlias } from "../types"
import { updateUrl } from "./update-url"

type TProps = {
  urlFilters: TFilters
  page: number
}

type TUpdateUrl = (p: TProps) => TFilters

export const setPage: TUpdateUrl = ({ urlFilters, page }) => {
  const stringPage = page.toString()

  return updateUrl({
    current: urlFilters,
    newFilters: { [EPageAlias.page]: stringPage !== DEFAULT_PAGE ? stringPage : "" },
  })
}
