import { useAuthStore } from '@/stores/useAuthStore'
import { RoleEnum } from '@/types/role.type'

export default function useRole() {
  const role = useAuthStore((state) => state.role)

  const isAdmin = role === RoleEnum.ADMIN
  const isDoctor = role === RoleEnum.DOCTOR
  const isPatient = role === RoleEnum.PATIENT
  const isNurse = role === RoleEnum.NURSE
  const isLabTechnician = role === RoleEnum.LAB_TECHNICIAN
  const isCashier = role === RoleEnum.CASHIER

  return { role, isAdmin, isDoctor, isPatient, isNurse, isLabTechnician, isCashier }
}
