import type { Route } from './+types/patient-records'
import CardWrapper from '@/components/shared/card-wrapper'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'
import UserInfo from '@/components/shared/user-info'
import useQueryParams from '@/hooks/useQueryParams'
import TableMetadata from '@/components/shared/table-metadata'
import AppPagination from '@/components/shared/app-pagination'
import usePatients from '@/hooks/patient/usePatients'
import UserAction from '../components/admin/user-action'
import type { Patient } from '@/types/patient.type'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import UserDetailsDialog from '../components/shared/user-details-dialog'
import { RoleEnum } from '@/types/role.type'
import { PatientBasicInfo, PatientEmergencyContact, PatientMedicalInfo } from '@/components/shared/patient-information'
import formatDate from '@/helpers/formatDate'
import useRole from '@/hooks/use-role'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Patient Table' }, { name: 'description', content: 'Welcome to React Router!' }]
}

const tableColumns = [
  { header: 'Patient info', key: 'patient-info' },
  { header: 'Date of birth', key: 'dob' },
  { header: 'Email', key: 'email' },
  { header: 'Phone', key: 'phone' },
  { header: 'Address', key: 'address' },
  { header: 'Action', key: 'action' }
]

export default function PatientRecords() {
  const { isAdmin, isNurse, isDoctor } = useRole()
  const { query, page, limit, handlePageChange, handleSearch } = useQueryParams()
  const { dataPatients, currentPage, totalPages, totalRecords, isPending } = usePatients({ query, page, limit })

  return (
    <div className='grow h-full flex flex-col gap-4 lg:gap-6 justify-between'>
      <CardWrapper>
        <TableMetadata title='Patient Record' totalRecords={totalRecords} onSearch={handleSearch} />
        <Table className='bg-background'>
          <TableHeader>
            <TableRow>
              {isAdmin && tableColumns.map((column) => <TableHead key={column.key}>{column.header}</TableHead>)}
              {(isDoctor || isNurse) &&
                tableColumns.map((column) => {
                  return column.key !== 'action' && <TableHead key={column.key}>{column.header}</TableHead>
                })}
            </TableRow>
          </TableHeader>
          {dataPatients && dataPatients.length === 0 && (
            <TableCaption className='text-center'>{isPending ? <Spinner /> : 'No data found'}</TableCaption>
          )}
          <TableBody>
            {dataPatients &&
              dataPatients.length > 0 &&
              dataPatients.map((patient) => <PatientRow key={patient.uid} patient={patient} />)}
          </TableBody>
        </Table>
      </CardWrapper>
      <AppPagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

function PatientRow({ patient }: { patient: Patient }) {
  const { isAdmin } = useRole()

  return (
    <Dialog>
      <TableRow>
        <DialogTrigger asChild>
          <TableCell className='cursor-pointer'>
            <UserInfo
              photoUrl={patient.photo_url}
              firstName={patient.first_name}
              lastName={patient.last_name}
              description={patient.gender}
            />
          </TableCell>
        </DialogTrigger>
        <TableCell>{formatDate(patient.date_of_birth)}</TableCell>
        <TableCell>{patient.email}</TableCell>
        <TableCell>{patient.phone}</TableCell>
        <TableCell>{patient.address}</TableCell>
        {isAdmin && (
          <TableCell>
            <UserAction uid={patient.uid} email={patient.email} />
          </TableCell>
        )}
      </TableRow>
      <UserDetailsDialog user={patient} role={RoleEnum.PATIENT}>
        <PatientBasicInfo patient={patient} />
        <div>
          <h4 className='font-semibold mb-3 text-lg'>Emergency Contact</h4>
          <PatientEmergencyContact patient={patient} />
        </div>
        <div>
          <h4 className='font-semibold mb-3 text-lg'>Medical Information</h4>
          <PatientMedicalInfo patient={patient} />
        </div>
      </UserDetailsDialog>
    </Dialog>
  )
}
