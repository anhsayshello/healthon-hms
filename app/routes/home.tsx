import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Healthon' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Home() {
  // const role = useAuthStore((state) => state.role)

  return <div className=''></div>
}
