import type { Route } from '@/+types/patient/registration'
import { CreatePatient } from './new-patient'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Patient Registration' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function PatientRegistration() {
  return (
    <div className='lg:py-6 lg:px-4 flex justify-center'>
      <CreatePatient />
    </div>
  )
}
