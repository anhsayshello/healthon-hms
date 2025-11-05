import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from './use-role'
import { useAuthStore } from '@/stores/useAuthStore'
import type { AppointmentParams } from '@/types/appointment.type'
import appointmentApi from '@/apis/appointment.api'

export default function useAppointments(params: AppointmentParams) {
  const user = useAuthStore((state) => state.user)
  const { isAdmin, isNurse } = useRole()

  const { data: dataGeneralAppointments, isPending } = useQuery({
    queryKey: ['appointments', user?.uid, params],
    queryFn: () => appointmentApi.getAppointments(params),
    placeholderData: keepPreviousData,
    enabled: isAdmin || isNurse
  })

  console.log(dataGeneralAppointments)
  const isGeneralPendingAppointments = isAdmin || isNurse ? isPending : false

  return { dataGeneralAppointments, isGeneralPendingAppointments }
}
