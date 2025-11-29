import adminApi from '@/apis/admin.api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

export default function useUserDetail() {
  const { profileId } = useParams()
  const { data, isPending } = useQuery({
    queryKey: ['profile', profileId],
    queryFn: () => adminApi.getUserById(profileId as string),
    enabled: !!profileId
  })

  return { data, isPending }
}
