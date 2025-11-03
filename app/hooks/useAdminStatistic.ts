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

  const totalPatients = data?.data.totalPatients
  const totalDoctors = data?.data.totalDoctors
  const appointmentsCounts = data?.data.appointmentCounts
  const totalAppointments = data?.data.totalAppointments
  const totalRecords = data?.data.totalRecords
  const monthlyData = data?.data.monthlyData
  const last5Records = data?.data.last5Records
  const availableDoctors = data?.data.availableDoctors

  return {
    totalPatients,
    totalDoctors,
    appointmentsCounts,
    totalAppointments,
    totalRecords,
    monthlyData,
    last5Records,
    availableDoctors,
    isPending
  }
}
