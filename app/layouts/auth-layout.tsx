import path from '@/constants/path'
import { useAuthStore } from '@/stores/useAuthStore'
import { Navigate, Outlet } from 'react-router'

export default function AuthLayout() {
  const { isAuthenticated, role } = useAuthStore()

  if (isAuthenticated) {
    return role ? <Navigate to={path.dashboard} replace /> : <Navigate to={path.patient.register} replace />
  }

  return (
    <div className='bg-background'>
      <Outlet />
    </div>
  )
}
