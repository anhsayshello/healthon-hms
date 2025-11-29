import type { Route } from './+types/profile'
import { UpdatePatient } from './patient-profile-form'
import usePatientProfile from '@/hooks/patient/usePatientProfile'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Profile' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Profile() {
  const { dataPatient } = usePatientProfile()

  return <div className='pt-3 pb-2 flex justify-center'>{dataPatient && <UpdatePatient data={dataPatient} />}</div>
}
