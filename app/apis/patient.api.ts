import type { Appointment, AppointmentsChart, AppointmentStatusCount } from '@/types/appointment.type'
import type { Doctor } from '@/types/doctor.type'
import type { Patient } from '@/types/patient.type'
import type { Role } from '@/types/role.type'
import http from '@/utils/http'

const patientApi = {
  getPatientInformation: () => http.get<{ data: Patient }>('patient/information'),
  getPatientDashboardStatistic: () =>
    http.get<{
      data: Patient
      appointmentCounts: AppointmentStatusCount
      last5Records: Appointment[]
      totalAppointments: number
      availabelDoctor: Doctor
      monthlyData: AppointmentsChart
    }>('patient/statistic'),
  upsertPatient: (body: Omit<Patient, 'uid'>) => http.post<{ data: Patient; role: Role }>('patient/upsert', body)
}

export default patientApi
