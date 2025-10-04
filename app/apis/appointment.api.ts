import type { Appointment } from '@/types/appointment.type'
import http from '@/utils/http'

const appointmentApi = {
  getAppointmentDetail: (id: string) => http.get<{ data: Appointment }>(`appointment/${id}`)
}

export default appointmentApi
