"use client"

import { API_REST_URL } from "@/constants/config"
import {
  E_ERROR_MESSAGE,
  E_ERROR_STATUS,
  setGlobalError,
  setNetworkError,
} from "@/features/errors"
import axios, { AxiosInstance } from "axios"

export const AXIOS_TIMEOUT = 1000 * 30

const axiosBaseConfig = {
  baseURL: API_REST_URL,
  timeout: AXIOS_TIMEOUT,
  withCredentials: true,
}

export const api: AxiosInstance = axios.create(axiosBaseConfig)

const LOCALE_STORAGE_KEY = "NEXT_LOCALE"

// request middleware
api.interceptors.request.use((request) => {
  const newRequest = { ...request }
  if (typeof window !== "undefined") {
    const locale =
      window.localStorage.getItem(LOCALE_STORAGE_KEY) ?? document.documentElement.lang
    if (locale) {
      newRequest.headers.set("translation", locale)
    }
  }
  return newRequest
})

// response middleware
api.interceptors.response.use(
  (response) => ({
    ...response,
    data: response.data.data,
    pagination: response.data.pagination,
  }),
  (error) => {
    if (!error.response && error.message === E_ERROR_MESSAGE.NETWORK) {
      setNetworkError(error.message)
      return Promise.reject({})
    }

    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }

    if (!error.response) {
      return Promise.reject({})
    }

    const { status, data } = error.response

    if (axios.isAxiosError(error) && status >= E_ERROR_STATUS.SERVER) {
      setGlobalError(String(data.message))
      return Promise.reject({})
    }

    return Promise.reject(error)
  },
)
