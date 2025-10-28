import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from './use-role'
import adminApi from '@/apis/admin.api'

export default function useAdminAppointments(query: string, page: string, limit: string) {
  const { isAdmin } = useRole()

  const { data: dataAdminAppointments, isPending } = useQuery({
    queryKey: ['admin', 'appointment', { query, page, limit }],
    queryFn: () => adminApi.getAdminAppointments({ query, page, limit }),
    placeholderData: keepPreviousData,
    enabled: isAdmin
  })

  return { dataAdminAppointments, isPendingAdminAppointments: isAdmin ? isPending : false }
}
