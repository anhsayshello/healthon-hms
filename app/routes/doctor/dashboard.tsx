import type { Route } from './+types/doctor/dashboard'
import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'
import path from '@/constants/path'
import { BriefcaseBusiness, BriefcaseMedical, User, User2 } from 'lucide-react'
import StatCard from '@/components/appointments/stat-card'
import StatSummary from '@/components/appointments/stat-summary'
import AppointmentChart from '@/components/appointments/appointment-chart'
import type { Appointment, AppointmentsChart, AppointmentStatusCount } from '@/types/appointment.type'
import CardWrapper from '@/components/shared/card-wrapper'
import AvailableDoctor from '@/components/appointments/available-doctor'
import type { Doctor } from '@/types/doctor.type'
import AppointmentRecords from '@/components/appointments/appointment-records'
import useDoctorStatistic from '@/hooks/useDoctorStatistic'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Dashboard' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function PatientDashboard() {
  const navigate = useNavigate()
  const {
    totalPatients,
    totalNurses,
    appointmentsCounts,
    totalAppointments,
    monthlyData,
    last5Records,
    availableDoctors
  } = useDoctorStatistic()

  const cardData = useMemo(
    () => [
      {
        title: 'Patients',
        value: totalPatients ?? 0,
        icon: User,
        className: 'bg-blue-600/15',
        iconClassName: 'bg-blue-600/25 text-blue-600',
        note: 'total patients',
        link: path.patient.records
      },
      {
        title: 'Nurses',
        value: totalNurses ?? 0,
        icon: User2,
        className: 'bg-rose-600/15',
        iconClassName: 'bg-rose-600/25 text-rose-600',
        note: 'total nurses',
        link: path.record.staffs
      },
      {
        title: 'Appointments',
        value: totalAppointments ?? 0,
        icon: BriefcaseBusiness,
        className: 'bg-yellow-600/15',
        iconClassName: 'bg-yellow-600/25 text-yellow-600',
        note: 'Total appointments',
        link: path.record.appointments
      },
      {
        title: 'Consultation',
        value: appointmentsCounts?.COMPLETED ?? 0,
        icon: BriefcaseMedical,
        className: 'bg-emerald-600/15',
        iconClassName: 'bg-emerald-600/25 text-emerald-600',
        note: 'Total consultations',
        link: path.record.appointments
      }
    ],
    [totalPatients, totalNurses, totalAppointments, appointmentsCounts]
  )

  return (
    <div className='flex flex-col xl:flex-row gap-6'>
      {/* Left */}
      <div className='w-full xl:basis-7/10 space-y-6'>
        <CardWrapper>
          <div className='flex items-center justify-between'>
            <div className='text-lg xl:text-2xl font-semibold'>Welcome Dr.</div>
            <div className='space-x-2 space-y-2'>
              <Button variant='outline' size='sm' className='text-sm'>
                {new Date().getFullYear()}
              </Button>
              <Button size='sm' onClick={() => navigate({ pathname: path.patient.profile })} className='cursor-pointer'>
                View Profile
              </Button>
            </div>
          </div>
          <div className='w-full flex flex-wrap gap-5 xl:gap-6'>
            {cardData.map((el, id) => (
              <StatCard key={id} {...el} />
            ))}
          </div>
        </CardWrapper>
        <AppointmentChart chartData={monthlyData as AppointmentsChart} />
        <div>
          <AppointmentRecords isDashboard data={last5Records as Appointment[]} />
        </div>
      </div>
      {/* Right */}
      <div className='w-full xl:basis-3/10'>
        <div className='space-y-6'>
          <StatSummary data={appointmentsCounts as AppointmentStatusCount} total={totalAppointments} />
          <AvailableDoctor data={availableDoctors as Doctor[]} />
        </div>
      </div>
    </div>
  )
}
