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
import type { Staff } from '@/types/staff.type'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import UserDetailsDialog from './user-details-dialog'
import InfoItem from '@/components/shared/info-item'

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
  const { dataStaffs, currentPage, totalPages, totalRecords, isPending } = useStaffs({ query, page, limit })

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
              dataStaffs.map((staff) => <StaffTableRow key={staff.uid} staff={staff} />)}
          </TableBody>
        </Table>
      </CardWrapper>
      <AppPagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

function StaffTableRow({ staff }: { staff: Staff }) {
  return (
    <Dialog>
      <TableRow>
        <DialogTrigger asChild>
          <TableCell className='cursor-pointer'>
            <UserInfo
              photoUrl={staff.photo_url}
              firstName={staff.first_name}
              lastName={staff.last_name}
              description={staff.department}
            />
          </TableCell>
        </DialogTrigger>
        <TableCell className='capitalize'>{staff.role.toLowerCase()}</TableCell>
        <TableCell>{staff.email}</TableCell>
        <TableCell>{staff.phone}</TableCell>
        <TableCell>{staff.license_number}</TableCell>
        <TableCell>
          <UserAction uid={staff.uid} email={staff.email} role={staff.role} />
        </TableCell>
      </TableRow>
      <UserDetailsDialog user={staff} role={staff.role}>
        <div className='grid grid-cols-2 gap-4'>
          <InfoItem label='Role' value={staff?.role} />
          <InfoItem label='Department' value={staff?.department || 'N/A'} />
          <InfoItem label='License Number' value={staff?.license_number} />
          <InfoItem label='Phone' value={staff?.phone} />
          <InfoItem label='Address' value={staff?.address} />
          <InfoItem label='Status' value={staff?.status} />
        </div>
      </UserDetailsDialog>
    </Dialog>
  )
}
