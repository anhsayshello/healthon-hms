import { useAuthStore } from '@/stores/useAuthStore'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from './use-role'
import staffApi from '@/apis/staff.api'

export default function useStaffStatistic() {
  const idToken = useAuthStore((state) => state.idToken)
  const { isStaff } = useRole()

  const { data, isPending } = useQuery({
    queryKey: ['staff', 'statistic', idToken],
    queryFn: () => staffApi.getStaffDashboardStatistic(),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
    enabled: isStaff
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
