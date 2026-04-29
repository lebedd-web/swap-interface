import { useRef } from "react"

import { cutDecimals } from "./cut-decimals"
import { stringIsNumber } from "./string-is-number"

interface TTarget {
  target: {
    value: string
  }
}

type TProps<T> = {
  decimals?: number
  onChange?: (e: T) => void
}

type TReturn<T> = (e: T) => void

export const useInputNumber = <T extends TTarget>({
  decimals,
  onChange,
}: TProps<T>): TReturn<T> => {
  const lastNumberVal = useRef("")

  if (decimals === undefined) {
    return (e) => onChange?.(e)
  }

  const onChangeNumber = (e: T) => {
    const lastVal = lastNumberVal.current
    let val = e.target.value

    val = val.replace(",", ".")

    if (decimals === 0) {
      val = val.replace(/\..*$/, "")
    }

    if (val.startsWith(".")) {
      val = `0${val}`
    }

    const isValid = stringIsNumber(val)

    if (!isValid && lastVal) {
      e.target.value = lastVal
      return
    }

    if (!isValid && !lastVal) {
      e.target.value = ""
      return
    }

    // replace multiple zeros
    if (/^0+$/.test(val)) {
      val = val.replace(/^0+/, "0")
    }

    // remove before zeros
    if (/^0+\d+$/.test(val)) {
      val = val.replace(/^0+/, "")
    }

    // remove before zeros (decimals)
    if (/^\d+[.]\d+$/.test(val)) {
      val = val.replace(/^0+/, "")
    }
    // add before zero if it's not there (decimals)
    if (/^[.,].+$/.test(val)) {
      val = `0${val}`
    }

    lastNumberVal.current = val

    e.target.value = cutDecimals(val, decimals)

    if (!onChange) return

    onChange(e)
  }

  return onChangeNumber
}
