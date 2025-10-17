import AppSidebar from '@/components/shared/app-side-bar'
import Navbar from '@/components/shared/nav-bar'
import { SidebarProvider } from '@/components/ui/sidebar'
import path from '@/constants/path'
import { useAuthStore } from '@/stores/useAuthStore'
import { useSidebarPinnedStore } from '@/stores/useSidebarPinnedStore'
import { Navigate, Outlet } from 'react-router'

export default function RegistrationLayout() {
  const { isAuthenticated, role } = useAuthStore()
  const isPinned = useSidebarPinnedStore((state) => state.isPinned)

  if (!isAuthenticated) {
    return <Navigate to={path.signIn} replace />
  }

  if (role) {
    return <Navigate to={path.dashboard} replace />
  }

  return (
    <SidebarProvider defaultOpen={isPinned}>
      <AppSidebar />
      <div className='pt-2 w-full'>
        <Navbar />
        <div className='max-w-7xl mx-auto flex flex-col p-4 sm:px-6'>
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  )
}
