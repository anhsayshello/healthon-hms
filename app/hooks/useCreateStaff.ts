import adminApi from '@/apis/admin.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useCreateStaff() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: adminApi.createStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'firebase-users'] })
    }
  })

  return { mutate, isPending }
}
