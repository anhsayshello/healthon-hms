import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LabTestStatusEnum, type LabTest } from '@/types/lab.type'
import { useState } from 'react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import LabTestStatusIndicator from '@/components/lab/lab-status-indicator'
import { formatDateTime } from '@/helpers/formatDateTime'
import type { Patient } from '@/types/patient.type'
import CancelLabTestRequest from '@/components/lab/cancel-lab-test-request'
import LabTestDetail from '@/components/lab/lab-test-detail'
import useRole from '@/hooks/useRole'

export default function LabTestCard({ labTest, patient }: { labTest: LabTest; patient: Patient }) {
  const { isDoctor } = useRole()
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className='cursor-pointer hover:shadow-md transition-shadow'>
          <CardHeader>
            <CardTitle>{labTest.service?.service_name}</CardTitle>
            <CardAction>
              <LabTestStatusIndicator status={labTest.status} />
            </CardAction>
          </CardHeader>
          <CardContent className='flex items-center justify-between'>
            <p className='text-sm text-muted-foreground'>Created at: {formatDateTime(labTest.created_at)}</p>
            {isDoctor && labTest.status === LabTestStatusEnum.PENDING && (
              <div onClick={(e) => e.stopPropagation()}>
                <CancelLabTestRequest
                  labTestId={labTest.id}
                  labTestServiceName={labTest.service?.service_name as string}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </DialogTrigger>
      <LabTestDetail patient={patient} labTest={labTest} />
    </Dialog>
  )
}
