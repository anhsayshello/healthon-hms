import { useMutation } from '@tanstack/react-query'
import labApi from '@/apis/lab.api'

export default function useCancelLabRequest() {
  const { mutate, isPending } = useMutation({
    mutationFn: labApi.cancelLabRequest
  })

  return { mutate, isPending }
}
