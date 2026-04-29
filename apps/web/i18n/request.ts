import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"

import { routing } from "./routing"

// Define formats for numbers, dates, etc.
export const formats = {
  dateTime: {
    short: {
      day: "numeric" as const,
      month: "short" as const,
      year: "numeric" as const,
    },
  },
  number: {
    precise: {
      maximumFractionDigits: 5,
    },
  },
  list: {
    enumeration: {
      style: "long" as const,
      type: "conjunction" as const,
    },
  },
} as const

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale

  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    formats,
  }
})
