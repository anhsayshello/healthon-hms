import type { PaginatedResponse, SearchQueryParams } from '@/types/index.type'
import type { Staff, StaffDashboardStatistic } from '@/types/staff.type'
import http from '@/utils/http'

const staffApi = {
  getStaffDashboardStatistic: () => http.get<StaffDashboardStatistic>('staff/statistic'),
  getStaffs: (params: SearchQueryParams) => http.get<PaginatedResponse<Staff>>('staff', { params }),
  getStaffById: (uid: string) => http.get<Staff>(`staff/${uid}`)
}

export default staffApi
