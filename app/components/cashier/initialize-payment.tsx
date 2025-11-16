import { Button } from '@/components/ui/button'
import path from '@/constants/path'
import useInitializePayment from '@/hooks/cashier/useInitializePayment'
import { CreditCard } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Spinner } from '../ui/spinner'
import { useState } from 'react'

export default function InitializePayment({ appointment_id }: { appointment_id: number }) {
  const { mutate } = useInitializePayment()
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const handleInitialize = () => {
    setIsPending(true)
    mutate(appointment_id, {
      onSuccess: (data) => {
        const paymentId = data.data.id
        navigate({ pathname: `${path.cashier.payments}/${paymentId}` })
      },
      onSettled: () => {
        setTimeout(() => setIsPending(false), 1000)
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
