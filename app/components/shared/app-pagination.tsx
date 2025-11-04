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

export default function AppPagination({
  currentPage,
  totalPages,
  handlePageChange
}: {
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
}) {
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
            className={
              currentPage >= totalPages || totalPages === 0 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
