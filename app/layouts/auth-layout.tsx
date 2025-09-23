import { useAuthStore } from '@/stores/useAuthStore'
import { Navigate, Outlet } from 'react-router'

export default function AuthLayout() {
  const { isAuthenticated, role } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to={`${role}`} replace />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}
