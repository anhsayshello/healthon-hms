import type { StaffRole } from './role.type'
type Status = 'ACTIVE' | 'INACTIVE' | 'DORMANT'
import type { Appointment, AppointmentsChart, AppointmentStatusCount } from './appointment.type'
import type { Doctor } from './doctor.type'

export interface Staff {
  uid: string
  email: string
  first_name: string
  last_name: string
  phone: string
  address: string
  role: StaffRole
  status: Status
  department?: string
  license_number?: string
  photo_url?: string
  created_at: string
  updated_at: string
}

export interface StaffDashboardStatistic {
  totalPatients: number
  totalDoctors: number
  appointmentCounts: AppointmentStatusCount
  last5Records: Appointment[]
  availableDoctors: Doctor[]
  totalRecords: number
  totalAppointments: number
  monthlyData: AppointmentsChart
}
