import cashierApi from '@/apis/cashier.api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

export default function usePaymentById() {
  const { paymentId } = useParams()

  const { data, isPending } = useQuery({
    queryKey: ['payment', paymentId],
    queryFn: () => cashierApi.getPaymentById(paymentId as string),
    enabled: !!paymentId
  })

  const dataPayment = data?.data

  return { dataPayment, isPending }
}
