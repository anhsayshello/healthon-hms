import type { PaginatedResponse, SearchQueryParams } from '@/types/index.type'
import type { Medication } from '@/types/medication.type'
import http from '@/utils/http'

const URL = 'medication'

const medicationApi = {
  createMedication: (body: Omit<Medication, 'id' | 'created_at' | 'updated_at'>) => http.post(URL, body),
  getMedications: (params: SearchQueryParams) => http.get<PaginatedResponse<Medication>>(URL, { params }),
  updateMedication: (body: { id: number; props: Omit<Medication, 'id' | 'created_at' | 'updated_at'> }) =>
    http.patch(`${URL}/${body.id}`, body),
  deleteMedication: (id: number) => http.delete(`${URL}/${id}`)
}

export default medicationApi
