import { useMutation } from '@tanstack/react-query'
import labApi from '@/apis/lab.api'

export default function useStartLabTest() {
  const { mutate, isPending } = useMutation({
    mutationFn: labApi.startLabTest
  })

  return { mutate, isPending }
}
