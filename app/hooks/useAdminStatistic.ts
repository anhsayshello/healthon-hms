import { useAuthStore } from '@/stores/useAuthStore'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from './use-role'
import adminApi from '@/apis/admin.api'

export default function useAdminStatistic() {
  const idToken = useAuthStore((state) => state.idToken)
  const { isAdmin } = useRole()

  const { data, isPending } = useQuery({
    queryKey: ['admin', 'statistic', idToken],
    queryFn: () => adminApi.getAdminDashboardStatistic(),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
    enabled: isAdmin
  })

  return {
    totalPatients: data?.data.totalPatients,
    totalDoctors: data?.data.totalDoctors,
    appointmentsCounts: data?.data.appointmentCounts,
    totalAppointments: data?.data.totalAppointments ?? 0,
    monthlyData: data?.data.monthlyData,
    last5Records: data?.data.last5Records,
    availableDoctors: data?.data.availableDoctors,
    isPending
  }
}
