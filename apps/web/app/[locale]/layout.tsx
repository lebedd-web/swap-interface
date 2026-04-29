import { Urbanist } from "next/font/google"
import { hasLocale, Locale, NextIntlClientProvider } from "next-intl"

import "@/styles/global.css"

import { notFound } from "next/navigation"
import { ALLOW_INDEXING } from "@/constants/config"
import { GlobalError } from "@/features/errors"
import { routing } from "@/i18n/routing"
import { ThemeProvider } from "@/providers/theme-provider"
import { setRequestLocale } from "next-intl/server"

import { Toast } from "@/components/Toast"

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-urbanist",
})

// enables static rendering
export const generateStaticParams = (): { locale: Locale }[] =>
  routing.locales.map((locale) => ({ locale }))

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}): Promise<React.JSX.Element> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale) // <-- enables static rendering

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className="scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <head>{!ALLOW_INDEXING && <meta name="robots" content="noindex, nofollow" />}</head>
      <body className={`${urbanist.className} ${urbanist.variable} antialiased`}>
        <NextIntlClientProvider>
          <ThemeProvider>
            {children}
            <GlobalError />
            <Toast />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
