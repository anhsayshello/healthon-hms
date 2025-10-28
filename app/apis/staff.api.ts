import type { PaginatedResponse, SearchQueryParams } from '@/types/index.type'
import type { Staff } from '@/types/staff.type'
import http from '@/utils/http'

const staffApi = {
  getStaffs: (params: SearchQueryParams) => http.get<PaginatedResponse<Staff>>('staff', { params })
}

export default staffApi
