import type { AdminDashboardStatistic } from '@/types/admin.type'
import type { Doctor, Weekday } from '@/types/doctor.type'
import type { FirebaseUserRecord } from '@/types/index.type'
import type { Patient } from '@/types/patient.type'
import type { Role } from '@/types/role.type'
import http from '@/utils/http'

const adminApi = {
  getAdminDashboardStatistic: () => http.get<AdminDashboardStatistic>('admin/statistic'),
  getUserById: (id: string) => http.get<{ data: Patient | Doctor }>(`admin/${id}`),
  getUsers: () => http.get<{ allUsers: FirebaseUserRecord[] }>('admin/users'),
  setUserRole: (role: Role) => http.post('admin', { role }),
  createDoctor: (body: {
    working_days: Weekday[]
    doctor: Omit<
      Doctor,
      'uid' | 'availability_status' | 'diagnosis' | 'working_days' | 'appointments' | 'created_at' | 'updated_at'
    >
  }) => http.post<{ data: Doctor }>('admin/create-doctor', body)
}
export default adminApi
