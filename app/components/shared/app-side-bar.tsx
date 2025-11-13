import { type LucideProps, Pin, X } from 'lucide-react'
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
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'
import { useAuthStore } from '@/stores/useAuthStore'
import { type ForwardRefExoticComponent, type RefAttributes } from 'react'
import { cn } from '@/lib/utils'
import { useSidebarPinnedStore } from '@/stores/useSidebarPinnedStore'
import { Toggle } from '@/components/ui/toggle'
import { SIDEBAR_LINKS } from '@/constants/sidebar-links'

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
