import type { Route } from './+types/firebase-user-management'
import UserInfo from '@/components/shared/user-info'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CardWrapper from '@/components/shared/card-wrapper'
import { Spinner } from '@/components/ui/spinner'
import { Copy } from 'lucide-react'
import type { FirebaseUserRecord } from '@/types/index.type'
import UserAction from './user-action'
import useFirebaseUsers from '@/hooks/useFirebaseUsers'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { toast } from 'sonner'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'User Management' }, { name: 'description', content: 'Welcome to React Router!' }]
}

const tableColumns = [
  { header: 'User uid', key: 'uid' },
  { header: 'User info', key: 'name' },
  { header: 'Role', key: 'role' },
  { header: 'Email', key: 'email' },
  { header: 'Email verified', key: 'email-verified' },
  { header: 'Access', key: 'disabled' },
  { header: 'Last login', key: 'last-login' },
  { header: 'Action', key: 'action' }
]

export default function FirebaseUserManagement() {
  const { dataUsers, isPending, isFetchingNextPage, hasNextPage, ref } = useFirebaseUsers()

  return (
    <CardWrapper>
      <div className='flex items-center gap-2'>
        <img
          className='aspect-square w-8'
          src='https://www.gstatic.com/mobilesdk/240501_mobilesdk/firebase_28dp.png'
          loading='lazy'
          alt=''
        />
        <div className='text-xl font-semibold'>Firebase User Management</div>
      </div>

      <Table className='bg-background'>
        <TableHeader>
          <TableRow>
            {tableColumns.map((column) => (
              <TableHead key={column.key}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {!dataUsers.length && (
          <TableCaption className='text-center'>{isPending ? <Spinner /> : 'No data found'}</TableCaption>
        )}

        <TableBody>{dataUsers && dataUsers.map((user) => <UserTableRow key={user.uid} data={user} />)}</TableBody>
      </Table>

      {dataUsers.length > 0 && (
        <div ref={ref} className='text-sm flex justify-center py-1'>
          {isFetchingNextPage ? (
            <div className='flex items-center gap-3'>
              <Spinner />
              <span>Loading more...</span>
            </div>
          ) : hasNextPage ? (
            'Load more'
          ) : (
            'Nothing more to load'
          )}
        </div>
      )}
    </CardWrapper>
  )
}

function UserTableRow({ data }: { data: FirebaseUserRecord }) {
  const role = data.customClaims?.role
  const disabled = data.disabled

  const formatLastSignIn = (time?: string) => {
    if (!time) return 'null'
    return new Date(time).toLocaleString()
  }

  const handleCopyUid = async () => {
    try {
      await navigator.clipboard.writeText(data.uid)
      toast.success('Copied uid to clipboard!')
    } catch (err) {
      toast.error('Failed to copy uid')
      console.error(err)
    }
  }

  return (
    <TableRow key={data.uid}>
      <TableCell>
        <div className='flex items-center gap-3'>
          <Tooltip>
            <TooltipTrigger>
              <Copy className='hover:text-muted-foreground' size={16} onClick={handleCopyUid} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy uid</p>
            </TooltipContent>
          </Tooltip>
          <span className='max-w-40 truncate text-[13px]'>{data?.uid}</span>
        </div>
      </TableCell>
      <TableCell>
        <UserInfo photoUrl={data?.photoURL} firstName={''} lastName={data?.displayName ?? ''} />
      </TableCell>
      <TableCell>{role ? <span className='capitalize'>{role?.toLowerCase()}</span> : <span>null</span>}</TableCell>
      <TableCell>{data.email}</TableCell>
      <TableCell>{data.emailVerified ? 'true' : 'false'}</TableCell>
      <TableCell>
        {disabled ? (
          <span className='text-destructive'>disabled</span>
        ) : (
          <span className='text-green-500'>enabled</span>
        )}
      </TableCell>
      <TableCell>{formatLastSignIn(data.metadata.lastSignInTime)}</TableCell>
      <TableCell>
        <UserAction uid={data.uid} email={data.email} role={role} disabled={disabled} />
      </TableCell>
    </TableRow>
  )
}
