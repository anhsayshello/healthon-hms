import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CardWrapper from '../shared/card-wrapper'
import { type Appointment } from '@/types/appointment.type'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'
import path from '@/constants/path'
import AppointmentStatusIndicator from './appointment-status-indicator'

import { Badge } from '../ui/badge'
import AppointmentAction from './appointment-action'
import BookAppoinment from './book-appoinment'
import UserInfo from '../shared/user-info'
import useRole from '@/hooks/use-role'
import { Spinner } from '../ui/spinner'
import SearchInput from '../shared/search-input'
import formatDate from '@/helpers/formatDate'
import AppointmentFilters from './appointment-filters'

const tableColumns = [
  { header: 'Patient Info', key: 'name' },
  { header: 'Date', key: 'appointment_date' },
  { header: 'Time', key: 'time' },
  { header: 'Doctor', key: 'doctor' },
  { header: 'Status', key: 'status' },
  { header: 'Action', key: 'action' }
]

export default function AppointmentRecords({
  data,
  isPending,
  totalRecords,
  isDashboard = false,
  onSearch
}: {
  data: Appointment[]
  isPending: boolean
  totalRecords: number
  isDashboard?: boolean
  onSearch?: (query: string) => void
}) {
  const navigate = useNavigate()
  const { isPatient } = useRole()

  return (
    <CardWrapper>
      <div className='flex flex-col md:flex-row gap-3 items-center justify-between'>
        <div className='flex flex-wrap items-center gap-3 sm:gap-1.5 md:gap-3'>
          <div className='text-xl font-semibold'>{isDashboard ? 'Recent' : 'Appointment'} Record</div>
          <Badge variant='outline' className='bg-background'>
            {totalRecords} {totalRecords > 1 ? 'records' : 'record'}
          </Badge>
        </div>
        {isDashboard && (
          <Button variant='outline' onClick={() => navigate({ pathname: path.record.appointments })}>
            View All
          </Button>
        )}
        <SearchInput onSearch={onSearch} />
      </div>
      {!isDashboard && (
        <div className='flex flex-col md:flex-row items-center justify-between w-full gap-4'>
          <AppointmentFilters />
          {isPatient && <BookAppoinment />}
        </div>
      )}
      <Table className='bg-background'>
        <TableHeader>
          <TableRow>
            {tableColumns.map((column) => (
              <TableHead key={column.key}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {data && data.length === 0 && (
          <TableCaption className='text-center'>{isPending ? <Spinner /> : 'No data found'}</TableCaption>
        )}
        <TableBody>
          {data &&
            data.length > 0 &&
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <UserInfo
                    photoUrl={item.patient.photo_url}
                    firstName={item.patient.first_name}
                    lastName={item.patient.last_name}
                    description={item.patient.gender}
                  />
                </TableCell>
                <TableCell>{formatDate(item?.appointment_date)}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>
                  <UserInfo
                    photoUrl={item.doctor.photo_url}
                    firstName={item.doctor.first_name}
                    lastName={item.doctor.last_name}
                    description={item.doctor.specialization}
                  />
                </TableCell>
                <TableCell>
                  <AppointmentStatusIndicator status={item.status} />
                </TableCell>
                <TableCell>
                  <AppointmentAction id={item.id} appointment={item} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </CardWrapper>
  )
}
