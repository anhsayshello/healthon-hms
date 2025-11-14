import type { PaginatedResponse, SearchQueryParams } from '@/types/index.type'
import type { Diagnosis, MedicalRecord, Prescription } from '@/types/medical-record.type'
import http from '@/utils/http'

const URL = 'medical-record'

const medicalRecordApi = {
  getMedicalRecords: (params: SearchQueryParams) => http.get<PaginatedResponse<MedicalRecord>>(URL, { params }),
  getDoctorMedicalRecords: (params: SearchQueryParams) =>
    http.get<PaginatedResponse<MedicalRecord>>(`${URL}/doctor`, { params }),
  getMedicalRecordById: (id: string) => http.get<MedicalRecord>(`${URL}/${id}`),

  //diagnosis
  createDiagnosis: (body: Omit<Diagnosis, 'id' | 'doctor_id' | 'created_at' | 'updated_at' | 'medical_record'>) =>
    http.post(`${URL}/diagnoses`, body),
  updateDiagnosis: ({
    id,
    props
  }: {
    id: number
    props: Pick<Diagnosis, 'symptoms' | 'diagnosis' | 'notes' | 'follow_up_plan'>
  }) => http.patch(`${URL}/diagnoses/${id}`, props),
  deleteDiagnosis: (id: number) => http.delete(`${URL}/diagnoses/${id}`),

  //prescription
  createPrescription: (
    body: Pick<
      Prescription,
      'medical_record_id' | 'medication_id' | 'quantity' | 'dosage' | 'frequency' | 'duration' | 'instructions'
    >
  ) => http.post(`${URL}/prescriptions`, body),
  updatePrescription: ({
    id,
    props
  }: {
    id: number
    props: Pick<Prescription, 'quantity' | 'dosage' | 'frequency' | 'duration' | 'instructions'>
  }) => http.patch(`${URL}/prescriptions/${id}`, props),
  deletePrescription: (id: number) => http.delete(`${URL}/prescriptions/${id}`)
}

export default medicalRecordApi
