import type UserAuth from '@/types/auth.type'
import http from '@/utils/http'

const authApi = {
  verifyUser: () => http.post<UserAuth>('auth')
}
export default authApi
