import type { Route } from './+types/receipt-records'
import CardWrapper from '@/components/shared/card-wrapper'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'
import useQueryParams from '@/hooks/useQueryParams'
import TableMetadata from '@/components/shared/table-metadata'
import AppPagination from '@/components/shared/app-pagination'
import useReceipts from '@/hooks/cashier/useReceipts'
import type { Payment } from '@/types/payment.type'
import UserInfo from '@/components/shared/user-info'
import { formatDateTime } from '@/helpers/formatDateTime'
import formatNumber from '@/helpers/formatNumber'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import useReceiptById from '@/hooks/cashier/useReceiptById'
import Receipt from '@/components/features/cashier/receipt'
import { useIsMobile } from '@/hooks/use-mobile'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Receipt List' }, { name: 'description', content: 'Welcome to React Router!' }]
}

const tableColumns = [
  { header: 'Invoice', key: 'invoice' },
  { header: 'Patient', key: 'patient' },
  { header: 'Date', key: 'date' },
  { header: 'Cashier', key: 'cashier' },
  { header: 'Payment Method', key: 'payment-method' },
  { header: 'Billed Total', key: 'billed-total' }
]

export default function PaymentRecords() {
  const { query, page, limit, handlePageChange, handleSearch } = useQueryParams()
  const { dataReceipts, currentPage, totalPages, totalRecords, isPending } = useReceipts({
    query,
    page,
    limit
  })

  return (
    <div className='grow h-full flex flex-col gap-4 lg:gap-6 justify-between'>
      <CardWrapper>
        <TableMetadata title='Receipt Table' totalRecords={totalRecords} onSearch={handleSearch} />
        <Table className='bg-background'>
          <TableHeader>
            <TableRow>
              {tableColumns.map((column) => (
                <TableHead key={column.key}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          {dataReceipts && dataReceipts.length === 0 && (
            <TableCaption className='text-center'>{isPending ? <Spinner /> : 'No data found'}</TableCaption>
          )}
          <TableBody>
            {dataReceipts &&
              dataReceipts.length > 0 &&
              dataReceipts.map((receipt) => <ReceiptRow key={receipt.id} receipt={receipt} />)}
          </TableBody>
        </Table>
      </CardWrapper>
      <AppPagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

function ReceiptRow({ receipt }: { receipt: Payment }) {
  const { dataReceipt, isPending } = useReceiptById(receipt.id)
  const isMobile = useIsMobile()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow className='cursor-pointer'>
          <TableCell>{receipt.id}</TableCell>
          <TableCell>
            <UserInfo
              photoUrl={receipt.appointment?.patient.photo_url}
              firstName={receipt.appointment?.patient.first_name}
              lastName={receipt.appointment?.patient.last_name ?? ''}
              description={receipt.appointment?.patient.gender}
            />
          </TableCell>
          <TableCell>{formatDateTime(receipt.payment_date)}</TableCell>
          <TableCell>
            <UserInfo
              photoUrl={receipt.cashier?.photo_url}
              firstName={receipt.cashier?.first_name}
              lastName={receipt.cashier?.last_name ?? ''}
              description={receipt.cashier?.department}
            />
          </TableCell>
          <TableCell>{receipt.payment_method}</TableCell>
          <TableCell>{formatNumber(receipt.total_amount)}</TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent
        showCloseButton={isMobile}
        className='w-full md:max-w-3xl max-h-[96vh] md:max-h-[90vh] overflow-y-auto'
      >
        {isPending && (
          <div className='flex items-center justify-center h-[30vh]'>
            <Spinner />
          </div>
        )}

        {dataReceipt && <Receipt dataReceipt={dataReceipt} isDialog />}
      </DialogContent>
    </Dialog>
  )
}
