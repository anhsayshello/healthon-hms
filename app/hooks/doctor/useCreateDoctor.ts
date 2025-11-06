import adminApi from '@/apis/admin.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useCreateDoctor() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: adminApi.createDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
    }
  })

  return { mutate, isPending }
}
