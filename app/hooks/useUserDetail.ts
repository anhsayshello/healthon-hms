import adminApi from '@/apis/admin.api'
import type { Doctor } from '@/types/doctor.type'
import type { FirebaseUserRecord } from '@/types/index.type'
import type { Patient } from '@/types/patient.type'
import { RoleEnum } from '@/types/role.type'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export default function useUserDetail(data: FirebaseUserRecord, enabled: boolean) {
  const { data: dataUser, isPending } = useQuery({
    queryKey: ['admin', 'user-detail', data.uid],
    queryFn: () => adminApi.getUserById(data.uid),
    enabled
  })

  const user = useMemo(() => dataUser?.data.data, [dataUser])
  const role = useMemo(() => data.customClaims?.role, [data])
  const disabled = useMemo(() => data.disabled, [data])

  const isPatient = useMemo(() => role === RoleEnum.PATIENT && user, [role, user])
  const isDoctor = useMemo(() => role === RoleEnum.DOCTOR && user, [role, user])
  const patient = useMemo(() => (isPatient ? (user as Patient) : null), [isPatient, user])
  const doctor = useMemo(() => (isDoctor ? (user as Doctor) : null), [isDoctor, user])
  const description = useMemo(() => patient?.gender || doctor?.specialization || '', [patient, doctor])

  return {
    isPending,
    user,
    role,
    disabled,
    patient,
    doctor,
    description
  }
}
