import axios, { type AxiosInstance, HttpStatusCode } from 'axios'
import config from '@/constants/config'

import { useAuthStore } from '@/stores/useAuthStore'
import { toast } from 'sonner'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      async (config) => {
        await useAuthStore.persist.rehydrate()
        const access_token = useAuthStore.getState().access_token
        if (access_token) {
          config.headers.Authorization = `Bearer ${access_token}`
        }
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        console.log(url)
        return response
      },
      function (error) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          console.log(error)
          const message = data?.message || error.message
          toast.error(data.error || message)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          useAuthStore.getState().clearAuth()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
