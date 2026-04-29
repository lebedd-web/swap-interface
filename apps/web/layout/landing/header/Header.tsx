"use client"

import { useTranslations } from "next-intl"

import { LANDING_HEADER_HEIGHT_CLASS } from "./constants"

export const Header = (): React.JSX.Element => (
  <header className="w-full border-b border-base-4 bg-base-1">
    <div
      className={`mx-auto flex w-full max-w-[1440px] items-center justify-start gap-4 px-4 md:px-10 lg:px-14 ${LANDING_HEADER_HEIGHT_CLASS}`}
    >
      <HeaderLink />
    </div>
  </header>
)

const HeaderLink = (): React.JSX.Element => {
  const tBrand = useTranslations("brandName")

  return (
    <a
      href="https://peiko.space/"
      target="_blank"
      rel="noopener noreferrer"
      className="font-f4 text-main-2 transition-colors hover:text-main-1"
    >
      {tBrand("title")}
    </a>
  )
}
