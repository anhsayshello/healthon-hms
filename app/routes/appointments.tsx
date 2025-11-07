import type { Route } from './+types/appointments'

import AppointmentRecords from '@/components/appointments/appointment-records'
import AppPagination from '@/components/shared/app-pagination'
import useDoctorAppointments from '@/hooks/doctor/useDoctorAppointments'
import usePatientAppointments from '@/hooks/patient/usePatientAppointments'
import useQueryParams from '@/hooks/useQueryParams'
import useAppointmentFilter from '@/hooks/appointment/useAppointmentFilter'
import useAppointments from '@/hooks/appointment/useAppointments'
import { useAuthStore } from '@/stores/useAuthStore'
import { RoleEnum } from '@/types/role.type'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Appointments' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Appointments() {
  const { query, page, limit, handlePageChange, handleSearch } = useQueryParams()
  const { view, status } = useAppointmentFilter()
  const role = useAuthStore((state) => state.role)

  const params = { query, page, limit, view, status }
  const generalQuery = useAppointments(params)
  const patientQuery = usePatientAppointments(params)
  const doctorQuery = useDoctorAppointments(params)

  const activeQuery = role === RoleEnum.DOCTOR ? doctorQuery : role === RoleEnum.PATIENT ? patientQuery : generalQuery

  const dataAppointments = activeQuery.data?.data.data ?? []
  const currentPage = activeQuery.data?.data.currentPage ?? 1
  const totalPages = activeQuery.data?.data.totalPages ?? 0
  const totalRecords = activeQuery.data?.data.totalRecords ?? 0
  const isPending = activeQuery.isPending

  return (
    <div className='grow h-full flex flex-col gap-4 lg:gap-6 justify-between'>
      {dataAppointments && (
        <>
          <AppointmentRecords
            onSearch={handleSearch}
            data={dataAppointments}
            isPending={isPending}
            totalRecords={totalRecords}
          />
          <AppPagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
        </>
      )}
    </div>
  )
}
