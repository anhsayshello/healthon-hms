import type { Route } from './+types/home'
import { useAuthStore } from '@/stores/useAuthStore'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Healthon' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Home() {
  const role = useAuthStore((state) => state.role)

  return <div className=''></div>
}
