import type { Route } from './+types/medical-records'
import CardWrapper from '@/components/shared/card-wrapper'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'
import UserInfo from '@/components/shared/user-info'
import useQueryParams from '@/hooks/useQueryParams'
import TableMetadata from '@/components/shared/table-metadata'
import AppPagination from '@/components/shared/app-pagination'
import { Button } from '@/components/ui/button'
import { Swords } from 'lucide-react'
import { useNavigate } from 'react-router'
import path from '@/constants/path'
import useMedicalRecords from '@/hooks/medical-record/useMedicalRecords'
import useTodayMedicalRecords from '@/hooks/medical-record/useTodayMedicalRecords'
import { useAuthStore } from '@/stores/useAuthStore'
import { RoleEnum } from '@/types/role.type'
import type { MedicalRecord } from '@/types/medical.type'
import { formatDateTime } from '@/helpers/formatDateTime'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Medical Record' }, { name: 'description', content: 'Welcome to React Router!' }]
}

const tableColumns = [
  { header: 'Id', key: 'id' },
  { header: 'Patient info', key: 'patient-info' },
  { header: 'Date & Time', key: 'date-time' },
  { header: 'Diagnosis', key: 'diagnosis' },
  { header: 'Lab Test', key: 'lab-test' },
  { header: 'Action', key: 'action' }
]

export default function MedicalRecords() {
  const role = useAuthStore((state) => state.role)
  const { query, page, limit, handlePageChange, handleSearch } = useQueryParams()
  const params = {
    query,
    page,
    limit
  }
  const generalQuery = useMedicalRecords(params)
  const doctorQuery = useTodayMedicalRecords(params)

  const activeQuery = role === RoleEnum.DOCTOR ? doctorQuery : generalQuery

  const dataMedicalRecords = activeQuery.data?.data.data ?? []
  const currentPage = activeQuery.data?.data.currentPage ?? 1
  const totalPages = activeQuery.data?.data.totalPages ?? 0
  const totalRecords = activeQuery.data?.data.totalRecords ?? 0
  const isPending = activeQuery.isPending

  return (
    <div className='grow h-full flex flex-col gap-4 lg:gap-6 justify-between'>
      <CardWrapper>
        <TableMetadata title='Medical Record' totalRecords={totalRecords} onSearch={handleSearch} />
        <Table className='bg-background'>
          <TableHeader>
            <TableRow>
              {tableColumns.map((column) => (
                <TableHead key={column.key}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          {dataMedicalRecords && dataMedicalRecords.length === 0 && (
            <TableCaption className='text-center'>{isPending ? <Spinner /> : 'No data found'}</TableCaption>
          )}
          <TableBody>
            {dataMedicalRecords &&
              dataMedicalRecords.length > 0 &&
              dataMedicalRecords.map((medicalRecord) => (
                <MedicalRow key={medicalRecord.id} medicalRecord={medicalRecord} />
              ))}
          </TableBody>
        </Table>
      </CardWrapper>
      <AppPagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

function MedicalRow({ medicalRecord }: { medicalRecord: MedicalRecord }) {
  const navigate = useNavigate()

  return (
    <TableRow>
      <TableCell>{medicalRecord.id}</TableCell>
      <TableCell>
        <UserInfo
          photoUrl={medicalRecord?.patient?.photo_url}
          firstName={medicalRecord?.patient?.first_name ?? ''}
          lastName={medicalRecord?.patient?.last_name ?? ''}
          description={medicalRecord?.patient?.gender}
        />
      </TableCell>
      <TableCell>{formatDateTime(medicalRecord.created_at)}</TableCell>
      <TableCell>
        <Button onClick={() => navigate({ pathname: `${path.record.medicalRecords}/${medicalRecord.id}` })}>
          <Swords />
          <span>Examine</span>
        </Button>
      </TableCell>
    </TableRow>
  )
}
