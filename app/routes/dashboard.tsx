import type { Route } from './+types/dashboard'

import useRole from '@/hooks/use-role'
import DoctorDashboard from './doctor/dashboard'
import PatientDashboard from './patient/dashboard'
import AdminDashboard from './admin/dashboard'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Dashboard' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Dashboard() {
  const { isAdmin, isPatient, isDoctor } = useRole()

  return (
    <>
      {isAdmin && <AdminDashboard />}
      {isPatient && <PatientDashboard />}
      {isDoctor && <DoctorDashboard />}
    </>
  )
}
