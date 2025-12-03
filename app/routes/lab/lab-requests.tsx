import type { Route } from './+types/lab-tests'
import CardWrapper from '@/components/shared/card-wrapper'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'
import useQueryParams from '@/hooks/useQueryParams'
import TableMetadata from '@/components/shared/table-metadata'
import AppPagination from '@/components/shared/app-pagination'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { LabTestStatusEnum, type LabTest } from '@/types/lab.type'
import useLabTestRequests from '@/hooks/lab/useLabTestRequests'
import { formatDateTime } from '@/helpers/formatDateTime'
import UserInfo from '@/components/shared/user-info'
import LabTestStatusIndicator from '@/components/features/lab/lab-status-indicator'
import StartLabTest from '@/components/features/lab/start-lab-test'
import FinishLabTest from '@/components/features/lab/finish-lab-test'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Lab Requests' }, { name: 'description', content: 'Welcome to React Router!' }]
}

const tableColumns = [
  { header: 'Id', key: 'id' },
  { header: 'Service name', key: 'service-name' },
  { header: 'Doctor request', key: 'doctor-request' },
  { header: 'Patient', key: 'patient' },
  { header: 'Requested at', key: 'requested-at' },
  { header: 'Status', key: 'status' },
  { header: 'Action', key: 'action' }
]

export default function LabTests() {
  const { query, page, limit, handlePageChange, handleSearch } = useQueryParams()
  const { dataLabTestRequests, currentPage, totalPages, totalRecords, isPending } = useLabTestRequests({
    query,
    page,
    limit
  })

  return (
    <div className='grow h-full flex flex-col gap-4 lg:gap-6 justify-between'>
      <CardWrapper>
        <TableMetadata title='Lab Request' totalRecords={totalRecords} onSearch={handleSearch} />
        <Table className='bg-background'>
          <TableHeader>
            <TableRow>
              {tableColumns.map((column) => (
                <TableHead key={column.key}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          {dataLabTestRequests && dataLabTestRequests.length === 0 && (
            <TableCaption className='text-center'>{isPending ? <Spinner /> : 'No data found'}</TableCaption>
          )}
          <TableBody>
            {dataLabTestRequests &&
              dataLabTestRequests.length > 0 &&
              dataLabTestRequests.map((labReq) => <LabRequestRow key={labReq.id} labReq={labReq} />)}
          </TableBody>
        </Table>
      </CardWrapper>
      <AppPagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

function LabRequestRow({ labReq }: { labReq: LabTest }) {
  return (
    <Dialog>
      <TableRow>
        <DialogTrigger asChild>
          <TableCell className='cursor-pointer'>{labReq.id}</TableCell>
        </DialogTrigger>
        <TableCell>{labReq.service?.service_name}</TableCell>
        <TableCell>
          <UserInfo
            firstName={labReq.medical_record?.doctor?.first_name}
            lastName={labReq.medical_record?.doctor?.last_name ?? ''}
            photoUrl={labReq.medical_record?.doctor?.photo_url}
            description={labReq.medical_record?.doctor?.specialization}
          />
        </TableCell>
        <TableCell>
          <UserInfo
            firstName={labReq.medical_record?.patient?.first_name}
            lastName={labReq.medical_record?.patient?.last_name ?? ''}
            photoUrl={labReq.medical_record?.patient?.photo_url}
            description={labReq.medical_record?.patient?.gender}
          />
        </TableCell>
        <TableCell>{formatDateTime(labReq.test_date)}</TableCell>
        <TableCell>
          <LabTestStatusIndicator status={labReq.status} />
        </TableCell>
        <TableCell>
          {labReq.status === LabTestStatusEnum.PENDING && <StartLabTest id={labReq.id} />}
          {labReq.status === LabTestStatusEnum.IN_PROGRESS && (
            <FinishLabTest
              id={labReq.id}
              serviceName={labReq.service?.service_name ?? ''}
              patientName={`${labReq.medical_record?.patient?.first_name} ${labReq.medical_record?.patient?.last_name}`}
            />
          )}
        </TableCell>
      </TableRow>
    </Dialog>
  )
}
