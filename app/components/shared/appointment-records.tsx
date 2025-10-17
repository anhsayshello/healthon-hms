import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CardWrapper from './card-wrapper'
import type { Appointment } from '@/types/appointment.type'
import formatDate from '@/helpers/formatDate'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'
import path from '@/constants/path'
import AppointmentStatusIndicator from './appointment-status-indicator'
import ViewAppointment from './view-appointment'
import ProfileAvatar from './profile-avatar'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Check, EllipsisVertical, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Badge } from '../ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '../ui/separator'

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
  totalRecords,
  isDashboard = false,
  onSearch
}: {
  data: Appointment[]
  totalRecords?: number
  isDashboard?: boolean
  onSearch?: (query: string) => void
}) {
  console.log(data)
  console.log('re-render')
  const navigate = useNavigate()

  return (
    <CardWrapper>
      <div className='flex flex-col gap-3 sm:flex-row items-center justify-between mb-6'>
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
        {!isDashboard && <SearchInput onSearch={onSearch} />}
      </div>
      <Table className='bg-background'>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {data && data.length < 1 && <TableCaption className='text-center'>No data found</TableCaption>}
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
                    desc={item.patient.gender}
                  />
                </TableCell>
                <TableCell>{formatDate(item?.appointment_date)}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>
                  <UserInfo
                    photoUrl={item.doctor.photo_url}
                    firstName={item.doctor.first_name}
                    lastName={item.doctor.last_name}
                    desc={item.doctor.specialization}
                  />
                </TableCell>
                <TableCell>
                  <AppointmentStatusIndicator status={item.status} />
                </TableCell>
                <TableCell>
                  <AppointmentOptions id={item.id} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </CardWrapper>
  )
}

function AppointmentOptions({ id }: { id: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost'>
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='!p-1 w-36'>
        <div className='space-y-1 text-sm'>
          <div className='py-1 px-3'>Actions</div>
          <Separator />
          <ViewAppointment id={id} />
          <Separator />
          <Button variant='ghost' className='w-full !py-1 !justify-start'>
            <Check />
            <div>Approve</div>
          </Button>
          <Separator />
          <Button variant='ghost' className='w-full !py-1 !justify-start'>
            <X className='text-destructive' />
            <div className='text-destructive'>Cancel</div>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function UserInfo({
  photoUrl,
  firstName,
  lastName,
  desc
}: {
  photoUrl?: string
  firstName: string
  lastName: string
  desc: string
}) {
  return (
    <div className='flex items-center gap-1.5'>
      <ProfileAvatar photoUrl={photoUrl} name={lastName} />
      <div>
        <span>{firstName + ' ' + lastName}</span>
        <div className='text-xs text-muted-foreground capitalize'>{desc?.toLocaleLowerCase()}</div>
      </div>
    </div>
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
