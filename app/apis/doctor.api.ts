import http from '@/utils/http'
import type { Doctor, DoctorDashboardStatistic } from '@/types/doctor.type'
import type { PaginatedResponse, SearchQueryParams } from '@/types/index.type'
import type { Appointment, AppointmentParams } from '@/types/appointment.type'

const doctorApi = {
  getDoctors: (params: SearchQueryParams) => http.get<PaginatedResponse<Doctor>>('doctor', { params }),
  getDoctorAppointments: (params: AppointmentParams) =>
    http.get<PaginatedResponse<Appointment>>('doctor/appointments', { params }),
  getDoctorDashboardStatistic: () => http.get<DoctorDashboardStatistic>('doctor/statistic'),
  getDoctorById: (uid: string) => http.get<Doctor>(`doctor/${uid}`)
}

export default doctorApi
