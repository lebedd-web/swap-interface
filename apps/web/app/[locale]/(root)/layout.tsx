import type { ReactNode } from "react"
import { use } from "react"
import { Footer } from "@/layout/landing/footer"
import { Header } from "@/layout/landing/header"
import { LANDING_HEADER_OFFSET_CLASS } from "@/layout/landing/header/constants"
import { Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"

const WithHeaderLayout = ({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}): React.JSX.Element => {
  const { locale } = use(params)
  // Enable static rendering
  setRequestLocale(locale as Locale)

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="fixed left-0 right-0 top-0 z-50">
        <Header />
      </div>
      <main className={`flex-1 ${LANDING_HEADER_OFFSET_CLASS}`}>
        <div className="w-full">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

export default WithHeaderLayout
