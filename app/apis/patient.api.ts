import type { SearchQueryParams } from '@/types/common.type'
import type { Patient, PatientAppointment, PatientDashboardStatistic } from '@/types/patient.type'
import type { Role } from '@/types/role.type'
import http from '@/utils/http'

const patientApi = {
  getPatientInformation: () => http.get<{ data: Patient }>('patient/information'),
  getPatientDashboardStatistic: () => http.get<PatientDashboardStatistic>('patient/statistic'),
  getPatientAppointment: (params: SearchQueryParams) =>
    http.get<PatientAppointment>('patient/appointments', { params }),
  upsertPatient: (body: Omit<Patient, 'uid' | 'created_at' | 'updated_at'>) =>
    http.post<{ data: Patient; role: Role }>('patient/upsert', body)
}

export default patientApi
