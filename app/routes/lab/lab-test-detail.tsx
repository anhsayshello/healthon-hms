import EmptyLabTestData from '@/components/lab/empty-lab-test-data'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useIsMobile } from '@/hooks/use-mobile'
import type { LabTest } from '@/types/lab.type'

export default function LabTestDetail({ labTest }: { labTest: LabTest }) {
  const isMobile = useIsMobile()

  return (
    <DialogContent showCloseButton={isMobile}>
      {!labTest.result && <EmptyLabTestData status={labTest.status} />}

      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  )
}
