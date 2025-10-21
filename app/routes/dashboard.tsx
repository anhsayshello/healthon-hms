import useRole from '@/hooks/use-role'
import type { Route } from './+types/dashboard'
import PatientDashboard from './patient/dashboard'
import DoctorDashboard from './patient/dashboard'

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
