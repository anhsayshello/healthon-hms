import path from '@/constants/path'
import type { Route } from './+types/home'
import { Link, useNavigate } from 'react-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { useEffect } from 'react'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Home() {
  const { isAuthenticated, role } = useAuthStore()
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated && role) {
      navigate(`/${role}`)
    }
  }, [isAuthenticated, role])

  return <Link to={path.signIn}>Sign in</Link>
}
