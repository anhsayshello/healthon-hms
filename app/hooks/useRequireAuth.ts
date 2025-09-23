import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore } from '@/stores/useAuthStore'
import type { Role } from '@/types/role.type'

export function useRequireAuth(requiredRole?: Role) {
  const navigate = useNavigate()
  const { isAuthenticated, role: userRole } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in', { replace: true })
      return
    }

    if (requiredRole && userRole !== requiredRole) {
      const redirectTo = userRole ? `/${userRole}` : '/'
      navigate(redirectTo, { replace: true })
    }
  }, [isAuthenticated, userRole, requiredRole, navigate])

  return {
    isAuthorized: isAuthenticated && (!requiredRole || userRole === requiredRole),
    isAuthenticated,
    userRole
  }
}
