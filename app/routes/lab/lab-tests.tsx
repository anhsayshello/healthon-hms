import type { Route } from './+types/lab-tests'
import CardWrapper from '@/components/shared/card-wrapper'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'
import useQueryParams from '@/hooks/useQueryParams'
import TableMetadata from '@/components/shared/table-metadata'
import AppPagination from '@/components/shared/app-pagination'
import { Dialog, DialogContent } from '@/components/ui/dialog'

import type { LabTest } from '@/types/lab.type'
import useLabTests from '@/hooks/lab/useLabTests'
import LabTestStatusIndicator from '@/components/lab/lab-status-indicator'
import UserInfo from '@/components/shared/user-info'
import { formatDateTime } from '@/helpers/formatDateTime'
import { useIsMobile } from '@/hooks/use-mobile'
import { useState } from 'react'
import LabTestDetail from './lab-test-detail'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Lab Tests' }, { name: 'description', content: 'Welcome to React Router!' }]
}

const tableColumns = [
  { header: 'Id', key: 'id' },
  { header: 'Service name', key: 'service-name' },
  { header: 'Patient', key: 'patient' },
  { header: 'Technician', key: 'technician' },
  { header: 'Status', key: 'status' },
  { header: 'Test date', key: 'date' }
]
export default function LabTests() {
  const { query, page, limit, handlePageChange, handleSearch } = useQueryParams()
  const { dataLabTests, currentPage, totalPages, totalRecords, isPending } = useLabTests({
    query,
    page,
    limit
  })

  return (
    <div className='grow h-full flex flex-col gap-4 lg:gap-6 justify-between'>
      <CardWrapper>
        <TableMetadata title='Lab Test' totalRecords={totalRecords} onSearch={handleSearch} />
        <Table className='bg-background'>
          <TableHeader>
            <TableRow>
              {tableColumns.map((column) => (
                <TableHead key={column.key}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          {dataLabTests && dataLabTests.length === 0 && (
            <TableCaption className='text-center'>{isPending ? <Spinner /> : 'No data found'}</TableCaption>
          )}
          <TableBody>
            {dataLabTests &&
              dataLabTests.length > 0 &&
              dataLabTests.map((labTest) => <LabTestRow key={labTest.id} labTest={labTest} />)}
          </TableBody>
        </Table>
      </CardWrapper>
      <AppPagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

function LabTestRow({ labTest }: { labTest: LabTest }) {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TableRow className='cursor-pointer' onClick={() => setOpen(true)}>
        <TableCell className='cursor-pointer'>{labTest.id}</TableCell>
        <TableCell>{labTest.service?.service_name}</TableCell>
        <TableCell>
          <UserInfo
            firstName={labTest.medical_record?.patient?.first_name}
            lastName={labTest.medical_record?.patient?.last_name ?? ''}
            photoUrl={labTest.medical_record?.patient?.photo_url}
            description={labTest.medical_record?.patient?.gender}
          />
        </TableCell>
        <TableCell>
          <UserInfo
            firstName={labTest.technician?.first_name}
            lastName={labTest.technician?.last_name ?? ''}
            photoUrl={labTest.technician?.photo_url}
            description={labTest.technician?.department}
          />
        </TableCell>
        <TableCell>
          <LabTestStatusIndicator status={labTest.status} />
        </TableCell>
        <TableCell>{formatDateTime(labTest.test_date)}</TableCell>
      </TableRow>
      <DialogContent showCloseButton={isMobile}>
        <LabTestDetail labTest={labTest} />
      </DialogContent>
    </Dialog>
  )
}
