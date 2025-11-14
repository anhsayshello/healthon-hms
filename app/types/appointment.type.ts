import type { Doctor } from './doctor.type'
import type { SearchQueryParams } from './index.type'
import type { MedicalRecord } from './medical-record.type'
import type { Patient } from './patient.type'
import type { Payment } from './payment.type'

export type AppointmentStatus =
  | 'CANCELLED'
  | 'PENDING'
  | 'SCHEDULED'
  | 'IN_CONSULTATION'
  | 'CONSULTATION_COMPLETED'
  | 'COMPLETED'

export enum AppointmentStatusEnum {
  CANCELLED = 'CANCELLED',
  PENDING = 'PENDING',
  SCHEDULED = 'SCHEDULED',
  IN_CONSULTATION = 'IN_CONSULTATION',
  CONSULTATION_COMPLETED = 'CONSULTATION_COMPLETED',
  COMPLETED = 'COMPLETED'
}

export interface AppointmentStatusCount {
  CANCELLED: number
  PENDING: number
  SCHEDULED: number
  COMPLETED: number
}

export type AppointmentsChart = {
  month: string
  appointment: number
  completed: number
}[]

export interface Appointment {
  id: number
  patient_id: string
  doctor_id: string
  appointment_date: string
  time: string
  status: AppointmentStatus
  type: string
  note?: string
  patient: Patient
  doctor: Doctor
  reason: string
  created_at: string
  updated_at: string

  medical_records: MedicalRecord[]
  payment: Payment
}

export type ViewType = 'all' | 'today'
export interface AppointmentFilter {
  view?: ViewType
  status?: AppointmentStatus
}

export type AppointmentParams = SearchQueryParams & AppointmentFilter
