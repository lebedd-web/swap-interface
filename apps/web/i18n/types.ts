import type { ReactNode } from "react"
import type { AppConfig } from "next-intl"

export type TMessages = AppConfig["Messages"]

type TDotNestedKeys<TValue> = {
  [TKey in keyof TValue & string]: TValue[TKey] extends Record<string, unknown>
    ? `${TKey}.${TDotNestedKeys<TValue[TKey]>}`
    : TKey
}[keyof TValue & string]

export type TNamespaceDotKeys<TNamespace extends keyof TMessages> = TDotNestedKeys<
  TMessages[TNamespace]
>

export type TTranslate = {
  <TargetKey extends string>(key: TargetKey, ...args: unknown[]): string
  rich<TargetKey extends string>(key: TargetKey, ...args: unknown[]): ReactNode
  markup<TargetKey extends string>(key: TargetKey, ...args: unknown[]): string
  raw<TargetKey extends string>(key: TargetKey): unknown
  has<TargetKey extends string>(key: TargetKey): boolean
}

type TKeyTranslate<TKey extends string = string> = (key: TKey) => string

type TNamespaceKey<TNamespace extends keyof TMessages> = keyof TMessages[TNamespace] &
  string

type TNamespaceTranslate<TNamespace extends keyof TMessages> = TKeyTranslate<
  TNamespaceKey<TNamespace>
>
