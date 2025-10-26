import adminApi from '@/apis/admin.api'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function useUpdateStaffRole() {
  const { mutate, isPending } = useMutation({
    mutationFn: adminApi.setStaffRole,
    onSuccess: (data) => {
      toast.success(data?.data?.message)
    }
  })
  return { mutate, isPending }
}
