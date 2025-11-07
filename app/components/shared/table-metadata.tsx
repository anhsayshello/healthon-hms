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
    <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
      <div className='shrink-0 flex items-center gap-4 sm:gap-1.5 md:gap-4'>
        <div className='text-xl font-semibold'>{title}</div>
        <Badge variant='outline' className='bg-background'>
          {totalRecords} {totalRecords > 1 ? 'records' : 'record'}
        </Badge>
      </div>
      <div className='flex flex-col sm:flex-row items-center justify-center md:justify-end w-full gap-4'>
        <SearchInput onSearch={onSearch} />
        {children && <div className='flex flex-wrap items-center gap-4'>{children}</div>}
      </div>
    </div>
  )
}
