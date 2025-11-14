import cashierApi from '@/apis/cashier.api'
import { useQuery } from '@tanstack/react-query'

export default function useReceiptById(id: number) {
  const { data, isPending } = useQuery({
    queryKey: ['receipt', id],
    queryFn: () => cashierApi.getReceiptById(id),
    enabled: !!id
  })

  const dataReceipt = data?.data

  return { dataReceipt, isPending }
}
