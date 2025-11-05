import AppointmentRecords from '@/components/appointments/appointment-records'

import { useMemo } from 'react'
import AppPagination from '@/components/shared/app-pagination'
import useDoctorAppointments from '@/hooks/useDoctorAppointments'
import usePatientAppointments from '@/hooks/usePatientAppointments'
import useQueryParams from '@/hooks/useQueryParams'
import useAppointmentFilter from '@/hooks/useAppointmentFilter'
import useAppointments from '@/hooks/useAppointments'

export default function Appointments() {
  const { query, page, limit, handlePageChange, handleSearch } = useQueryParams()
  const { view, status } = useAppointmentFilter()

  const { dataGeneralAppointments, isGeneralPendingAppointments } = useAppointments({
    query,
    page,
    limit,
    view,
    status
  })
  const { dataPatientAppointments, isPendingPatientAppointments } = usePatientAppointments({
    query,
    page,
    limit,
    view,
    status
  })

  const { dataDoctorAppointments, isPendingDoctorAppointments } = useDoctorAppointments({
    query,
    page,
    limit,
    view,
    status
  })

  const isPending = isGeneralPendingAppointments || isPendingPatientAppointments || isPendingDoctorAppointments

  const currentPage = useMemo(
    () =>
      dataGeneralAppointments?.data.currentPage ??
      dataPatientAppointments?.data.currentPage ??
      dataDoctorAppointments?.data.currentPage ??
      1,
    [dataGeneralAppointments, dataPatientAppointments, dataDoctorAppointments]
  )
  const totalPages = useMemo(
    () =>
      dataGeneralAppointments?.data.totalPages ??
      dataPatientAppointments?.data.totalPages ??
      dataDoctorAppointments?.data.totalPages ??
      0,
    [dataGeneralAppointments, dataPatientAppointments, dataDoctorAppointments]
  )
  const totalRecords = useMemo(
    () =>
      dataGeneralAppointments?.data.totalRecords ??
      dataPatientAppointments?.data.totalRecords ??
      dataDoctorAppointments?.data.totalRecords ??
      0,
    [dataGeneralAppointments, dataPatientAppointments, dataDoctorAppointments]
  )
  const dataAppoinments = useMemo(
    () =>
      dataGeneralAppointments?.data.data ??
      dataPatientAppointments?.data.data ??
      dataDoctorAppointments?.data.data ??
      [],
    [dataGeneralAppointments, dataPatientAppointments, dataDoctorAppointments]
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
