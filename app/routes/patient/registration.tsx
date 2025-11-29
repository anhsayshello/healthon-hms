import type { Route } from './+types/registration'
import { CreateNewPatient } from './patient-profile-form'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Patient Registration' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function PatientRegistration() {
  return (
    <div className='py-3 flex justify-center'>
      <CreateNewPatient />
    </div>
  )
}
