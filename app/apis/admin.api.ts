import type { AdminDashboardStatistic } from '@/types/admin.type'
import type { AppointmentListResponse } from '@/types/appointment.type'
import type { Doctor, Weekday } from '@/types/doctor.type'
import type { FirebaseUserRecord, SearchQueryParams } from '@/types/index.type'
import type { Patient } from '@/types/patient.type'
import type { StaffRole } from '@/types/role.type'
import type { Staff } from '@/types/staff.type'
import http from '@/utils/http'

const adminApi = {
  getAdminDashboardStatistic: () => http.get<AdminDashboardStatistic>('admin/statistic'),
  getAdminAppointments: (params: SearchQueryParams) =>
    http.get<AppointmentListResponse>('admin/appointments', { params }),
  getUserById: (id: string) => http.get<{ data: Patient | Doctor }>(`admin/${id}`),
  getFiresbaseUsers: (nextPageToken?: string) =>
    http.get<{ data: FirebaseUserRecord[]; nextPageToken?: string }>('admin/users', { params: { nextPageToken } }),
  setStaffRole: (body: { uid: string; role: StaffRole }) => http.patch<{ message: string }>('admin/role', body),
  setUserAccess: (body: { uid: string; disabled: boolean }) => http.patch<{ message: string }>('admin/access', body),
  deleteUserById: (uid: string) => http.delete<{ message: string }>(`admin/${uid}`),
  createDoctor: (body: {
    working_days: Weekday[]
    start_time: string
    close_time: string
    doctor: Omit<
      Doctor,
      'uid' | 'availability_status' | 'diagnosis' | 'working_days' | 'appointments' | 'created_at' | 'updated_at'
    >
  }) => http.post<{ data: Doctor }>('admin/doctor', body),
  createStaff: (body: Omit<Staff, 'uid' | 'status' | 'created_at' | 'updated_at'>) => http.post('admin/staff', body)
}
export default adminApi
