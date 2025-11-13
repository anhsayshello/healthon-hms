import { useMutation, useQueryClient } from '@tanstack/react-query'
import labApi from '@/apis/lab.api'

export default function useCancelLabRequest() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: labApi.cancelLabRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['medical-record']
      })
    }
  })

  return { mutate, isPending }
}
