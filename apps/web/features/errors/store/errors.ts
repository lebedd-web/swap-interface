import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type State = {
  networkError: boolean
  globalError: string | null
}

type Actions = {
  setNetworkError: (show: boolean) => void
  setGlobalError: (error: string | null) => void
  clearNetworkError: () => void
  clearGlobalError: () => void
  clearAllErrors: () => void
}

const INITIAL_STATE: State = {
  networkError: false,
  globalError: null,
}

export const useErrors = create<State & Actions>()(
  immer((set) => ({
    ...INITIAL_STATE,
    setNetworkError: (show: boolean) =>
      set((state) => {
        state.networkError = show
      }),
    setGlobalError: (error: string | null) =>
      set((state) => {
        state.globalError = error
      }),
    clearNetworkError: () =>
      set((state) => {
        state.networkError = false
      }),
    clearGlobalError: () =>
      set((state) => {
        state.globalError = null
      }),
    clearAllErrors: () =>
      set((state) => {
        state.networkError = false
        state.globalError = null
      }),
  })),
)

// Use outside of React
export const setNetworkError = (show: boolean): void => {
  useErrors.getState().setNetworkError(show)
}

export const setGlobalError = (error: string): void => {
  useErrors.getState().setGlobalError(error)
}

export const clearAllErrors = (): void => {
  useErrors.getState().clearAllErrors()
}
