import type { ReactNode } from 'react'
import { Badge } from '../ui/badge'
import SearchInput from './search-input'

interface Props {
  title: string
  totalRecords: number
  onSearch?: (query: string) => void
  children?: ReactNode
}

export default function TableMetadata({ title, totalRecords, onSearch, children }: Props) {
  return (
    <div className='flex gap-3 items-center justify-between'>
      <div className='flex flex-wrap items-center gap-3 sm:gap-1.5 md:gap-3'>
        <div className='text-xl font-semibold'>{title} Record</div>
        <Badge variant='outline' className='bg-background'>
          {totalRecords} {totalRecords > 1 ? 'records' : 'record'}
        </Badge>
      </div>

      <div className='flex flex-wrap items-center gap-3'>
        <SearchInput onSearch={onSearch} />
        {children}
      </div>
    </div>
  )
}
