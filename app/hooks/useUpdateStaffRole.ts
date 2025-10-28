import adminApi from '@/apis/admin.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function useUpdateStaffRole() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: adminApi.setStaffRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'firebase-users'] })
      toast.success(data?.data?.message)
    }
  })
  return { mutate, isPending }
}
