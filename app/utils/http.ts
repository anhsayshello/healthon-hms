import axios, { type AxiosInstance, HttpStatusCode } from 'axios'
import config from '@/constants/config'

import { useAuthStore } from '@/stores/useAuthStore'
import { getToken } from 'firebase/app-check'
import { appCheck, auth } from '@/lib/firebase/client'
import handleApiError from '@/helpers/handleApiError'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      async (config) => {
        if (appCheck) {
          const appCheckTokenResponse = await getToken(appCheck, false)
          config.headers['X-Firebase-AppCheck'] = appCheckTokenResponse.token

          const idToken = await auth.currentUser?.getIdToken()
          if (idToken) {
            config.headers.Authorization = `Bearer ${idToken}`
          }
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
      async (error) => {
        const originalConfig = error.config

        if (
          error.response?.status !== HttpStatusCode.UnprocessableEntity &&
          error.response?.status !== HttpStatusCode.Unauthorized
        ) {
          handleApiError(error)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          if (!originalConfig._retry) {
            originalConfig._retry = true

            try {
              await auth.currentUser?.getIdToken(true)
              return this.instance(originalConfig)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
              handleApiError(error)
              useAuthStore.getState().logOut()
            }
          }
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
