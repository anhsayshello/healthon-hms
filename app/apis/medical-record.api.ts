import type { MedicalRecord, PaginatedResponse, SearchQueryParams } from '@/types/index.type'
import http from '@/utils/http'

const medicalRecordApi = {
  getMedicalRecords: (params: SearchQueryParams) =>
    http.get<PaginatedResponse<MedicalRecord>>('/medical-record', { params })
}

export default medicalRecordApi
