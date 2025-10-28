import { useSearchParams } from 'react-router'
import AppointmentRecords from '@/components/appointments/appointment-records'
import { omitBy, isUndefined } from 'lodash'

import { useMemo } from 'react'
import AppPagination from '@/components/shared/app-pagination'
import useDoctorAppointments from '@/hooks/useDoctorAppointments'
import usePatientAppointments from '@/hooks/usePatientAppointments'
import useAdminAppointments from '@/hooks/useAdminAppointment'

export default function Appointments() {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') || ''
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'

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
      dataDoctorAppointments?.data.totalRecords,
    [dataAdminAppointments, dataPatientAppointments, dataDoctorAppointments]
  )
  const dataAppoinments = useMemo(
    () =>
      dataAdminAppointments?.data.data ?? dataPatientAppointments?.data.data ?? dataDoctorAppointments?.data.data ?? [],
    [dataAdminAppointments, dataPatientAppointments, dataDoctorAppointments]
  )

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) })
  }

  const handleSearch = (query: string) => {
    setSearchParams(omitBy({ q: query, page: '1' }, (q) => isUndefined(q) || q === ''))
  }

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
