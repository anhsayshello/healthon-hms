import AppSidebar from '@/components/shared/app-side-bar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import path from '@/constants/path'
import { useAuthStore } from '@/stores/useAuthStore'
import { Navigate, Outlet } from 'react-router'

export default function RegistrationLayout() {
  const { isAuthenticated, role } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to={path.signIn} replace />
  }

  if (role) {
    return <Navigate to={path.dashboard} replace />
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
