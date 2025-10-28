import type { Route } from './+types/doctor-list'
import CardWrapper from '@/components/shared/card-wrapper'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useDoctors from '@/hooks/useDoctors'
import { Spinner } from '@/components/ui/spinner'
import UserInfo from '@/components/shared/user-info'
import useQueryParams from '@/hooks/useQueryParams'
import TableMetadata from '@/components/shared/table-metadata'
import AppPagination from '@/components/shared/app-pagination'
import NewDoctor from './new-doctor'
import UserAction from './user-action'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Doctor Table' }, { name: 'description', content: 'Welcome to React Router!' }]
}

const tableColumns = [
  { header: 'Doctor info', key: 'doctor-info' },
  { header: 'Email', key: 'email' },
  { header: 'Phone', key: 'phone' },
  { header: 'License number', key: 'license-number' },
  { header: 'Address', key: 'address' },
  { header: 'Action', key: 'action' }
]

export default function DoctorList() {
  const { query, page, limit, handlePageChange, handleSearch } = useQueryParams()
  const { dataDoctors, currentPage, totalPages, totalRecords, isPending } = useDoctors(query, page, limit)

  return (
    <div className='grow h-full flex flex-col gap-4 lg:gap-6 justify-between'>
      <CardWrapper>
        <TableMetadata title='Doctor' totalRecords={totalRecords} onSearch={handleSearch}>
          <NewDoctor />
        </TableMetadata>
        <Table className='bg-background'>
          <TableHeader>
            <TableRow>
              {tableColumns.map((column) => (
                <TableHead key={column.key}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          {dataDoctors && dataDoctors.length === 0 && (
            <TableCaption className='text-center'>{isPending ? <Spinner /> : 'No data found'}</TableCaption>
          )}
          <TableBody>
            {dataDoctors &&
              dataDoctors.length > 0 &&
              dataDoctors.map((doctor) => (
                <TableRow key={doctor.uid}>
                  <TableCell>
                    <UserInfo
                      photoUrl={doctor.photo_url}
                      firstName={doctor.first_name}
                      lastName={doctor.last_name}
                      description={doctor.specialization}
                    />
                  </TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.phone}</TableCell>
                  <TableCell>{doctor.license_number}</TableCell>
                  <TableCell>{doctor.address}</TableCell>
                  <TableCell>
                    <UserAction uid={doctor.uid} email={doctor.email} />
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
