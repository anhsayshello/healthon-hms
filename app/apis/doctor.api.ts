import http from '@/utils/http'
import type { Doctor, DoctorDashboardStatistic } from '@/types/doctor.type'
import type { SearchQueryParams } from '@/types/index.type'
import type { AppointmentListResponse } from '@/types/appointment.type'

const doctorApi = {
  getAllDoctors: () => http.get<{ data: Doctor[] }>('doctor'),
  getDoctorAppointment: (params: SearchQueryParams) =>
    http.get<AppointmentListResponse>('doctor/appointments', { params }),
  getDoctorDashboardStatistic: () => http.get<DoctorDashboardStatistic>('doctor/statistic')
}

export default doctorApi
