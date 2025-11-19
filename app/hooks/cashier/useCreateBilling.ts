import cashierApi from '@/apis/cashier.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useCreateBilling() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: cashierApi.createBilling,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['billings']
      })
    }
  })

  return { mutate, isPending }
}
