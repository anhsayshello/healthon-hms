import { Button } from '@/components/ui/button'
import path from '@/constants/path'
import useInitializePayment from '@/hooks/cashier/useInitializePayment'
import { CreditCard } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Spinner } from '../ui/spinner'

export default function InitializePayment({ appointment_id }: { appointment_id: number }) {
  const { mutate, isPending } = useInitializePayment()
  const navigate = useNavigate()

  const handleInitialize = () => {
    mutate(appointment_id, {
      onSuccess: (data) => {
        const paymentId = data.data.id
        navigate({ pathname: `${path.cashier.payments}/${paymentId}` })
      }
    })
  }

  return (
    <Button onClick={handleInitialize} disabled={isPending} className='cursor-pointer'>
      {isPending && <Spinner />}
      <CreditCard />
      <span>{isPending ? 'Initializing...' : 'Initalize payment'}</span>
    </Button>
  )
}
