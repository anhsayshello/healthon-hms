import { useSearchParams } from 'react-router'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import patientApi from '@/apis/patient.api'
import AppointmentRecords from '@/components/appointments/appointment-records'
import { omitBy, isUndefined } from 'lodash'
import { useAuthStore } from '@/stores/useAuthStore'
import doctorApi from '@/apis/doctor.api'
import useRole from '@/hooks/use-role'
import { useMemo } from 'react'
import AppPagination from '@/components/shared/app-pagination'

export default function Appointments() {
  const user = useAuthStore((state) => state.user)
  const [searchParams, setSearchParams] = useSearchParams()
  const { isPatient, isDoctor } = useRole()

  const query = searchParams.get('q') || ''
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'

  const { data: dataPatientAppointments } = useQuery({
    queryKey: ['patient', 'appointment', user?.uid, { query, page, limit }],
    queryFn: () => patientApi.getPatientAppointment({ query, page, limit }),
    placeholderData: keepPreviousData,
    enabled: isPatient
  })

  const { data: dataDoctorAppointments } = useQuery({
    queryKey: ['doctor', 'appointment', user?.uid, { query, page, limit }],
    queryFn: () => doctorApi.getDoctorAppointment({ query, page, limit }),
    placeholderData: keepPreviousData,
    enabled: isDoctor
  })

  const currentPage = useMemo(
    () => dataPatientAppointments?.data.currentPage ?? dataDoctorAppointments?.data.currentPage ?? 1,
    [dataPatientAppointments, dataDoctorAppointments]
  )
  const totalPages = useMemo(
    () => dataPatientAppointments?.data.totalPages ?? dataDoctorAppointments?.data.totalPages ?? 1,
    [dataPatientAppointments, dataDoctorAppointments]
  )
  const totalRecords = useMemo(
    () => dataPatientAppointments?.data.totalRecords ?? dataDoctorAppointments?.data.totalRecords,
    [dataPatientAppointments, dataDoctorAppointments]
  )
  const dataAppoinments = useMemo(
    () => dataPatientAppointments?.data.data ?? dataDoctorAppointments?.data.data,
    [dataPatientAppointments, dataDoctorAppointments]
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
          <AppointmentRecords onSearch={handleSearch} data={dataAppoinments} totalRecords={totalRecords} />
          <AppPagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
        </>
      )}
    </div>
  )
}
