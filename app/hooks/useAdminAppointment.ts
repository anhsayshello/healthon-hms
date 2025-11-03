import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from './use-role'
import adminApi from '@/apis/admin.api'
import { useAuthStore } from '@/stores/useAuthStore'

export default function useAdminAppointments(query: string, page: string, limit: string) {
  const user = useAuthStore((state) => state.user)
  const { isAdmin } = useRole()

  const { data: dataAdminAppointments, isPending } = useQuery({
    queryKey: ['admin', 'appointment', user?.uid, { query, page, limit }],
    queryFn: () => adminApi.getAdminAppointments({ query, page, limit }),
    placeholderData: keepPreviousData,
    enabled: isAdmin
  })

  const isPendingAdminAppointments = isAdmin ? isPending : false

  return { dataAdminAppointments, isPendingAdminAppointments }
}
