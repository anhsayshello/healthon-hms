import type { Route } from './+types/medical-records'
import CardWrapper from '@/components/shared/card-wrapper'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'
import UserInfo from '@/components/shared/user-info'
import useQueryParams from '@/hooks/useQueryParams'
import TableMetadata from '@/components/shared/table-metadata'
import AppPagination from '@/components/shared/app-pagination'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import useRole from '@/hooks/use-role'
import useMedicalRecord from '@/hooks/useMedicalRecords'
import type { MedicalRecord } from '@/types/index.type'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Medical Record' }, { name: 'description', content: 'Welcome to React Router!' }]
}

const tableColumns = [
  { header: 'Id', key: 'id' },
  { header: 'Patient info', key: 'patient-info' },
  { header: 'Phone', key: 'phone' },
  { header: 'Date of birth', key: 'dob' },
  { header: 'Diagnosis', key: 'diagnosis' },
  { header: 'Lab Test', key: 'lab-test' },
  { header: 'Action', key: 'action' }
]

export default function MedicalRecords() {
  const { isAdmin, isNurse } = useRole()
  const { query, page, limit, handlePageChange, handleSearch } = useQueryParams()
  const { dataMedicalRecords, currentPage, totalPages, totalRecords, isPending } = useMedicalRecord({
    query,
    page,
    limit
  })

  return (
    <div className='grow h-full flex flex-col gap-4 lg:gap-6 justify-between'>
      <CardWrapper>
        <TableMetadata title='Medical' totalRecords={totalRecords} onSearch={handleSearch} />
        <Table className='bg-background'>
          <TableHeader>
            <TableRow>
              {isAdmin && tableColumns.map((column) => <TableHead key={column.key}>{column.header}</TableHead>)}
              {isNurse &&
                tableColumns.map((column) => {
                  return column.key !== 'action' && <TableHead key={column.key}>{column.header}</TableHead>
                })}
            </TableRow>
          </TableHeader>
          {dataMedicalRecords && dataMedicalRecords.length === 0 && (
            <TableCaption className='text-center'>{isPending ? <Spinner /> : 'No data found'}</TableCaption>
          )}
          <TableBody>
            {dataMedicalRecords &&
              dataMedicalRecords.length > 0 &&
              dataMedicalRecords.map((medicalRecord) => (
                <MedicalTableRecord key={medicalRecord.id} medicalRecord={medicalRecord} />
              ))}
          </TableBody>
        </Table>
      </CardWrapper>
      <AppPagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

function MedicalTableRecord({ medicalRecord }: { medicalRecord: MedicalRecord }) {
  const { isAdmin } = useRole()

  return (
    <Dialog>
      <TableRow>
        <DialogTrigger asChild>
          <TableCell className='cursor-pointer'>
            <UserInfo
              photoUrl={medicalRecord?.patient?.photo_url}
              firstName={medicalRecord?.patient?.first_name ?? ''}
              lastName={medicalRecord?.patient?.last_name ?? ''}
              description={medicalRecord?.patient?.gender}
            />
          </TableCell>
        </DialogTrigger>
        {/* <TableCell>{patient.email}</TableCell>
        <TableCell>{patient.phone}</TableCell>
        <TableCell>{formatDate(patient.date_of_birth)}</TableCell>
        <TableCell>{patient.address}</TableCell>
        {isAdmin && (
          <TableCell>
            <UserAction uid={patient.uid} email={patient.email} />
          </TableCell>
        )} */}
      </TableRow>
    </Dialog>
  )
}
