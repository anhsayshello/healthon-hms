import type { AuthResponse } from '@/types/auth.type'
import type { Patient } from '@/types/patient.type'
import http from '@/utils/http'

const authApi = {
  verifyUser: (body: { idToken: string }) => http.post<AuthResponse<Patient>>('auth', body)
}
export default authApi
