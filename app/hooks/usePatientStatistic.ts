import patientApi from '@/apis/patient.api'
import { useAuthStore } from '@/stores/useAuthStore'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export default function usePatientStatistic() {
  const idToken = useAuthStore((state) => state.idToken)
  const { data, isPending } = useQuery({
    queryKey: ['patient', 'statistic', idToken],
    queryFn: () => patientApi.getPatientDashboardStatistic(),
    staleTime: Infinity,
    placeholderData: keepPreviousData
  })

  return {
    dataPatient: data?.data.data,
    appointmentsCounts: data?.data.appointmentCounts,
    totalAppointments: data?.data.totalAppointments ?? 0,
    monthlyData: data?.data.monthlyData,
    last5Records: data?.data.last5Records,
    availableDoctor: data?.data.availableDoctor,
    isPending
  }
}
