import axios, { type AxiosInstance, HttpStatusCode } from 'axios'
import config from '@/constants/config'

import { useAuthStore } from '@/stores/useAuthStore'
import { getToken } from 'firebase/app-check'
import { appCheck, auth } from '@/lib/firebase/client'
import { signOut } from 'firebase/auth'
import { useUserCredential } from '@/stores/useUserCredentialStore'
import handleApiError from '@/helpers/handleApiError'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      async (config) => {
        const appCheckTokenResponse = await getToken(appCheck, false)
        config.headers['X-Firebase-AppCheck'] = appCheckTokenResponse.token

        // await useAuthStore.persist.rehydrate()
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
      async function (error) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          handleApiError(error)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          await signOut(auth)
          useAuthStore.getState().clearAuth()
          useUserCredential.getState().clearUserCred()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
