import type { PaginatedResponse, SearchQueryParams } from '@/types/index.type'
import { type LabTest, type Service } from '@/types/lab.type'
import http from '@/utils/http'

const labApi = {
  createLabService: (body: { service_name: string; description: string; price: number }) =>
    http.post<Service>('lab/services', body),
  getLabServices: (params: SearchQueryParams) => http.get<PaginatedResponse<Service>>('lab/services', { params }),
  createLabRequest: (body: { service_id: number; medical_id: number }) => http.post('lab/requests', body),
  getLabTestRequests: (params: SearchQueryParams) => http.get<PaginatedResponse<LabTest>>('lab/requests', { params }),
  cancelLabRequest: ({ id, notes }: { id: number; notes: string }) =>
    http.patch(`lab/requests/${id}/cancel`, { notes }),
  getLabTests: (params: SearchQueryParams) => http.get<PaginatedResponse<LabTest>>('lab/tests', { params }),
  startLabTest: (id: number) => http.patch(`lab/tests/${id}/start`),
  finishLabTest: ({ id, result }: { id: number; result: string }) => http.patch(`lab/tests/${id}/finish`, { result })
}

export default labApi
