import type { Route } from './+types/medication-list'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Medication List' }, { name: 'description', content: 'Welcome to React Router!' }]
}

import CardWrapper from '@/components/shared/card-wrapper'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'
import useQueryParams from '@/hooks/useQueryParams'
import TableMetadata from '@/components/shared/table-metadata'
import AppPagination from '@/components/shared/app-pagination'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import useMedications from '@/hooks/medication/useMedications'
import type { Medication } from '@/types/medication.type'
import { useState } from 'react'
import { formatDateTime } from '@/helpers/formatDateTime'
import NewMedication from '../../components/cashier/new-medication'
import formatNumber from '@/helpers/formatNumber'
import { useIsMobile } from '@/hooks/use-mobile'

const tableColumns = [
  { header: 'ID', key: 'id' },
  { header: 'Medication name', key: 'medication-name' },
  { header: 'Unit price', key: 'unit-price' },
  { header: 'Currency', key: 'currency' },
  { header: 'Unit type', key: 'unit-type' },
  { header: 'Stock quantity', key: 'stock-quantity' },
  { header: 'Updated at', key: 'updated-at' }
]
export default function MedicationList() {
  const { query, page, limit, handlePageChange, handleSearch } = useQueryParams()
  const { dataMedications, currentPage, totalPages, totalRecords, isPending } = useMedications({ query, page, limit })

  return (
    <div className='grow h-full flex flex-col gap-4 lg:gap-6 justify-between'>
      <CardWrapper>
        <TableMetadata title='Medication Table' totalRecords={totalRecords} onSearch={handleSearch}>
          <NewMedication />
        </TableMetadata>
        <Table className='bg-background'>
          <TableHeader>
            <TableRow>
              {tableColumns.map((column) => (
                <TableHead key={column.key}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          {dataMedications && dataMedications.length === 0 && (
            <TableCaption className='text-center'>{isPending ? <Spinner /> : 'No data found'}</TableCaption>
          )}
          <TableBody>
            {dataMedications &&
              dataMedications.length > 0 &&
              dataMedications.map((medication) => <MedicationRow key={medication.id} medication={medication} />)}
          </TableBody>
        </Table>
      </CardWrapper>
      <AppPagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

function MedicationRow({ medication }: { medication: Medication }) {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TableRow onClick={() => setOpen(true)}>
        <TableCell>{medication.id}</TableCell>
        <TableCell>{medication.medication_name}</TableCell>
        <TableCell>{formatNumber(medication.unit_price)}</TableCell>
        <TableCell>{medication.currency}</TableCell>
        <TableCell className='capitalize'>{medication.unit_type.toLocaleLowerCase()}</TableCell>
        <TableCell>{medication.stock_quantity}</TableCell>
        <TableCell>{formatDateTime(medication.updated_at)}</TableCell>
      </TableRow>
      <DialogContent showCloseButton={isMobile} className='max-h-[90vh] overflow-y-auto sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Medication detail</DialogTitle>
          <DialogDescription>ID: #{medication.id}</DialogDescription>
          <div></div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
