import adminApi from '@/apis/admin.api'
import { useAuthStore } from '@/stores/useAuthStore'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'

export default function useFirebaseUsers() {
  const user = useAuthStore((state) => state.user)
  const { ref, inView } = useInView()

  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['admin', 'firebase-users', user?.uid],
    queryFn: ({ pageParam }) => adminApi.getFiresbaseUsers(pageParam),
    getNextPageParam: (lastPage) => lastPage.data.nextPageToken,
    placeholderData: keepPreviousData,
    initialPageParam: undefined as string | undefined
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const dataUsers = useMemo(() => data?.pages.flatMap((page) => page?.data?.data) ?? [], [data])

  return { dataUsers, isPending, isFetchingNextPage, hasNextPage, ref }
}
