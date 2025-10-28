import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from './use-role'
import { useAuthStore } from '@/stores/useAuthStore'
import doctorApi from '@/apis/doctor.api'

export default function useDoctorAppointments(query: string, page: string, limit: string) {
  const user = useAuthStore((state) => state.user)
  const { isDoctor } = useRole()

  const { data: dataDoctorAppointments, isPending } = useQuery({
    queryKey: ['doctor', 'appointment', user?.uid, { query, page, limit }],
    queryFn: () => doctorApi.getDoctorAppointments({ query, page, limit }),
    placeholderData: keepPreviousData,
    enabled: isDoctor
  })

  return { dataDoctorAppointments, isPendingDoctorAppointments: isDoctor ? isPending : false }
}
