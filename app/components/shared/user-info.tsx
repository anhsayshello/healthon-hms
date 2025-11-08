import ProfileAvatar from './profile-avatar'

export default function UserInfo({
  photoUrl,
  firstName,
  lastName,
  email,
  description,
  size
}: {
  photoUrl?: string
  firstName?: string
  lastName: string
  email?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  return (
    <div className='flex items-center gap-2 text-sm'>
      <ProfileAvatar photoUrl={photoUrl} name={lastName} size={size} />
      <div>
        <span>{firstName + ' ' + lastName}</span>
        <div className='text-xs text-muted-foreground capitalize'>{description?.toLocaleLowerCase()}</div>
        {email && <div className='text-xs text-muted-foreground capitalize'>{email}</div>}
      </div>
    </div>
  )
}
