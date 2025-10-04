import { Avatar as AvatarWrapper, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'

export default function Avatar({ url, name }: { url?: string; name: string }) {
  const getInitials = (name: string) => {
    const arr = name.trim().split(' ')
    return arr[arr.length - 1].slice(0, 1).toUpperCase()
  }

  const colors = useMemo(
    () => [
      'bg-sky-600',
      'bg-green-600',
      'bg-amber-600',
      'bg-purple-600',
      'bg-cyan-600',
      'bg-rose-600',
      'bg-indigo-600',
      'bg-pink-600',
      'bg-emerald-600',
      'bg-lime-600',
      'bg-teal-600',
      'bg-violet-600'
    ],
    []
  )

  const bgColor = useMemo(() => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }, [name, colors])

  console.log(url)

  return (
    <AvatarWrapper>
      <AvatarImage src={url} />
      <AvatarFallback className={cn(bgColor, 'text-primary-foreground')}>{getInitials(name)}</AvatarFallback>
    </AvatarWrapper>
  )
}
