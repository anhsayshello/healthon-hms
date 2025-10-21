import http from '@/utils/http'
import type { Doctor, DoctorDashboardStatistic } from '@/types/doctor.type'

const doctorApi = {
  getDoctors: () => http.get<{ data: Doctor[] }>('doctor'),
  getDoctorDashboardStatistic: () => http.get<DoctorDashboardStatistic>('doctor/statistic')
}

export default doctorApi
