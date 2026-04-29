export const formatTokenAmount = (value: string | number, maxDecimals = 6): string => {
  const numberValue = typeof value === "number" ? value : Number(value)

  if (!Number.isFinite(numberValue)) return "0"

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: maxDecimals,
  }).format(numberValue)
}

export const formatUsd = (value: string | number): string => {
  const numberValue = typeof value === "number" ? value : Number(value)

  if (!Number.isFinite(numberValue)) return "$0.00"

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(numberValue)
}
