import type { Appointment, AppointmentsChart, AppointmentStatusCount } from './appointment.type'
import type { Doctor } from './doctor.type'

export type Gender = 'MALE' | 'FEMALE'
export type Marital_Status = 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'SEPARATED'
export type Relation = 'FATHER' | 'MOTHER' | 'WIFE' | 'HUSBAND' | 'OTHER'
export type Blood_Group = 'A' | 'B' | 'AB' | 'O'

export interface Patient {
  uid: string
  email: string
  first_name: string
  last_name: string
  date_of_birth: string
  gender: Gender
  phone: string
  marital_status: Marital_Status
  address: string
  emergency_contact_name: string
  emergency_contact_number: string
  relation: Relation
  blood_group?: Blood_Group
  allergies?: string
  medical_conditions?: string
  medical_history?: string
  insurance_provider?: string
  insurance_number?: string
  privacy_consent: boolean
  service_consent: boolean
  medical_consent: boolean
  photo_url?: string
  created_at: string
  updated_at: string
}

export interface PatientDashboardStatistic {
  data: Patient
  appointmentCounts: AppointmentStatusCount
  last5Records: Appointment[]
  availableDoctors: Doctor[]
  totalRecords: number
  totalAppointments: number
  monthlyData: AppointmentsChart
}
