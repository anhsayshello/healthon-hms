import type { Patient } from '@/types/patient.type'
import type { Role } from '@/types/role.type'
import http from '@/utils/http'

const patientApi = {
  getPatientInformation: () => http.get<{ user: Patient; role: Role }>('patient/information'),
  upsertPatient: (body: Omit<Patient, 'uid'>) => http.post<{ user: Patient; role: Role }>('patient/upsert', body)
}

export default patientApi
