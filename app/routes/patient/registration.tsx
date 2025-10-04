import type { Route } from '@/+types/patient/registration'
import { CreateNewPatient } from './new-patient'

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
