import http from '@/utils/http'

const authApi = {
  verifyUser: (body: { idToken: string; firstName: string; lastName: string }) => http.post('auth', body)
}
export default authApi
