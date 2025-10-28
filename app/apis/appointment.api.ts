import type { Appointment, AppointmentStatus } from '@/types/appointment.type'
import http from '@/utils/http'

const appointmentApi = {
  getAppointmentDetail: (id: number) => http.get<{ data: Appointment }>(`appointment/${id}`),
  createNewAppointment: (
    body: Omit<
      Appointment,
      'id' | 'patient_id' | 'status' | 'patient' | 'doctor' | 'reason' | 'created_at' | 'updated_at'
    >
  ) => http.post('appointment', body),
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
  }) => http.post<{ data: Appointment }>(`appointment/${id}`, { status, reason, note })
}

export default appointmentApi
