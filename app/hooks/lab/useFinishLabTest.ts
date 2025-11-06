import { useMutation } from '@tanstack/react-query'
import labApi from '@/apis/lab.api'

export default function useFinishLabTest() {
  const { mutate, isPending } = useMutation({
    mutationFn: labApi.finishLabTest
  })

  return { mutate, isPending }
}
