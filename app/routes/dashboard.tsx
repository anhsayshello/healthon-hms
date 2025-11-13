import type { Route } from './+types/dashboard'

import useRole from '@/hooks/useRole'
import DoctorDashboard from './doctor/doctor-dashboard'
import PatientDashboard from './patient/patient-dashboard'
import StaffDashboard from './staff/staff-dashboard'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Dashboard' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Dashboard() {
  const { isStaff, isPatient, isDoctor } = useRole()

  return (
    <>
      {isStaff && <StaffDashboard />}
      {isPatient && <PatientDashboard />}
      {isDoctor && <DoctorDashboard />}
    </>
  )
}
