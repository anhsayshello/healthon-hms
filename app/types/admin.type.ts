import type { Appointment, AppointmentsChart, AppointmentStatusCount } from './appointment.type'
import type { Doctor } from './doctor.type'

export interface AdminDashboardStatistic {
  totalPatients: number
  totalDoctors: number
  appointmentCounts: AppointmentStatusCount
  last5Records: Appointment[]
  availableDoctors: Doctor[]
  totalAppointments: number
  monthlyData: AppointmentsChart
}
