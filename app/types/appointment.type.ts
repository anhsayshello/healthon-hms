import type { Doctor } from './doctor.type'
import type { Patient } from './patient.type'

export type AppointmentStatus = 'CANCELLED' | 'PENDING' | 'SCHEDULED' | 'COMPLETED'

export enum AppointmentStatusEnum {
  CANCELLED = 'CANCELLED',
  PENDING = 'PENDING',
  SCHEDULED = 'SCHEDULED',
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
  id: string
  patient_id: string
  doctor_id: string
  appointment_date: string
  time: string
  status: AppointmentStatus
  type: string
  note: string
  patient: Patient
  doctor: Doctor
  reason: string
  created_at: string
  updated_at: string
}
