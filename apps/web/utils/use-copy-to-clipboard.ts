"use client"

import { useState } from "react"

type TUseCopyToClipboardOptions = {
  onCopy?: (text: string) => void
  resetDelay?: number
}

type TUseCopyToClipboardReturn = {
  copied: boolean
  copy: (text: string) => void
}

export const useCopyToClipboard = (
  options: TUseCopyToClipboardOptions = {},
): TUseCopyToClipboardReturn => {
  const { onCopy, resetDelay = 1000 } = options
  const [copied, setCopied] = useState(false)

  const copy = (text: string) => {
    if (!text) return

    if (typeof navigator === "undefined" || !navigator.clipboard) return

    onCopy?.(text)

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        window.setTimeout(() => setCopied(false), resetDelay)
      })
      .catch(() => {
        // ignore clipboard errors
      })
  }

  return { copied, copy }
}
