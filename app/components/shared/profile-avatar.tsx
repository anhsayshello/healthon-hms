import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { User2 } from 'lucide-react'

export default function ProfileAvatar({
  photoUrl,
  name,
  size = 'sm'
}: {
  photoUrl?: string
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  return (
    <Avatar
      className={cn({
        'w-8.5 h-8.5': size === 'sm',
        'w-9.5 h-9.5': size === 'md',
        'w-10.5 h-10.5': size === 'lg',
        'w-12 h-12': size === 'xl'
      })}
    >
      <AvatarImage src={photoUrl} />
      {name ? (
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      ) : (
        <AvatarFallback>
          <User2 />
        </AvatarFallback>
      )}
    </Avatar>
  )
}

export const getInitials = (name: string) => {
  const arr = name.trim().split(' ')
  return arr[arr.length - 1].slice(0, 1).toUpperCase()
}
