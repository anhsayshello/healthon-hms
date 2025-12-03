import EmptyLabTestData from '@/components/features/lab/empty-lab-test-data'
import LabTestStatusIndicator from '@/components/features/lab/lab-status-indicator'
import Timestamps from '@/components/shared/time-stamps'
import UserInfo from '@/components/shared/user-info'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import formatDate from '@/helpers/formatDate'
import { useIsMobile } from '@/hooks/use-mobile'
import type { LabTest } from '@/types/lab.type'
import { Calendar, Cross, TestTubeDiagonal, User } from 'lucide-react'
import { Item, ItemContent, ItemTitle } from '@/components/ui/item'
import type { Patient } from '@/types/patient.type'

export default function LabTestDetail({ labTest, patient }: { labTest: LabTest; patient: Patient }) {
  const isMobile = useIsMobile()

  return (
    <DialogContent showCloseButton={isMobile} className='w-full md:max-w-xl max-h-[96vh] md:max-h-[90vh]'>
      {!labTest.result && <EmptyLabTestData status={labTest.status} />}

      {labTest.result && (
        <div className='space-y-4 sm:space-y-5 text-sm'>
          <DialogHeader>
            <div className='flex items-start justify-between'>
              <div className='space-y-0.5'>
                <DialogTitle>Lab Test Results</DialogTitle>
                <DialogDescription>Test ID: #{labTest.id}</DialogDescription>
              </div>
              <LabTestStatusIndicator status={labTest.status} />
            </div>
          </DialogHeader>
          <Separator />
          <div className='space-y-3'>
            <h3 className='text-sm font-semibold flex items-center gap-2'>
              <TestTubeDiagonal size={18} />
              Technician
            </h3>
            <UserInfo
              firstName={labTest.technician?.first_name}
              lastName={labTest.technician?.last_name ?? ''}
              photoUrl={labTest.technician?.photo_url}
              description={labTest.technician?.department}
              uid={labTest.technician?.uid}
              size='lg'
            />
          </div>
          <Separator />
          <div className='space-y-3'>
            <h3 className='text-sm font-semibold flex items-center gap-2'>
              <User size={18} />
              Patient
            </h3>
            <UserInfo
              firstName={patient?.first_name}
              lastName={patient?.last_name ?? ''}
              photoUrl={patient?.photo_url}
              description={patient?.gender}
              uid={patient?.uid}
              size='lg'
            />
          </div>
          <Separator />
          <div className='space-y-3'>
            <div className='flex items-center'>
              <div className='shrink-0 w-24 flex items-center gap-2'>
                <Calendar size={16} className='text-muted-foreground' />
                <span className='text-muted-foreground'>Test Date:</span>
              </div>
              <span className='font-medium grow'>{formatDate(labTest.test_date)}</span>
            </div>
            <div className='flex items-center'>
              <div className='shrink-0 w-24 flex items-center gap-2'>
                <Cross size={16} className='text-muted-foreground' />
                <span className='text-muted-foreground'>Service:</span>
              </div>
              <span className='font-medium grow'>{labTest.service?.service_name}</span>
            </div>
          </div>
          <Item variant='outline'>
            <ItemContent className='max-h-30 overflow-y-auto'>
              <ItemTitle>Test Result</ItemTitle>
              <div className='wrap-anywhere'>{labTest.result}</div>
            </ItemContent>
          </Item>
          <Separator />
          <Timestamps createdAt={labTest.created_at} updatedAt={labTest.updated_at} />
        </div>
      )}
    </DialogContent>
  )
}
