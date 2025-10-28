import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CardWrapper from '../shared/card-wrapper'
import { type Appointment } from '@/types/appointment.type'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'
import path from '@/constants/path'
import AppointmentStatusIndicator from './appointment-status-indicator'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Badge } from '../ui/badge'
import AppointmentAction from './appointment-action'
import BookAppoinment from './book-appoinment'
import UserInfo from '../shared/user-info'
import useRole from '@/hooks/use-role'
import { format } from 'date-fns'
import { Spinner } from '../ui/spinner'

const columns = [
  { header: 'Patient Info', key: 'name' },
  {
    header: 'Date',
    key: 'appointment_date'
  },
  {
    header: 'Time',
    key: 'time'
  },
  {
    header: 'Doctor',
    key: 'doctor'
  },
  {
    header: 'Status',
    key: 'status'
  },
  {
    header: 'Action',
    key: 'action'
  }
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
  totalRecords?: number
  isDashboard?: boolean
  onSearch?: (query: string) => void
}) {
  const navigate = useNavigate()
  const { isPatient } = useRole()

  return (
    <CardWrapper>
      <div className='flex gap-3 items-center justify-between'>
        <div className='flex flex-wrap items-center gap-3 sm:gap-1.5 md:gap-3'>
          <div className='text-xl font-semibold'>{isDashboard ? 'Recent' : 'Appointment'} Record</div>
          {totalRecords && (
            <Badge variant='outline' className='bg-background'>
              {totalRecords} {totalRecords > 1 ? 'records' : 'record'}
            </Badge>
          )}
        </div>
        {isDashboard && (
          <Button variant='outline' onClick={() => navigate({ pathname: path.record.appointments })}>
            View All
          </Button>
        )}
        {!isDashboard && (
          <div className='flex flex-wrap items-center gap-3'>
            <SearchInput onSearch={onSearch} />
            {isPatient && <BookAppoinment />}
          </div>
        )}
      </div>
      <Table className='bg-background'>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
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
                <TableCell>{format(new Date(item?.appointment_date), 'yyyy-MM-dd')}</TableCell>
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

function SearchInput({ onSearch }: { onSearch?: (query: string) => void }) {
  const [text, setText] = useState('')
  const [value] = useDebounce(text, 300)

  useEffect(() => {
    onSearch?.(value)
  }, [value])

  return (
    <InputGroup className='w-full sm:w-80 lg:w-90 bg-background'>
      <InputGroupInput placeholder='Search...' value={text} onChange={(e) => setText(e.target.value)} />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  )
}
