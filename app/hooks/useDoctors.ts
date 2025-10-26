import doctorApi from '@/apis/doctor.api'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export default function useDoctors() {
  const { data, isPending } = useQuery({
    queryKey: ['doctors'],
    queryFn: () => doctorApi.getAllDoctors()
  })
  const dataDoctors = useMemo(() => data?.data.data, [data])

  return { dataDoctors, isPending }
}
