"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    enableColorScheme
  >
    {children}
  </NextThemesProvider>
)
