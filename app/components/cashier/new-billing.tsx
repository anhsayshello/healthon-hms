import { Button } from '@/components/ui/button'
import path from '@/constants/path'
import { CreditCard } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Spinner } from '../ui/spinner'
import { useState } from 'react'
import useCreateBilling from '@/hooks/cashier/useCreateBilling'

export default function NewBilling({ appointment_id }: { appointment_id: number }) {
  const { mutate } = useCreateBilling()
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const handleInitialize = () => {
    setIsPending(true)
    mutate(appointment_id, {
      onSuccess: (data) => {
        const billingId = data.data.id
        navigate({ pathname: `${path.cashier.billings}/${billingId}` })
      },
      onSettled: () => {
        setTimeout(() => setIsPending(false), 1000)
      }
    })
  }

  return (
    <Button onClick={handleInitialize} disabled={isPending} className='cursor-pointer'>
      {isPending && <Spinner />}
      {!isPending && <CreditCard />}
      <span>{isPending ? 'Creating...' : 'Create bill'}</span>
    </Button>
  )
}
