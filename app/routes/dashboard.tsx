import type { Route } from './+types/dashboard'

import useRole from '@/hooks/use-role'
import DoctorDashboard from './doctor/dashboard'
import PatientDashboard from './patient/dashboard'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Dashboard' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Dashboard() {
  const { isPatient, isDoctor } = useRole()

  return (
    <>
      {isPatient && <PatientDashboard />}
      {isDoctor && <DoctorDashboard />}
    </>
  )
}
