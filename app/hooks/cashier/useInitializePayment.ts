import cashierApi from '@/apis/cashier.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useInitializePayment() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: cashierApi.initializePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['payments']
      })
    }
  })

  return { mutate, isPending }
}
