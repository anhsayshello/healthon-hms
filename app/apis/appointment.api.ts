import type { Appointment, AppointmentStatus } from '@/types/appointment.type'
import http from '@/utils/http'

const appointmentApi = {
  getAppointmentDetail: (id: string) => http.get<{ data: Appointment }>(`appointment/${id}`),
  updateAppointmentDetail: ({ id, status, reason }: { id: string; status: AppointmentStatus; reason: string }) =>
    http.post<{ data: Appointment }>(`appointment/${id}`, { status, reason })
}

export default appointmentApi
