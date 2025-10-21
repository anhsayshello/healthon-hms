import { useAuthStore } from '@/stores/useAuthStore'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from './use-role'
import doctorApi from '@/apis/doctor.api'

export default function useDoctorStatistic() {
  const idToken = useAuthStore((state) => state.idToken)
  const { isDoctor } = useRole()

  const { data, isPending } = useQuery({
    queryKey: ['patient', 'statistic', idToken],
    queryFn: () => doctorApi.getDoctorDashboardStatistic(),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
    enabled: isDoctor
  })

  return {
    totalPatients: data?.data.totalPatients,
    totalNurses: data?.data.totalNurses,
    appointmentsCounts: data?.data.appointmentCounts,
    totalAppointments: data?.data.totalAppointments ?? 0,
    monthlyData: data?.data.monthlyData,
    last5Records: data?.data.last5Records,
    availableDoctors: data?.data.availableDoctors,
    isPending
  }
}
