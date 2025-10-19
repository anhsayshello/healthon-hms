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
    enabled: Boolean(role),
    staleTime: Infinity
  })

  const dataPatient = useMemo(() => data?.data.data, [data])
  console.log(data)

  return (
    <div className='pt-3 pb-2 flex justify-center'>
      <UpdatePatient data={dataPatient} />
    </div>
  )
}
