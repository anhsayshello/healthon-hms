import {
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
  SquareLibrary,
  Pin,
  X
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { Link, useLocation, useNavigate } from 'react-router'
import path from '@/constants/path'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'
import { useAuthStore } from '@/stores/useAuthStore'
import { type ForwardRefExoticComponent, type RefAttributes } from 'react'
import { cn } from '@/lib/utils'
import { RoleEnum } from '@/types/role.type'
import { useSidebarPinnedStore } from '@/stores/useSidebarPinnedStore'
import { Toggle } from '@/components/ui/toggle'

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
  const role = useAuthStore((state) => state.role)
  const { isPinned, setIsPinned } = useSidebarPinnedStore()
  const { isMobile, setOpen, setOpenMobile } = useSidebar()

  if (!role) return null

  return (
    <Sidebar
      collapsible='icon'
      variant='floating'
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => !isPinned && setOpen(false)}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Healthon</SidebarGroupLabel>

            <SidebarGroupAction asChild>
              <div>
                {!isMobile && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Toggle
                        aria-label='Toggle pin sidebar'
                        pressed={isPinned}
                        onPressedChange={setIsPinned}
                        size='sm'
                        className='data-[state=on]:[&_svg]:fill-yellow-500 data-[state=on]:[&_svg]:stroke-yellow-500'
                      >
                        <Pin />
                      </Toggle>
                    </TooltipTrigger>
                    <TooltipContent side='right' sideOffset={2}>
                      <p>{isPinned ? 'Unpin Sidebar' : 'Pin Sidebar'}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {isMobile && (
                  <Button className='z-10' variant='ghost' onClick={() => setOpenMobile(false)}>
                    <X />
                  </Button>
                )}
              </div>
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
  const { state, open, openMobile } = useSidebar()
  const role = useAuthStore((state) => state.role)

  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <div>
      {(open || openMobile) && <div className='text-sm px-2 mb-2'>{el.label}</div>}
      {el.links.map((item) => {
        if (!role) return null
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
