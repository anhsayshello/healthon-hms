import { useMutation, useQueryClient } from '@tanstack/react-query'
import labApi from '@/apis/lab.api'

export default function useFinishLabTest() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: labApi.finishLabTest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lab', 'tests'] })
      queryClient.invalidateQueries({ queryKey: ['lab', 'requests'] })
    }
  })

  return { mutate, isPending }
}
