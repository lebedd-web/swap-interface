import { toast as sonnerToast } from "sonner"

type TToastMessage = Parameters<typeof sonnerToast.success>[0]
type TToastOptions = Parameters<typeof sonnerToast.success>[1]

type TAppToastOptions = Omit<NonNullable<TToastOptions>, "description"> & {
  title?: TToastMessage
}

type TToastType = "success" | "warning" | "error" | "info"

const showWithDefaultTitle = (
  type: TToastType,
  defaultTitle: TToastMessage,
  description: TToastMessage,
  options?: TAppToastOptions,
): string | number => {
  const { title, ...toastOptions } = options ?? {}

  return sonnerToast[type](title ?? defaultTitle, {
    ...toastOptions,
    description,
  })
}

export const toast = {
  success: (description: TToastMessage, options?: TAppToastOptions): string | number =>
    showWithDefaultTitle("success", "Success", description, options),
  warning: (description: TToastMessage, options?: TAppToastOptions): string | number =>
    showWithDefaultTitle("warning", "Warning", description, options),
  error: (description: TToastMessage, options?: TAppToastOptions): string | number =>
    showWithDefaultTitle("error", "Error", description, options),
  info: (description: TToastMessage, options?: TAppToastOptions): string | number =>
    showWithDefaultTitle("info", "Info", description, options),
  dismiss: sonnerToast.dismiss,
}
