export type TSelectConfig = {
  id: number
  alias: string
  title?: string
  placeholder?: string
  items: {
    value: string
    name: string
  }[]
}
