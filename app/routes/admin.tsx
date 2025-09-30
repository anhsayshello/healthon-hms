import type { Route } from './+types/admin'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'admin' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Admin() {
  return <div>admin</div>
}
