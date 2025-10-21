import { useSearchParams } from 'react-router'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { useCallback, useMemo } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import patientApi from '@/apis/patient.api'
import AppointmentRecords from '@/components/appointments/appointment-records'
import { omitBy, isUndefined } from 'lodash'
import { useAuthStore } from '@/stores/useAuthStore'

export default function Appointments() {
  const user = useAuthStore((state) => state.user)
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') || ''
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'

  const { data } = useQuery({
    queryKey: ['patient', 'appointment', user?.uid, { query, page, limit }],
    queryFn: () => patientApi.getPatientAppointment({ query, page, limit }),
    placeholderData: keepPreviousData
  })

  const currentPage = useMemo(() => data?.data.currentPage || 1, [data])
  const totalPages = useMemo(() => data?.data.totalPages || 1, [data])
  const totalRecords = useMemo(() => data?.data.totalRecords, [data])
  const dataAppoinments = useMemo(() => data?.data.data, [data])

  const generatePageNumbers = useCallback((currentPage: number, totalPages: number) => {
    const pages = []
    const maxvisiblePages = 3

    if (totalPages <= maxvisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3)
      } else if (currentPage >= totalPages - 1) {
        pages.push(totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1)
      }
    }
    return pages
  }, [])

  const pageNumbers = useMemo(
    () => generatePageNumbers(currentPage, totalPages),
    [currentPage, totalPages, generatePageNumbers]
  )

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) })
  }

  const handleSearch = (query: string) => {
    setSearchParams(omitBy({ q: query, page: '1' }, (q) => isUndefined(q) || q === ''))
  }

  return (
    <div className='grow h-full flex flex-col gap-4 lg:gap-6 justify-between'>
      {dataAppoinments && (
        <>
          <AppointmentRecords onSearch={handleSearch} data={dataAppoinments} totalRecords={totalRecords} />
          <AppointmentsPagination
            handlePageChange={handlePageChange}
            pageNumbers={pageNumbers}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  )
}

function AppointmentsPagination({
  currentPage,
  totalPages,
  handlePageChange,
  pageNumbers
}: {
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
  pageNumbers: number[]
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>

        {pageNumbers[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(1)} className='cursor-pointer'>
                1
              </PaginationLink>
            </PaginationItem>
            {pageNumbers[0] > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {pageNumbers.map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              onClick={() => handlePageChange(pageNum)}
              isActive={pageNum === currentPage}
              className='cursor-pointer'
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(totalPages)} className='cursor-pointer'>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
