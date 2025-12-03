import type { Route } from './+types/receipt-detail'
import CardWrapper from '@/components/shared/card-wrapper'
import { Spinner } from '@/components/ui/spinner'
import useReceiptById from '@/hooks/cashier/useReceiptById'
import { useParams } from 'react-router'

import Receipt from '@/components/features/cashier/receipt'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Receipt Detail' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function ReceiptDetail() {
  const { receiptId } = useParams()
  const { dataReceipt, isPending } = useReceiptById(Number(receiptId))

  if (isPending) {
    return (
      <div className='flex items-center justify-center h-full'>
        <Spinner />
      </div>
    )
  }

  return <CardWrapper className='max-w-4xl mx-auto'>{dataReceipt && <Receipt dataReceipt={dataReceipt} />}</CardWrapper>
}
