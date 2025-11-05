import type { Appointment } from '@/types/appointment.type'
import type { PaginatedResponse, SearchQueryParams, VitalSigns } from '@/types/index.type'
import http from '@/utils/http'

const nurseApi = {
  getVitalSignsToday: (params: SearchQueryParams) =>
    http.get<PaginatedResponse<Appointment>>('nurse/vital-signs', { params }),
  createVitalSigns: (body: {
    appointment_id: number
    props: Omit<VitalSigns, 'id' | 'patient_id' | 'medical_id' | 'created_at' | 'updated_at' | 'medical_record'>
  }) => http.post<VitalSigns>('nurse/vital-signs', body)
}

export default nurseApi
