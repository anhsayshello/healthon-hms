import type { Appointment, AppointmentParams, AppointmentStatus } from '@/types/appointment.type'
import type { PaginatedResponse } from '@/types/index.type'
import http from '@/utils/http'

const appointmentApi = {
  getAppointments: (params: AppointmentParams) => http.get<PaginatedResponse<Appointment>>('appointment', { params }),
  getAppointmentById: (id: number) => http.get<Appointment>(`appointment/${id}`),
  getDoctorAppointments: (params: AppointmentParams) =>
    http.get<PaginatedResponse<Appointment>>('appointment/doctor', { params }),
  getPatientAppointments: (params: AppointmentParams) =>
    http.get<PaginatedResponse<Appointment>>('appointment/patient', { params }),
  createAppointment: (body: Pick<Appointment, 'doctor_id' | 'appointment_date' | 'time' | 'type' | 'reason'>) =>
    http.post<Appointment>('appointment', body),
  updateAppointment: ({
    reason,
    id,
    status,
    note
  }: {
    id: number
    status: AppointmentStatus
    reason?: string
    note?: string
  }) => http.patch<Appointment>(`appointment/${id}`, { status, reason, note })
}

export default appointmentApi
