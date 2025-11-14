import cashierApi from '@/apis/cashier.api'
import { useMutation } from '@tanstack/react-query'

export default function useProcessPayment() {
  const { mutate, isPending } = useMutation({
    mutationFn: cashierApi.processPayment
  })

  return { mutate, isPending }
}
