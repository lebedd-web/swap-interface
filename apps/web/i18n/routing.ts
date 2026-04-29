import { defineRouting } from "next-intl/routing"

export enum ELocales {
  EN = "en",
}

export const routing = defineRouting({
  locales: [ELocales.EN],
  defaultLocale: ELocales.EN,
  localePrefix: "always",
})
