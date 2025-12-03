import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Prescription } from '@/types/medical-record.type'
import { Calendar, Pill, Clock, Timer, FileText, Package } from 'lucide-react'
import formatDate from '@/helpers/formatDate'
import DeletePrescription from './delete-prescription'

export default function PrescriptionCard({
  prescription,
  isModify
}: {
  prescription: Prescription
  isModify: boolean
}) {
  return (
    <Card className='hover:shadow-md transition-shadow'>
      <CardHeader className='gap-1'>
        <CardTitle className='flex items-center gap-2 overflow-hidden'>
          <Pill size={14} />
          <h3 className='font-semibold leading-tight truncate capitalize'>
            {prescription.medication?.medication_name}
          </h3>
        </CardTitle>
        <CardDescription className='shrink-0 flex gap-1.5 text-xs text-muted-foreground'>
          <Calendar size={12} />
          <span>{formatDate(prescription.created_at)}</span>
        </CardDescription>
        {isModify && (
          <CardAction className='space-x-3 space-y-2'>
            <DeletePrescription id={prescription.id} />
          </CardAction>
        )}
      </CardHeader>

      <CardContent className='pt-0'>
        <div className='space-y-3'>
          <div className='grid grid-cols-2 gap-3'>
            <div className='space-y-1'>
              <div className='flex gap-1.5 text-muted-foreground'>
                <Package size={14} />
                <span className='text-xs font-medium uppercase tracking-wide'>Quantity</span>
              </div>
              <p className='text-sm font-medium pl-5'>{prescription.quantity}</p>
            </div>

            <div className='space-y-1'>
              <div className='flex gap-1.5 text-muted-foreground'>
                <Package size={14} />
                <span className='text-xs font-medium uppercase tracking-wide'>Dosage</span>
              </div>
              <p className='text-sm font-medium pl-5'>{prescription.dosage}</p>
            </div>

            <div className='space-y-1'>
              <div className='flex gap-1.5 text-muted-foreground'>
                <Clock size={14} />
                <span className='text-xs font-medium uppercase tracking-wide'>Frequency</span>
              </div>
              <p className='text-sm font-medium pl-5'>{prescription.frequency}</p>
            </div>

            <div className='space-y-1'>
              <div className='flex gap-1.5 text-muted-foreground'>
                <Timer size={14} />
                <span className='text-xs font-medium uppercase tracking-wide'>Duration</span>
              </div>
              <p className='text-sm font-medium pl-5'>{prescription.duration}</p>
            </div>
          </div>

          {prescription.instructions && (
            <div className='space-y-1 pt-3 border-t'>
              <div className='flex gap-1.5 text-muted-foreground'>
                <FileText size={14} />
                <span className='text-xs font-medium uppercase tracking-wide'>Instructions</span>
              </div>
              <p className='text-sm text-muted-foreground pl-5 leading-relaxed'>{prescription.instructions}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
