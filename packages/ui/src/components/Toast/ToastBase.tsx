"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const MOBILE_BREAKPOINT_PX = 600

const ToastBase = ({ position, style, ...props }: ToasterProps): React.JSX.Element => {
  const { theme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`)
    const update = () => setIsMobile(query.matches)

    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position={position ?? (isMobile ? "bottom-center" : "bottom-right")}
      style={
        {
          ...(isMobile
            ? {
                width:
                  "calc(100% - var(--mobile-offset-left) - var(--mobile-offset-right))",
              }
            : {}),
          ...(style ?? {}),
        } as ToasterProps["style"]
      }
      {...props}
    />
  )
}

export { ToastBase }
