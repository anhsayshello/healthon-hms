import type { Route } from './+types/lab-services'
import CardWrapper from '@/components/shared/card-wrapper'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'
import useQueryParams from '@/hooks/useQueryParams'
import TableMetadata from '@/components/shared/table-metadata'
import AppPagination from '@/components/shared/app-pagination'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import useLabServices from '@/hooks/lab/useLabServices'
import type { Service } from '@/types/lab.type'
import NewLabService from '@/components/lab/new-lab-service'
import formatDate from '@/helpers/formatDate'
import formatNumber from '@/helpers/formatNumber'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Lab Services' }, { name: 'description', content: 'Welcome to React Router!' }]
}

const tableColumns = [
  { header: 'ID', key: 'id' },
  { header: 'Name', key: 'name' },
  { header: 'Price', key: 'price' },
  { header: 'Currency', key: 'currency' },
  { header: 'Description', key: 'description' },
  { header: 'Created At', key: 'created-at' }
]
export default function LabServices() {
  const { query, page, limit, handlePageChange, handleSearch } = useQueryParams()
  const { dataLabServices, currentPage, totalPages, totalRecords, isPending } = useLabServices({ query, page, limit })

  return (
    <div className='grow h-full flex flex-col gap-4 lg:gap-6 justify-between'>
      <CardWrapper>
        <TableMetadata title='Lab Service' totalRecords={totalRecords} onSearch={handleSearch}>
          <NewLabService />
        </TableMetadata>
        <Table className='bg-background'>
          <TableHeader>
            <TableRow>
              {tableColumns.map((column) => (
                <TableHead key={column.key}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          {dataLabServices && dataLabServices.length === 0 && (
            <TableCaption className='text-center'>{isPending ? <Spinner /> : 'No data found'}</TableCaption>
          )}
          <TableBody>
            {dataLabServices &&
              dataLabServices.length > 0 &&
              dataLabServices.map((service) => <LabServiceRow key={service.id} service={service} />)}
          </TableBody>
        </Table>
      </CardWrapper>
      <AppPagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

function LabServiceRow({ service }: { service: Service }) {
  return (
    <Dialog>
      <TableRow>
        <DialogTrigger asChild>
          <TableCell className='cursor-pointer'>{service.id}</TableCell>
        </DialogTrigger>
        <TableCell className='max-w-30 truncate'>{service.service_name}</TableCell>
        <TableCell>{formatNumber(service.price)}</TableCell>

        <TableCell>{service.currency}</TableCell>
        <TableCell className='max-w-30 truncate'>{service.description}</TableCell>
        <TableCell>{formatDate(service.created_at)}</TableCell>
      </TableRow>
    </Dialog>
  )
}
