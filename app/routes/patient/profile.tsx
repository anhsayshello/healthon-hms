import type { Route } from '@/+types/patient/profile'
import { useAuthStore } from '@/stores/useAuthStore'
import { useQuery } from '@tanstack/react-query'
import patientApi from '@/apis/patient.api'
import { useMemo } from 'react'
import { UpdatePatient } from './new-patient'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Profile' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Profile() {
  const role = useAuthStore((state) => state.role)
  console.log(role)
  const { data } = useQuery({
    queryKey: ['patient', 'information'],
    queryFn: () => patientApi.getPatientInformation(),
    enabled: Boolean(role)
  })

  const dataPatient = useMemo(() => data?.data.user, [data])
  console.log(data)

  return (
    <div className='lg:py-6 lg:px-4 flex justify-center'>
      <UpdatePatient data={dataPatient} />
    </div>
  )
}
