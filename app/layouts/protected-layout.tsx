import AppSidebar from '@/components/shared/app-side-bar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import path from '@/constants/path'
import { useAuthStore } from '@/stores/useAuthStore'
import { Navigate, Outlet } from 'react-router'

export default function ProtectedLayout() {
  const { isAuthenticated, role } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to={path.signIn} replace />
  }

  if (!role) {
    return <Navigate to={path.patient.register} replace />
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='p-4 sm:px-6 w-full'>
        <main>
          <SidebarTrigger />
        </main>
        <div className='max-w-7xl mx-auto flex flex-col h-screen'>
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  )
}
