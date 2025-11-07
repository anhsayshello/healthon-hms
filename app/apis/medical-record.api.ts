import type { PaginatedResponse, SearchQueryParams } from '@/types/index.type'
import type { MedicalRecord } from '@/types/medical.type'
import http from '@/utils/http'

const medicalRecordApi = {
  getMedicalRecords: (params: SearchQueryParams) =>
    http.get<PaginatedResponse<MedicalRecord>>('medical-record', { params }),
  getTodayMedicalRecords: (params: SearchQueryParams) =>
    http.get<PaginatedResponse<MedicalRecord>>('medical-record/today', { params }),
  getMedicalRecordById: (id: string) => http.get<MedicalRecord>(`medical-record/${id}`)
}

export default medicalRecordApi
