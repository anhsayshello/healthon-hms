import { useAuthStore } from '@/stores/useAuthStore'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from '../useRole'
import doctorApi from '@/apis/doctor.api'

export default function useDoctorStatistic() {
  const user = useAuthStore((state) => state.user)
  const { isDoctor } = useRole()

  const { data, isPending } = useQuery({
    queryKey: ['doctor', 'statistic', user?.uid],
    queryFn: () => doctorApi.getDoctorDashboardStatistic(),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
    enabled: isDoctor
  })

  const totalPatients = data?.data.totalPatients
  const totalNurses = data?.data.totalNurses
  const appointmentsCounts = data?.data.appointmentCounts
  const totalAppointments = data?.data.totalAppointments
  const totalRecords = data?.data.totalRecords
  const monthlyData = data?.data.monthlyData
  const last5Records = data?.data.last5Records
  const availableDoctors = data?.data.availableDoctors

  return {
    totalPatients,
    totalNurses,
    appointmentsCounts,
    totalAppointments,
    totalRecords,
    monthlyData,
    last5Records,
    availableDoctors,
    isPending
  }
}
