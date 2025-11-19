import cashierApi from '@/apis/cashier.api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

export default function useBillingById() {
  const { billingId } = useParams()

  const { data, isPending } = useQuery({
    queryKey: ['billing', billingId],
    queryFn: () => cashierApi.getBillingById(billingId as string),
    enabled: !!billingId
  })

  const dataBilling = data?.data

  return { dataBilling, isPending }
}
