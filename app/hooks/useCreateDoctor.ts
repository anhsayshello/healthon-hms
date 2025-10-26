import adminApi from '@/apis/admin.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function useCreateDoctor() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: adminApi.createDoctor,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'firebase-users'] })
      toast.success('Created doctor user successfully')
      console.log(data)
    }
  })

  return { mutate, isPending }
}
