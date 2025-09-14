import axios, { type AxiosInstance, HttpStatusCode } from 'axios'
import config from '@/constants/config'

import { useAuthStore } from '@/stores/useAuthStore'
import { toast } from 'sonner'
import { getToken } from 'firebase/app-check'
import { appCheck } from '@/lib/firebase'

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
        const appCheckToken = await getToken(appCheck, false)
        config.headers['X-Firebase-AppCheck'] = appCheckToken.token

        await useAuthStore.persist.rehydrate()
        const idTokten = useAuthStore.getState().idToken
        if (idTokten) {
          config.headers.Authorization = `Bearer ${idTokten}`
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
