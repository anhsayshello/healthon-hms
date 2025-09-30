import type { Route } from '@/+types/patient/registration'
import { CreatePatient, UpdatePatient } from './new-patient'
import { useAuthStore } from '@/stores/useAuthStore'
import { useQuery } from '@tanstack/react-query'
import patientApi from '@/apis/patient.api'
import { useMemo } from 'react'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Patient Registration' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function PatientRegistration() {
  const { role, user } = useAuthStore()

  const { data } = useQuery({
    queryKey: ['patient', 'information'],
    queryFn: () => patientApi.getPatientInformation(),
    enabled: Boolean(role)
  })

  const dataPatient = useMemo(() => data?.data.data, [data])

  return (
    <div className='lg:py-6 lg:px-4 flex justify-center'>
      {!role && !user ? <CreatePatient /> : <UpdatePatient data={dataPatient} />}
    </div>
  )
}
