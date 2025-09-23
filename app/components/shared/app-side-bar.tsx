import {
  ChevronUp,
  User2,
  OctagonAlert,
  LogOut,
  BadgeCheck,
  LayoutDashboard,
  UserIcon,
  UserRound,
  User,
  type LucideProps
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link, useLocation, useNavigate } from 'react-router'
import path from '@/constants/path'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import classNames from 'classnames'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Button } from '../ui/button'
import { useAuthStore } from '@/stores/useAuthStore'
import { authService } from '@/services/authService'
import { type ForwardRefExoticComponent, type RefAttributes } from 'react'

const SIDEBAR_LINKS = [
  {
    label: 'Menu',
    links: [
      {
        name: 'Dashboard',
        path: '/',
        access: 'ALL',
        icon: LayoutDashboard,
        tooltip: 'Dashboard'
      },
      {
        name: 'Profile',
        path: '/patient/info',
        access: ['patient'],
        icon: User,
        tooltip: 'profile'
      }
    ]
  },
  {
    label: 'Manage',
    links: [
      {
        name: 'Users',
        path: '/record/users',
        access: ['admin'],
        icon: UserIcon,
        tooltip: 'users'
      },
      {
        name: 'Doctors',
        path: '/record/doctors',
        access: ['admin', 'doctor'],
        icon: UserIcon,
        tooltip: 'doctors'
      },
      {
        name: 'Patient',
        path: '/record/patients',
        access: ['admin', 'doctor', 'nurse'],
        icon: UserRound,
        tooltip: 'patients'
      },
      {
        name: 'Staffs',
        path: '/record/staffs',
        access: ['admin', 'doctor'],
        icon: UserIcon,
        tooltip: 'staffs'
      }
    ]
  }
]

export default function AppSidebar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const profile = useAuthStore((state) => state.user)

  return (
    <Sidebar collapsible='icon' variant='floating'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Healthon</SidebarGroupLabel>
            <SidebarGroupAction>
              <HoverCard openDelay={200}>
                <HoverCardTrigger>
                  <OctagonAlert size={18} className='text-sidebar-foreground/70' />
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className='space-y-1'>
                    <h4 className='text-sm font-semibold'>@anhsayshello</h4>
                    <p className='text-[13px]'>...</p>
                    <div className='text-muted-foreground text-xs'>...</div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </SidebarGroupAction>
            <SidebarGroupContent />
          </SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_LINKS.map((el, index) => (
                <SidebarLink key={index} el={el} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {isAuthenticated ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    {profile?.photoURL ? (
                      <Avatar className='size-6'>
                        <AvatarImage src={profile?.photoURL} />
                        <AvatarFallback>{profile?.email}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <User2 />
                    )}
                    <p>{profile?.displayName}</p>
                    <ChevronUp className='ml-auto' />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='top' className='w-[--radix-popper-anchor-width]'>
                  <Link to=''>
                    <DropdownMenuItem className='flex items-end gap-2.5'>
                      <BadgeCheck />
                      <div>Account</div>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={authService.handleSignOut} className='flex items-end gap-2.5'>
                    <LogOut />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <Link to=''>
            <Button variant='outline' className='w-full py-2 cursor-pointer'>
              Login
            </Button>
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}

interface Props {
  label: string
  links: {
    name: string
    path: string
    access: string | string[]
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
    tooltip: string
  }[]
}

function SidebarLink({ el }: { el: Props }) {
  const { state, open } = useSidebar()
  const role = useAuthStore((state) => state.role)

  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <div>
      <div className='text-sm px-2 mb-2'>{open && <div>{el.label}</div>}</div>
      {el.links.map((item) => {
        return item.access.includes(role?.toLowerCase() ?? '') ? (
          <SidebarMenuItem key={item.name} className='my-1'>
            <SidebarMenuButton
              className='cursor-pointer'
              asChild
              onClick={() => navigate({ pathname: item.path })}
              isActive={item.path === '/' ? pathname === '/' : pathname.startsWith(item.path)}
            >
              <div>
                <Tooltip>
                  <TooltipTrigger>
                    <div className='text-foreground/30'>
                      <item.icon size={20} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    className={classNames('hidden', {
                      block: state === 'collapsed'
                    })}
                    side='right'
                  >
                    <p>{item.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
                <span className='text-foreground'>{item.name}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ) : (
          ''
        )
      })}
    </div>
  )
}
