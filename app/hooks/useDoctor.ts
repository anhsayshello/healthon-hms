import doctorApi from '@/apis/doctor.api'
import { useQuery } from '@tanstack/react-query'

export default function useDoctor(uid: string) {
  const { data, isPending } = useQuery({
    queryKey: ['doctor', uid],
    queryFn: () => doctorApi.getDoctorById(uid),
    enabled: !!uid
  })

  const dataDoctor = data?.data.data

  return { dataDoctor, isPending }
}
