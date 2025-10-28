import type { Route } from './+types/patient-list'
import CardWrapper from '@/components/shared/card-wrapper'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'
import UserInfo from '@/components/shared/user-info'
import useQueryParams from '@/hooks/useQueryParams'
import TableMetadata from '@/components/shared/table-metadata'
import AppPagination from '@/components/shared/app-pagination'
import usePatients from '@/hooks/usePatients'
import UserAction from './user-action'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Patient Table' }, { name: 'description', content: 'Welcome to React Router!' }]
}

const tableColumns = [
  { header: 'Patient info', key: 'patient-info' },
  { header: 'Email', key: 'email' },
  { header: 'Phone', key: 'phone' },
  { header: 'Address', key: 'address' },
  { header: 'Action', key: 'action' }
]

export default function PatientList() {
  const { query, page, limit, handlePageChange, handleSearch } = useQueryParams()
  const { dataPatients, currentPage, totalPages, totalRecords, isPending } = usePatients(query, page, limit)

  return (
    <div className='grow h-full flex flex-col gap-4 lg:gap-6 justify-between'>
      <CardWrapper>
        <TableMetadata title='Patient' totalRecords={totalRecords} onSearch={handleSearch} />
        <Table className='bg-background'>
          <TableHeader>
            <TableRow>
              {tableColumns.map((column) => (
                <TableHead key={column.key}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          {dataPatients && dataPatients.length === 0 && (
            <TableCaption className='text-center'>{isPending ? <Spinner /> : 'No data found'}</TableCaption>
          )}
          <TableBody>
            {dataPatients &&
              dataPatients.length > 0 &&
              dataPatients.map((patient) => (
                <TableRow key={patient.uid}>
                  <TableCell>
                    <UserInfo
                      photoUrl={patient.photo_url}
                      firstName={patient.first_name}
                      lastName={patient.last_name}
                      description={patient.gender}
                    />
                  </TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.address}</TableCell>
                  <TableCell>
                    <UserAction uid={patient.uid} email={patient.email} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardWrapper>
      <AppPagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}
