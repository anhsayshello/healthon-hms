import { useMutation, useQueryClient } from '@tanstack/react-query'
import labApi from '@/apis/lab.api'

export default function useCreateLabService() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: labApi.createLabService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lab', 'services'] })
    }
  })

  return { mutate, isPending }
}
