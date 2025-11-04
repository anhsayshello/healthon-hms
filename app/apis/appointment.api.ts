import type { Appointment, AppointmentParams, AppointmentStatus } from '@/types/appointment.type'
import type { PaginatedResponse } from '@/types/index.type'
import http from '@/utils/http'

const appointmentApi = {
  getAppointmentDetail: (id: number) => http.get<Appointment>(`appointment/${id}`),
  getAppointments: (params: AppointmentParams) => http.get<PaginatedResponse<Appointment>>('appointment', { params }),
  createNewAppointment: (
    body: Omit<
      Appointment,
      'id' | 'patient_id' | 'status' | 'patient' | 'doctor' | 'reason' | 'created_at' | 'updated_at'
    >
  ) => http.post<Appointment>('appointment', body),
  updateAppointmentDetail: ({
    id,
    status,
    reason,
    note
  }: {
    id: number
    status: AppointmentStatus
    reason?: string
    note?: string
  }) => http.patch<Appointment>(`appointment/${id}`, { status, reason, note })
}

export default appointmentApi
