import adminApi from '@/apis/admin.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function useDeleteUser() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: adminApi.deleteUserById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'firebase-users'] })
      toast.success(data?.data?.message)
    }
  })

  return { mutate, isPending }
}
