import AppSidebar from '@/components/shared/app-side-bar'
import Navbar from '@/components/shared/app-navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import path from '@/constants/path'
import { useAuthStore } from '@/stores/useAuthStore'
import { useSidebarPinnedStore } from '@/stores/useSidebarPinnedStore'
import { Navigate, Outlet } from 'react-router'

export default function ProtectedLayout() {
  const { isAuthenticated, role } = useAuthStore()
  const isPinned = useSidebarPinnedStore((state) => state.isPinned)

  if (!isAuthenticated) {
    return <Navigate to={path.signIn} replace />
  }

  if (!role) {
    return <Navigate to={path.patient.register} replace />
  }

  return (
    <SidebarProvider defaultOpen={isPinned}>
      <AppSidebar />
      <div className='w-full min-h-screen flex flex-col bg-background'>
        <Navbar />
        <div className='max-w-7xl grow w-full mx-auto px-4 py-2 sm:px-6'>
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  )
}
