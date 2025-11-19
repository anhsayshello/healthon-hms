import patientApi from '@/apis/patient.api'
import { useAuthStore } from '@/stores/useAuthStore'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from '../useRole'

export default function usePatientStatistic() {
  const user = useAuthStore((state) => state.user)
  const { isPatient } = useRole()

  const { data, isPending } = useQuery({
    queryKey: ['patient', 'statistic', user?.uid],
    queryFn: () => patientApi.getPatientDashboardStatistic(),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
    enabled: isPatient
  })
  const dataPatient = data?.data.data
  const appointmentsCounts = data?.data.appointmentCounts
  const totalAppointments = data?.data.totalAppointments
  const totalRecords = data?.data.totalRecords
  const monthlyData = data?.data.monthlyData
  const last5Records = data?.data.last5Records
  const availableDoctors = data?.data.availableDoctors

  console.log(totalRecords, 'records')

  return {
    dataPatient,
    appointmentsCounts,
    totalAppointments,
    totalRecords,
    monthlyData,
    last5Records,
    availableDoctors,
    isPending
  }
}
