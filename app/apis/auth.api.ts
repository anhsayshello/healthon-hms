import http from '@/utils/http'

const authApi = {
  verifyUser: () => http.post('auth')
}
export default authApi
