import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { LabTestStatusEnum, type LabTestStatus } from '@/types/lab.type'
import { Clock, FlaskConicalOff, TestTubeDiagonal, XCircle } from 'lucide-react'

export default function EmptyLabTestData({ status }: { status: LabTestStatus }) {
  const getEmptyStateContent = () => {
    switch (status) {
      case LabTestStatusEnum.PENDING:
        return {
          icon: Clock,
          title: 'Lab Request Pending',
          description: 'Doctor has requested this test. Waiting for a lab technician to start the test.'
        }
      case LabTestStatusEnum.IN_PROGRESS:
        return {
          icon: TestTubeDiagonal,
          title: 'Lab Test In Progress',
          description: 'The lab technician is currently performing the test. Results will be available once finished.'
        }
      case LabTestStatusEnum.CANCELLED:
        return {
          icon: XCircle,
          title: 'Lab Test Cancelled',
          description: 'This lab test request has been cancelled and will not be processed.'
        }
      default:
        return {
          icon: FlaskConicalOff,
          title: 'No Lab Test',
          description: 'Lab test data not found'
        }
    }
  }

  const { icon: Icon, title, description } = getEmptyStateContent()

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
