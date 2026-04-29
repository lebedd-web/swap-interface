import { useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"

type TUseScrollManagement = (options: {
  trigger?: unknown
  onPaginationChange?: () => void
}) => {
  markPaginationClick: () => void
}

export const useScrollPagiation: TUseScrollManagement = ({
  trigger,
  onPaginationChange,
}) => {
  const searchParams = useSearchParams()
  const isPaginationClick = useRef(false)

  // Disable browser scroll restoration and reset to 0 on navigation
  useEffect(() => {
    if (typeof window === "undefined") return

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    window.scrollTo({ top: 0, behavior: "auto" })

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto"
      }
    }
  }, [searchParams])

  // Smooth scroll to top only when page changes via pagination
  useEffect(() => {
    if (!trigger) return
    if (!isPaginationClick.current) return

    window.scrollTo({ top: 0, behavior: "smooth" })
    isPaginationClick.current = false

    onPaginationChange?.()
  }, [trigger, onPaginationChange])

  const markPaginationClick = () => {
    isPaginationClick.current = true
  }

  return {
    markPaginationClick,
  }
}
