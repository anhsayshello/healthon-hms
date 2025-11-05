import type { PaginatedResponse, SearchQueryParams } from '@/types/index.type'
import type { Patient, PatientDashboardStatistic } from '@/types/patient.type'
import type { Role } from '@/types/role.type'
import http from '@/utils/http'

const patientApi = {
  getPatients: (params: SearchQueryParams) => http.get<PaginatedResponse<Patient>>('patient', { params }),
  getPatientInformation: () => http.get<Patient>('patient/information'),
  getPatientDashboardStatistic: () => http.get<PatientDashboardStatistic>('patient/statistic'),
  getPatientById: (uid: string) => http.get<Patient>(`patient/${uid}`),
  upsertPatient: (body: Omit<Patient, 'uid' | 'created_at' | 'updated_at'>) =>
    http.post<{ data: Patient; role: Role }>('patient/upsert', body)
}

export default patientApi
