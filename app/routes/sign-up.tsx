import type { Route } from './+types/sign-up'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sign up' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function SignUp() {
  return <div>Signup</div>
}
