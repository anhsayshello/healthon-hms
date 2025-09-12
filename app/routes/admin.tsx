import type { Route } from './+types/admin'
import { useRequireAuth } from '@/hooks/useRequireAuth'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'admin' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Admin() {
  const { isAuthorized } = useRequireAuth('admin')

  if (!isAuthorized) {
    return <div>Redirecting...</div>
  }

  return <div>admin</div>
}
