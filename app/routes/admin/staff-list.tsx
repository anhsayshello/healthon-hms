import type { Route } from './+types/staff-list'
import CardWrapper from '@/components/shared/card-wrapper'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'
import UserInfo from '@/components/shared/user-info'
import useQueryParams from '@/hooks/useQueryParams'
import TableMetadata from '@/components/shared/table-metadata'
import AppPagination from '@/components/shared/app-pagination'
import useStaffs from '@/hooks/useStaffs'
import NewStaff from './new-staff'
import UserAction from './user-action'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Staff Table' }, { name: 'description', content: 'Welcome to React Router!' }]
}

const tableColumns = [
  { header: 'Staff info', key: 'staff-info' },
  { header: 'Role', key: 'role' },
  { header: 'Email', key: 'email' },
  { header: 'Phone', key: 'phone' },
  { header: 'License number', key: 'license-number' },
  { header: 'Action', key: 'action' }
]

export default function StaffList() {
  const { query, page, limit, handlePageChange, handleSearch } = useQueryParams()
  const { dataStaffs, currentPage, totalPages, totalRecords, isPending } = useStaffs(query, page, limit)

  return (
    <div className='grow h-full flex flex-col gap-4 lg:gap-6 justify-between'>
      <CardWrapper>
        <TableMetadata title='Staff' totalRecords={totalRecords} onSearch={handleSearch}>
          <NewStaff />
        </TableMetadata>
        <Table className='bg-background'>
          <TableHeader>
            <TableRow>
              {tableColumns.map((column) => (
                <TableHead key={column.key}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          {dataStaffs && dataStaffs.length === 0 && (
            <TableCaption className='text-center'>{isPending ? <Spinner /> : 'No data found'}</TableCaption>
          )}
          <TableBody>
            {dataStaffs &&
              dataStaffs.length > 0 &&
              dataStaffs.map((staff) => (
                <TableRow key={staff.uid}>
                  <TableCell>
                    <UserInfo photoUrl={staff.photo_url} firstName={staff.first_name} lastName={staff.last_name} />
                  </TableCell>
                  <TableCell className='capitalize'>{staff.role.toLowerCase()}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>{staff.phone}</TableCell>
                  <TableCell>{staff.license_number}</TableCell>
                  <TableCell>
                    <UserAction uid={staff.uid} email={staff.email} role={staff.role} />
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
