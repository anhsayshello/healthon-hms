import { useMutation, useQueryClient } from '@tanstack/react-query'
import labApi from '@/apis/lab.api'

export default function useCreateLabRequest() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: labApi.createLabRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medical-record'] })
    }
  })

  return { mutate, isPending }
}
