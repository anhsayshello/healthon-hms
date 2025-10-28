import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

export default function SearchInput({ onSearch }: { onSearch?: (query: string) => void }) {
  const [text, setText] = useState('')
  const [value] = useDebounce(text, 300)

  useEffect(() => {
    onSearch?.(value)
  }, [value])

  return (
    <InputGroup className='w-full sm:w-80 lg:w-90 bg-background'>
      <InputGroupInput placeholder='Search...' value={text} onChange={(e) => setText(e.target.value)} />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  )
}
