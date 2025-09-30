import type { AuthResponse } from '@/types/auth.type'
import type { Patient } from '@/types/patient.type'
import http from '@/utils/http'

const authApi = {
  verifyUser: (idToken: string) => http.post<AuthResponse<Patient>>('auth', { idToken })
}
export default authApi
