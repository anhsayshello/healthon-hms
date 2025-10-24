import { useEffect } from 'react'
import { ChevronDownIcon, Sun, Moon, LogOut, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useThemeStore } from '@/stores/useThemeStore'
import { useSidebar } from '../ui/sidebar'
import { useIsMobile } from '@/hooks/use-mobile'
import { useAuthStore } from '@/stores/useAuthStore'
import { useUserCredential } from '@/stores/useUserCredentialStore'
import ProfileAvatar from './profile-avatar'
import useSignOut from '@/hooks/useSignOut'
import { useNavigate } from 'react-router'
import path from '@/constants/path'

// User Menu Component
const UserMenu = () => {
  const { handleSignOut } = useSignOut()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const role = useAuthStore((state) => state.role)
  const userCred = useUserCredential((state) => state.userCred)
  const isMobile = useIsMobile()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 px-2 py-0 hover:bg-accent hover:text-accent-foreground'>
          <ProfileAvatar photoUrl={user?.photo_url} name={user?.last_name ?? userCred?.lastName ?? ''} size='sm' />
          <ChevronDownIcon className='h-3 w-3 ml-1' />
          <span className='sr-only'>User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' alignOffset={8} sideOffset={isMobile ? 12 : 14} className='w-56'>
        <DropdownMenuLabel>
          <div className='space-y-2'>
            <p className='text-sm font-medium leading-none'>
              {user?.first_name && user?.last_name
                ? `${user.first_name} ${user.last_name}`
                : userCred?.firstName && userCred?.lastName
                  ? `${userCred.firstName} ${userCred.lastName}`
                  : 'Unnamed'}
            </p>
            <p className='text-[13px] leading-none text-muted-foreground'>{user?.email ?? userCred?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate({ pathname: path.dashboard })}>Dashboard</DropdownMenuItem>
        {role && <DropdownMenuItem onClick={() => {}}>Profile</DropdownMenuItem>}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className='flex items-end gap-2.5'>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function Navbar() {
  const isMobile = useIsMobile()
  const { theme, setTheme } = useThemeStore()

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const { setOpenMobile } = useSidebar()

  return (
    <header className={cn('sticky top-0 z-50 w-full bg-background pt-2 px-4 xl:px-6 [&_*]:no-underline')}>
      <div className='container mx-auto flex h-14 lg:h-[60px] max-w-7xl items-center justify-between gap-4'>
        {/* Left side */}
        <div className='flex flex-1 items-center gap-2'>
          {/* Mobile menu trigger */}
          {isMobile && (
            <Button variant='ghost' size='icon' onClick={() => setOpenMobile(true)}>
              <Menu />
            </Button>
          )}
          <div className='flex items-center gap-6'>
            {/* Logo */}
            <button
              onClick={(e) => e.preventDefault()}
              className='flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer'
            >
              <div className='text-2xl'>{}</div>
              <span className='hidden font-bold text-xl sm:inline-block'>shadcn.io</span>
            </button>
            {/* Desktop navigation - icon only */}
          </div>
        </div>
        {/* Right side */}
        <div className='flex items-center gap-2'>
          {/* Theme toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon'>
                <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
                <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
                <span className='sr-only'>Toggle</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* User menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
