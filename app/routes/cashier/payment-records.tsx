import type { Route } from './+types/payment-records'
import CardWrapper from '@/components/shared/card-wrapper'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'
import useQueryParams from '@/hooks/useQueryParams'
import TableMetadata from '@/components/shared/table-metadata'
import AppPagination from '@/components/shared/app-pagination'
import type { Appointment } from '@/types/appointment.type'
import InitializePayment from '../../components/cashier/initialize-payment'
import useAppointmentsForBilling from '@/hooks/cashier/useAppointmentsForPayment'
import UserInfo from '@/components/shared/user-info'
import { useMemo } from 'react'
import formatDate from '@/helpers/formatDate'
import AppointmentStatusIndicator from '@/components/appointments/appointment-status-indicator'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import path from '@/constants/path'
import { ArrowRight } from 'lucide-react'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Payment Records' }, { name: 'description', content: 'Welcome to React Router!' }]
}

const tableColumns = [
  { header: 'ID', key: 'id' },
  { header: 'Patient info', key: 'patient-info' },
  { header: 'Type', key: 'type' },
  { header: 'Lab test qty', key: 'lab-test-quantity' },
  { header: 'Prescription qty', key: 'prescription-quantity' },
  { header: 'Status', key: 'status' },
  { header: 'Date', key: 'appointment-date' },
  { header: 'Action', key: 'action' }
]

export default function PaymentRecords() {
  const { query, page, limit, handlePageChange, handleSearch } = useQueryParams()
  const { dataAppointmentsForPayment, currentPage, totalPages, totalRecords, isPending } = useAppointmentsForBilling({
    query,
    page,
    limit
  })

  return (
    <div className='grow h-full flex flex-col gap-4 lg:gap-6 justify-between'>
      <CardWrapper>
        <TableMetadata title='Appointments for Payment' totalRecords={totalRecords} onSearch={handleSearch} />
        <Table className='bg-background'>
          <TableHeader>
            <TableRow>
              {tableColumns.map((column) => (
                <TableHead key={column.key}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          {dataAppointmentsForPayment && dataAppointmentsForPayment.length === 0 && (
            <TableCaption className='text-center'>{isPending ? <Spinner /> : 'No data found'}</TableCaption>
          )}
          <TableBody>
            {dataAppointmentsForPayment &&
              dataAppointmentsForPayment.length > 0 &&
              dataAppointmentsForPayment.map((appointment) => (
                <BillingRow key={appointment.id} appointment={appointment} />
              ))}
          </TableBody>
        </Table>
      </CardWrapper>
      <AppPagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

function BillingRow({ appointment }: { appointment: Appointment }) {
  console.log(appointment)
  const navigate = useNavigate()
  const totalLabTests = useMemo(
    () => appointment.medical_records.reduce((acc, record) => acc + (record.lab_tests?.length ?? 0), 0),
    [appointment.medical_records]
  )
  const totalPrescriptions = useMemo(
    () => appointment.medical_records.reduce((acc, record) => acc + (record.prescriptions?.length ?? 0), 0),
    [appointment.medical_records]
  )

  const hasPayment = appointment?.payment?.id

  return (
    <TableRow>
      <TableCell>{appointment.id}</TableCell>
      <TableCell>
        <UserInfo
          photoUrl={appointment.patient.photo_url}
          firstName={appointment.patient.first_name}
          lastName={appointment.patient.last_name}
          description={appointment.patient.gender}
        />
      </TableCell>
      <TableCell>{appointment.type}</TableCell>
      <TableCell>{totalLabTests}</TableCell>
      <TableCell>{totalPrescriptions}</TableCell>
      <TableCell>
        <AppointmentStatusIndicator status={appointment.status} />
      </TableCell>
      <TableCell>{formatDate(appointment.appointment_date)}</TableCell>
      <TableCell>
        {!hasPayment ? (
          <InitializePayment appointment_id={appointment.id} />
        ) : (
          <Button onClick={() => navigate({ pathname: `${path.cashier.payments}/${appointment.payment.id}` })}>
            <ArrowRight />
            Continue Payment
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}
