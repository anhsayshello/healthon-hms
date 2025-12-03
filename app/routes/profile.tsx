import useUserDetail from '@/hooks/admin/useUserDetail'
import type { Route } from './+types/profile'
import ProfileCard from '@/components/features/react-bits/ProfileCard'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Profile' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Profile() {
  const { data } = useUserDetail()

  return (
    <div className='flex items-center justify-center'>
      <ProfileCard
        name={`${data?.data.first_name} ${data?.data.last_name}`}
        title={data?.data.email}
        handle='javicodes'
        status='Online'
        contactText='Contact Me'
        avatarUrl={data?.data.photo_url as string}
        showUserInfo={false}
        enableTilt={false}
        behindGlowEnabled={false}
        enableMobileTilt={false}
        onContactClick={() => console.log('Contact clicked')}
      />
    </div>
  )
}
