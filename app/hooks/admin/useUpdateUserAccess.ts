import adminApi from '@/apis/admin.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function useUpdateUserAccess() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: adminApi.setUserAccess,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'firebase-users'] })
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
      queryClient.invalidateQueries({ queryKey: ['patients'] })
      queryClient.invalidateQueries({ queryKey: ['staffs'] })
      toast.success(data?.data?.message)
    }
  })

  return { mutate, isPending }
}
