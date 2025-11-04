import { useSearchParams } from 'react-router'
import { omitBy, isUndefined } from 'lodash'

export default function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') || ''
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '12'

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('page', String(newPage))
    setSearchParams(newParams)
  }

  const handleSearch = (query: string) => {
    setSearchParams(omitBy({ q: query, page: '1' }, (q) => isUndefined(q) || q === ''))
  }

  return { query, page, limit, handlePageChange, handleSearch }
}
