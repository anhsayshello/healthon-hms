import staffApi from '@/apis/staff.api'
import { useQuery } from '@tanstack/react-query'

export default function useStaffById(uid: string) {
  const { data, isPending } = useQuery({
    queryKey: ['staff', uid],
    queryFn: () => staffApi.getStaffById(uid),
    enabled: !!uid
  })

  const dataStaff = data?.data

  return { dataStaff, isPending }
}
