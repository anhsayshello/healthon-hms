import type { Doctor } from '@/types/doctor.type'
import type { Patient } from '@/types/patient.type'
import type { Role } from '@/types/role.type'
import http from '@/utils/http'

const adminApi = {
  getUsers: () => http.get<{ patients: Patient[]; doctors: Doctor[] }>('admin'),
  setUserRole: (role: Role) => http.post('admin', { role })
}
export default adminApi
