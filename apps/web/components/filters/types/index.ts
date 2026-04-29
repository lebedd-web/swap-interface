export type TFilters = Record<string, string>

export type TValidation = Record<string, boolean>

export type TChangeFilter<T> = {
  filter: TFilters
  additional?: T
  validation?: TValidation
}

export enum ESort {
  "createdAt:desc" = "createdAt:desc",
  "createdAt:asc" = "createdAt:asc",
}

export enum EPageAlias {
  page = "page",
}
