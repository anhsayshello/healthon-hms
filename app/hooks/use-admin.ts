import { useAuthStore } from '@/stores/useAuthStore'
import { RoleEnum } from '@/types/role.type'

export default function useIsAdmin() {
  const role = useAuthStore((state) => state.role)
  const isAdmin = role === RoleEnum.ADMIN

  return isAdmin
}
