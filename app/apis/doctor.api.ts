import http from '@/utils/http'
import type { Doctor, DoctorDashboardStatistic } from '@/types/doctor.type'
import type { PaginatedResponse, SearchQueryParams } from '@/types/index.type'

const doctorApi = {
  getDoctors: (params: SearchQueryParams) => http.get<PaginatedResponse<Doctor>>('doctor', { params }),
  getDoctorDashboardStatistic: () => http.get<DoctorDashboardStatistic>('doctor/statistic'),
  getDoctorById: (uid: string) => http.get<Doctor>(`doctor/${uid}`)
}

export default doctorApi
