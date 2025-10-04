import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CardWrapper from './card-wrapper'
import type { Appointment } from '@/types/appointment.type'
import formatDate from '@/helpers/formatDate'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'
import path from '@/constants/path'
import Avatar from './avatar'
import AppointmentStatusIndicator from './appointment-status-indicator'
import ViewAppointment from './view-appointment'

const columns = [
  { header: 'Info', key: 'name' },
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

export default function RecentAppointments({ data }: { data: Appointment[] }) {
  console.log(data)
  const navigate = useNavigate()

  return (
    <CardWrapper>
      <div className='flex items-center justify-between mb-4'>
        <div className='text-xl font-semibold'>Recent Record</div>
        <Button variant='outline' onClick={() => navigate({ pathname: path.record.appointments })}>
          View All
        </Button>
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
              <TableRow>
                <TableCell>
                  <Avatar url={item.patient.photo_url as string} name={item.patient.last_name} />
                </TableCell>
                <TableCell>{formatDate(item?.appointment_date)}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell className='flex items-center gap-1.5'>
                  <Avatar url={item.doctor.photo_url as string} name={item.doctor.last_name} />
                  <div>
                    <span>{item.doctor.first_name + ' ' + item.doctor.last_name}</span>
                    <div className='text-xs text-muted-foreground'>{item.doctor.specialization}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <AppointmentStatusIndicator status={item.status} />
                </TableCell>
                <TableCell>
                  <ViewAppointment id={item.id} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </CardWrapper>
  )
}
