import React from 'react'
import { Button } from '../ui/button'
import path from '@/constants/path'
import { useNavigate } from 'react-router'
import { ChevronLeft } from 'lucide-react'

export default function HomeBackButton() {
  const navigate = useNavigate()

  return (
    <Button
      className='absolute md:top-8 top-4 left-4 md:left-8'
      variant='outline'
      onClick={() => navigate({ pathname: path.home })}
    >
      <ChevronLeft />
      <div>Back</div>
    </Button>
  )
}
