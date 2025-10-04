import patientApi from '@/apis/patient.api'
import { useQuery } from '@tanstack/react-query'

export default function usePatientStatistic() {
  const { data, isPending } = useQuery({
    queryKey: ['patient', 'statistic'],
    queryFn: () => patientApi.getPatientDashboardStatistic()
  })

  return {
    dataPatient: data?.data.data,
    appointmentsCounts: data?.data.appointmentCounts,
    totalAppointments: data?.data.totalAppointments ?? 0,
    monthlyData: data?.data.monthlyData,
    last5Records: data?.data.last5Records,
    isPending
  }
}
