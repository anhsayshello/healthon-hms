import type { Route } from './+types/doctor-records'
import CardWrapper from '@/components/shared/card-wrapper'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useDoctors from '@/hooks/doctor/useDoctors'
import { Spinner } from '@/components/ui/spinner'
import UserInfo from '@/components/shared/user-info'
import useQueryParams from '@/hooks/useQueryParams'
import TableMetadata from '@/components/shared/table-metadata'
import AppPagination from '@/components/shared/app-pagination'
import NewDoctor from '../../components/admin/new-doctor'
import UserAction from '../../components/admin/user-action'
import type { Doctor } from '@/types/doctor.type'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import UserDetailsDialog from '../../components/shared/user-details-dialog'
import { RoleEnum } from '@/types/role.type'
import InfoItem from '@/components/shared/info-item'
import { Badge } from '@/components/ui/badge'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Doctor Records' }, { name: 'description', content: 'Welcome to React Router!' }]
}

const tableColumns = [
  { header: 'Doctor info', key: 'doctor-info' },
  { header: 'Email', key: 'email' },
  { header: 'Phone', key: 'phone' },
  { header: 'License number', key: 'license-number' },
  { header: 'Address', key: 'address' },
  { header: 'Action', key: 'action' }
]

export default function DoctorRecords() {
  const { query, page, limit, handlePageChange, handleSearch } = useQueryParams()
  const { dataDoctors, currentPage, totalPages, totalRecords, isPending } = useDoctors({ query, page, limit })

  return (
    <div className='grow h-full flex flex-col gap-4 lg:gap-6 justify-between'>
      <CardWrapper>
        <TableMetadata title='Doctor Table' totalRecords={totalRecords} onSearch={handleSearch}>
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
              dataDoctors.map((doctor) => <DoctorRow key={doctor.uid} doctor={doctor} />)}
          </TableBody>
        </Table>
      </CardWrapper>
      <AppPagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

function DoctorRow({ doctor }: { doctor: Doctor }) {
  return (
    <Dialog>
      <TableRow>
        <DialogTrigger asChild>
          <TableCell className='cursor-pointer'>
            <UserInfo
              photoUrl={doctor.photo_url}
              firstName={doctor.first_name}
              lastName={doctor.last_name}
              description={doctor.specialization}
            />
          </TableCell>
        </DialogTrigger>
        <TableCell>{doctor.email}</TableCell>
        <TableCell>{doctor.phone}</TableCell>
        <TableCell>{doctor.license_number}</TableCell>
        <TableCell>{doctor.address}</TableCell>
        <TableCell>
          <UserAction uid={doctor.uid} email={doctor.email} />
        </TableCell>
      </TableRow>
      <UserDetailsDialog user={doctor} role={RoleEnum.DOCTOR}>
        <div className='grid grid-cols-2 gap-4'>
          <InfoItem label='Phone' value={doctor?.phone} />
          <InfoItem label='Address' value={doctor?.address} />
          <InfoItem label='License Number' value={doctor?.license_number} />
          <InfoItem label='Specialization' value={doctor?.specialization} />
          <InfoItem label='Department' value={doctor?.department || 'N/A'} />
          <InfoItem label='Status' value={doctor?.availability_status || 'N/A'} />
        </div>
        {doctor.working_days && (
          <div>
            <h4 className='font-semibold mb-3 text-lg'>Working Schedule</h4>
            <div className='space-y-2 space-x-2'>
              {doctor?.working_days?.map((item) => (
                <Badge key={item.id}>{item.day}</Badge>
              ))}
            </div>
          </div>
        )}
      </UserDetailsDialog>
    </Dialog>
  )
}
