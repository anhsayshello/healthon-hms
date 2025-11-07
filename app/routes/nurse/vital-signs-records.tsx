import type { Route } from './+types/vital-signs-records'
import CardWrapper from '@/components/shared/card-wrapper'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'
import UserInfo from '@/components/shared/user-info'
import useQueryParams from '@/hooks/useQueryParams'
import TableMetadata from '@/components/shared/table-metadata'
import AppPagination from '@/components/shared/app-pagination'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import formatDate from '@/helpers/formatDate'
import type { Appointment } from '@/types/appointment.type'
import useVitalSignsToday from '@/hooks/nurse/useVitalSignsToday'
import NewVitalSign from './new-vital-signs'
import { Badge } from '@/components/ui/badge'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Vital Signs' }, { name: 'description', content: 'Welcome to React Router!' }]
}

const tableColumns = [
  { header: 'Patient info', key: 'patient-info' },
  { header: 'Date of birth', key: 'dob' },
  { header: 'Doctor', key: 'doctor' },
  { header: 'Time', key: 'time' },
  { header: 'Type', key: 'type' },
  { header: 'Action', key: 'action' }
]

export default function VitalSignsRecords() {
  const { query, page, limit, handlePageChange, handleSearch } = useQueryParams()
  const { dataVitalSignsToday, currentPage, totalPages, totalRecords, isPending } = useVitalSignsToday({
    query,
    page,
    limit
  })

  return (
    <div className='grow h-full flex flex-col gap-4 lg:gap-6 justify-between'>
      <CardWrapper>
        <TableMetadata title='Today Vital Signs' totalRecords={totalRecords} onSearch={handleSearch} />
        <Table className='bg-background'>
          <TableHeader>
            <TableRow>
              {tableColumns.map((column) => (
                <TableHead key={column.key}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          {dataVitalSignsToday && dataVitalSignsToday.length === 0 && (
            <TableCaption className='text-center'>{isPending ? <Spinner /> : 'No data found'}</TableCaption>
          )}
          <TableBody>
            {dataVitalSignsToday &&
              dataVitalSignsToday.length > 0 &&
              dataVitalSignsToday.map((vitalSigns) => <VitalSignsRow key={vitalSigns.id} appointment={vitalSigns} />)}
          </TableBody>
        </Table>
      </CardWrapper>
      <AppPagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

function VitalSignsRow({ appointment }: { appointment: Appointment }) {
  const hasVitalSigns = appointment.medical.some((record) => record.vital_signs && record.vital_signs.length > 0)

  return (
    <Dialog>
      <TableRow>
        <DialogTrigger asChild>
          <TableCell className='cursor-pointer'>
            <UserInfo
              photoUrl={appointment.patient.photo_url}
              firstName={appointment.patient.first_name}
              lastName={appointment.patient.last_name}
              description={appointment.patient.gender}
            />
          </TableCell>
        </DialogTrigger>
        <TableCell>{formatDate(appointment.patient.date_of_birth)}</TableCell>
        <TableCell className='cursor-pointer'>
          <UserInfo
            photoUrl={appointment.doctor.photo_url}
            firstName={appointment.doctor.first_name}
            lastName={appointment.doctor.last_name}
            description={appointment.doctor.specialization}
          />
        </TableCell>
        <TableCell>{appointment.time}</TableCell>
        <TableCell>{appointment.type}</TableCell>
        <TableCell>
          {!hasVitalSigns ? (
            <NewVitalSign
              appointment_id={appointment.id}
              patientFirstName={appointment.patient.first_name}
              patientLastName={appointment.patient.last_name}
            />
          ) : (
            <Badge>Measured</Badge>
          )}
        </TableCell>
      </TableRow>
    </Dialog>
  )
}
