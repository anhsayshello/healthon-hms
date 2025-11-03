import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'
import path from '@/constants/path'
import { CalendarCheck2, CalendarClock, CalendarDays, CalendarX2 } from 'lucide-react'
import StatCard from '@/components/appointments/stat-card'
import StatSummary from '@/components/appointments/stat-summary'
import AppointmentChart from '@/components/appointments/appointment-chart'
import type { Appointment, AppointmentsChart, AppointmentStatusCount } from '@/types/appointment.type'
import CardWrapper from '@/components/shared/card-wrapper'
import usePatientStatistic from '@/hooks/usePatientStatistic'
import AvailableDoctor from '@/components/appointments/available-doctor'
import type { Doctor } from '@/types/doctor.type'
import AppointmentRecords from '@/components/appointments/appointment-records'

export default function PatientDashboard() {
  const navigate = useNavigate()
  const {
    dataPatient,
    appointmentsCounts,
    totalAppointments,
    totalRecords,
    monthlyData,
    last5Records,
    availableDoctors,
    isPending
  } = usePatientStatistic()

  const cardData = useMemo(
    () => [
      {
        title: 'Appointments',
        value: totalAppointments ?? 0,
        icon: CalendarDays,
        className: 'bg-blue-600/15',
        iconClassName: 'bg-blue-600/25 text-blue-600',
        note: 'total appointments'
      },
      {
        title: 'Cancelled',
        value: appointmentsCounts?.CANCELLED ?? 0,
        icon: CalendarX2,
        className: 'bg-rose-600/15',
        iconClassName: 'bg-rose-600/25 text-rose-600',
        note: 'cancelled appointments'
      },
      {
        title: 'Pending',
        value: (appointmentsCounts?.PENDING ?? 0) + (appointmentsCounts?.SCHEDULED ?? 0),
        icon: CalendarClock,
        className: 'bg-yellow-600/15',
        iconClassName: 'bg-yellow-600/25 text-yellow-600',
        note: 'pending appointments'
      },
      {
        title: 'Completed',
        value: appointmentsCounts?.COMPLETED ?? 0,
        icon: CalendarCheck2,
        className: 'bg-emerald-600/15',
        iconClassName: 'bg-emerald-600/25 text-emerald-600',
        note: 'completed appointments'
      }
    ],
    [totalAppointments, appointmentsCounts]
  )

  return (
    <div className='space-y-6'>
      <CardWrapper>
        <div className='flex items-center justify-between'>
          <div className='text-lg xl:text-2xl font-semibold'>
            Welcome {dataPatient?.first_name + ' ' + dataPatient?.last_name}
          </div>
          <div className='space-x-2 space-y-2'>
            <Button variant='outline' size='sm' className='text-sm'>
              {new Date().getFullYear()}
            </Button>
            <Button size='sm' onClick={() => navigate({ pathname: path.patient.profile })} className='cursor-pointer'>
              View Profile
            </Button>
          </div>
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
          {cardData.map((item, id) => (
            <StatCard key={id} {...item} />
          ))}
        </div>
      </CardWrapper>
      <div className='flex flex-col xl:flex-row gap-6'>
        {/* Left */}
        <div className='w-full xl:basis-7/10 space-y-6'>
          <AppointmentChart chartData={monthlyData as AppointmentsChart} />
          <div>
            <AppointmentRecords
              totalRecords={totalRecords ?? 0}
              isPending={isPending}
              isDashboard
              data={last5Records as Appointment[]}
            />
          </div>
        </div>
        {/* Right */}
        <div className='w-full xl:basis-3/10'>
          <div className='space-y-6'>
            <StatSummary data={appointmentsCounts as AppointmentStatusCount} total={totalAppointments ?? 0} />
            <AvailableDoctor data={availableDoctors as Doctor[]} />
          </div>
        </div>
      </div>
    </div>
  )
}
