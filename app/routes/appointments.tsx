import AppointmentRecords from '@/components/appointments/appointment-records'

import { useMemo } from 'react'
import AppPagination from '@/components/shared/app-pagination'
import useDoctorAppointments from '@/hooks/useDoctorAppointments'
import usePatientAppointments from '@/hooks/usePatientAppointments'
import useAdminAppointments from '@/hooks/useAdminAppointment'
import useQueryParams from '@/hooks/useQueryParams'

export default function Appointments() {
  const { query, page, limit, handlePageChange, handleSearch } = useQueryParams()

  const { dataAdminAppointments, isPendingAdminAppointments } = useAdminAppointments(query, page, limit)
  const { dataPatientAppointments, isPendingPatientAppointments } = usePatientAppointments(query, page, limit)

  const { dataDoctorAppointments, isPendingDoctorAppointments } = useDoctorAppointments(query, page, limit)

  const isPending = isPendingAdminAppointments || isPendingPatientAppointments || isPendingDoctorAppointments

  const currentPage = useMemo(
    () =>
      dataAdminAppointments?.data.currentPage ??
      dataPatientAppointments?.data.currentPage ??
      dataDoctorAppointments?.data.currentPage ??
      1,
    [dataAdminAppointments, dataPatientAppointments, dataDoctorAppointments]
  )
  const totalPages = useMemo(
    () =>
      dataAdminAppointments?.data.totalPages ??
      dataPatientAppointments?.data.totalPages ??
      dataDoctorAppointments?.data.totalPages ??
      1,
    [dataAdminAppointments, dataPatientAppointments, dataDoctorAppointments]
  )
  const totalRecords = useMemo(
    () =>
      dataAdminAppointments?.data.totalRecords ??
      dataPatientAppointments?.data.totalRecords ??
      dataDoctorAppointments?.data.totalRecords ??
      0,
    [dataAdminAppointments, dataPatientAppointments, dataDoctorAppointments]
  )
  const dataAppoinments = useMemo(
    () =>
      dataAdminAppointments?.data.data ?? dataPatientAppointments?.data.data ?? dataDoctorAppointments?.data.data ?? [],
    [dataAdminAppointments, dataPatientAppointments, dataDoctorAppointments]
  )

  return (
    <div className='grow h-full flex flex-col gap-4 lg:gap-6 justify-between'>
      {dataAppoinments && (
        <>
          <AppointmentRecords
            onSearch={handleSearch}
            data={dataAppoinments}
            isPending={isPending}
            totalRecords={totalRecords}
          />
          <AppPagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
        </>
      )}
    </div>
  )
}
