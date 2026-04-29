import { Suspense } from "react"
import { SwapInterface } from "@/features/swap-interface/SwapInterface"
import { Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"

const Page = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<React.JSX.Element> => {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  return (
    <Suspense fallback={null}>
      <SwapInterface />
    </Suspense>
  )
}

export default Page
