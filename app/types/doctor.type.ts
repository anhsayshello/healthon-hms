import type { Appointment, AppointmentsChart, AppointmentStatusCount } from './appointment.type'

type JobType = 'FULL' | 'PART'
export interface Doctor {
  uid: string
  email: string
  first_name: string
  last_name: string
  specialization: string
  license_number: string
  phone: string
  address: string
  department?: string
  photo_url?: string
  availability_status?: string
  type: JobType
  working_days: WorkingDays[]
  appointments: Appointment[]
  diagnosis: string
  created_at: string
  updated_at: string
}

export type Weekday = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'

export interface WorkingDays {
  id: number
  doctor_id: string
  day: Weekday
  start_time: string
  close_time: string
  created_at: string
  updated_at: string
}

export interface DoctorDashboardStatistic {
  totalPatients: number
  totalNurses: number
  appointmentCounts: AppointmentStatusCount
  last5Records: Appointment[]
  availableDoctors: Doctor[]
  totalAppointments: number
  monthlyData: AppointmentsChart
}
