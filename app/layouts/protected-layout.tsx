import AppSidebar from '@/components/shared/app-side-bar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import path from '@/constants/path'
import { useAuthStore } from '@/stores/useAuthStore'
import { Navigate, Outlet, useLocation } from 'react-router'

export default function ProtectedLayout() {
  const { isAuthenticated, role } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={path.signIn} replace state={{ from: location }} />
  }

  if (!location.pathname.includes(role?.toLowerCase() ?? '')) {
    return <Navigate to={path.home} replace />
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='container flex flex-col h-screen'>
        <main>
          <SidebarTrigger />
        </main>
        <Outlet />
      </div>
    </SidebarProvider>
  )
}
