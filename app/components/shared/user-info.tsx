import { cn } from '@/lib/utils'
import ProfileAvatar from './profile-avatar'

export default function UserInfo({
  photoUrl,
  firstName,
  lastName,
  email,
  description,
  size,
  uid
}: {
  photoUrl?: string
  firstName?: string
  lastName: string
  email?: string
  uid?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  return (
    <div className={cn('flex items-center gap-2', { 'gap-3': size === 'lg', 'gap-4': size === 'xl' })}>
      <ProfileAvatar photoUrl={photoUrl} name={lastName} size={size} />
      <div>
        <span className={cn('text-sm', { 'text-[15px]': size === 'xl' })}>{firstName + ' ' + lastName}</span>
        <div className={cn('text-xs text-muted-foreground capitalize', { 'text-[13px]': size === 'xl' })}>
          <div>{description?.toLocaleLowerCase()}</div>
          {email && <div>{email}</div>}
          {uid && <div>ID: {uid}</div>}
        </div>
      </div>
    </div>
  )
}
