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
  type LucideProps,
  ListOrdered,
  SquareActivity,
  Receipt,
  Users,
  Pill,
  Bell,
  Logs,
  Settings,
  SquareLibrary
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Button } from '../ui/button'
import { useAuthStore } from '@/stores/useAuthStore'
import { useMemo, type ForwardRefExoticComponent, type RefAttributes } from 'react'
import useSignOut from '@/hooks/useSignOut'
import { cn } from '@/lib/utils'
import { RoleEnum } from '@/types/role.type'
import Spinner from './spinner'

const ALL_ROLE = [
  RoleEnum.ADMIN,
  RoleEnum.DOCTOR,
  RoleEnum.PATIENT,
  RoleEnum.NURSE,
  RoleEnum.CASHIER,
  RoleEnum.LAB_TECHNICIAN
]

const SIDEBAR_LINKS = [
  {
    label: 'Menu',
    links: [
      {
        name: 'Dashboard',
        path: path.dashboard,
        access: ALL_ROLE,
        icon: LayoutDashboard,
        tooltip: 'dashboard'
      },
      {
        name: 'Profile',
        path: path.patient.profile,
        access: [RoleEnum.PATIENT],
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
        path: path.admin.users,
        access: [RoleEnum.ADMIN],
        icon: UserIcon,
        tooltip: 'users'
      },
      {
        name: 'Doctors',
        path: path.record.doctors,
        access: [RoleEnum.ADMIN],
        icon: UserIcon,
        tooltip: 'doctors'
      },
      {
        name: 'Patients',
        path: path.record.patients,
        access: [RoleEnum.ADMIN, RoleEnum.DOCTOR, RoleEnum.NURSE],
        icon: UserRound,
        tooltip: 'patients'
      },
      {
        name: 'Staffs',
        path: path.record.staffs,
        access: [RoleEnum.ADMIN, RoleEnum.DOCTOR],
        icon: UserRound,
        tooltip: 'staffs'
      },
      {
        name: 'Appointments',
        path: path.record.appointments,
        access: [RoleEnum.ADMIN, RoleEnum.DOCTOR, RoleEnum.NURSE, RoleEnum.PATIENT],
        icon: ListOrdered,
        tooltip: 'appointments'
      },
      {
        name: 'Medical Records',
        path: path.record.medicalRecords,
        access: [RoleEnum.ADMIN, RoleEnum.DOCTOR, RoleEnum.NURSE],
        icon: SquareActivity,
        tooltip: 'medical records'
      },
      {
        name: 'Billing Overview',
        path: path.record.billingOverview,
        access: [RoleEnum.ADMIN, RoleEnum.DOCTOR],
        icon: Receipt,
        tooltip: 'billing overview'
      },
      {
        name: 'Patient Management',
        path: path.nurse.patientManagement,
        access: [RoleEnum.NURSE],
        icon: Users,
        tooltip: 'patient management'
      },
      {
        name: 'Administer Medications',
        path: path.nurse.administerMedications,
        access: [RoleEnum.ADMIN, RoleEnum.DOCTOR, RoleEnum.NURSE],
        icon: Pill,
        tooltip: 'adminster medications'
      },
      {
        name: 'Records',
        path: path.patient.records,
        access: [RoleEnum.PATIENT],
        icon: SquareLibrary,
        tooltip: 'records'
      },
      {
        name: 'Prescriptions',
        path: path.patient.prescriptions,
        access: [RoleEnum.PATIENT],
        icon: Pill,
        tooltip: 'prescriptions'
      },
      {
        name: 'Billing',
        path: path.patient.billing,
        access: [RoleEnum.PATIENT],
        icon: Receipt,
        tooltip: 'billing'
      }
    ]
  },
  {
    label: 'System',
    links: [
      {
        name: 'Notifications',
        path: path.notifications,
        access: ALL_ROLE,
        icon: Bell,
        tooltip: 'notifications'
      },
      {
        name: 'Audit Logs',
        path: path.admin.auditLogs,
        access: [RoleEnum.ADMIN],
        icon: Logs,
        tooltip: 'audit logs'
      },
      {
        name: 'Settings',
        path: path.admin.settings,
        access: [RoleEnum.ADMIN],
        icon: Settings,
        tooltip: 'settings'
      }
    ]
  }
]

export default function AppSidebar() {
  const { handleSignOut } = useSignOut()
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
              {/* {Array.from({ length: 5 }).map((_, index) => (
                <SidebarMenuItem className='h-8' key={index}>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              ))} */}
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
                    {profile?.photo_url ? (
                      <Avatar className='size-6'>
                        <AvatarImage src={profile?.photo_url} />
                        <AvatarFallback>{profile?.email}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <User2 />
                    )}
                    <p className='space-x-1'>
                      <span>{profile?.first_name}</span>
                      <span>{profile?.last_name}</span>
                    </p>
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
                  <DropdownMenuItem onClick={handleSignOut} className='flex items-end gap-2.5'>
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

interface Link {
  name: string
  path: string
  access: string[]
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  tooltip: string
}
interface Props {
  label: string
  links: Link[]
}

function SidebarLink({ el }: { el: Props }) {
  const { state, open } = useSidebar()
  const role = useAuthStore((state) => state.role)

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const hasAccessibleLinks = useMemo(() => {
    if (!role) return false
    return el.links.some((link) => link.access.includes(role))
  }, [el.links, role])

  return (
    <div>
      {open && hasAccessibleLinks && <div className='text-sm px-2 mb-2'>{el.label}</div>}
      {el.links.map((item) => {
        if (!role) return
        return item.access.includes(role) ? (
          <SidebarMenuItem key={item.name} className='my-2'>
            <SidebarMenuButton
              className='cursor-pointer'
              asChild
              onClick={() => navigate({ pathname: item.path })}
              isActive={item.path === '/' ? pathname === '/' : pathname.startsWith(item.path)}
            >
              <div>
                <Tooltip>
                  <TooltipTrigger>
                    <div className='text-muted-foreground'>
                      <item.icon size={17} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    className={cn('hidden', {
                      block: state === 'collapsed'
                    })}
                    side='right'
                    sideOffset={10}
                  >
                    <p className='capitalize'>{item.tooltip}</p>
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
