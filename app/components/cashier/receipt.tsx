import { useNavigate } from 'react-router'
import { Separator } from '@/components/ui/separator'
import { CircleCheckBig, Fullscreen, Printer } from 'lucide-react'
import { formatDateTime } from '@/helpers/formatDateTime'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import formatNumber from '@/helpers/formatNumber'
import { Button } from '@/components/ui/button'
import path from '@/constants/path'
import type { Payment } from '@/types/payment.type'
import Timestamps from '../shared/time-stamps'
import cashierApi from '@/apis/cashier.api'
import { useState } from 'react'
import { Spinner } from '../ui/spinner'

export default function Receipt({ dataReceipt, isDialog = false }: { dataReceipt: Payment; isDialog?: boolean }) {
  const navigate = useNavigate()
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrintPdf = async (id: number) => {
    setIsPrinting(true)
    try {
      const res = await cashierApi.printReceiptPdf(id)
      const url = URL.createObjectURL(res.data)

      const a = document.createElement('a')
      a.href = url
      a.download = `Receipt-${id}.pdf`
      a.click()

      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to generate PDF:', error)
    } finally {
      setIsPrinting(false)
    }
  }

  return (
    <>
      <div className='relative text-center space-y-3'>
        <h1 className='font-bold text-3xl text-blue-600 uppercase'>Healthon Hospital</h1>
        {isDialog && (
          <Button
            className='absolute top-1 right-1'
            variant={'ghost'}
            onClick={() => navigate({ pathname: `${path.cashier.receiptOverview}/${dataReceipt.id}` })}
          >
            <Fullscreen />
          </Button>
        )}
        <div className='text-sm text-muted-foreground'>
          <div>123 Đường ABC, Quận 1, TP.HCM</div>
          <div>Hotline: 1900-xxxx</div>
        </div>
      </div>
      <Separator />
      <div className='space-y-5'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold uppercase'>Payment Receipt</h1>
          <CircleCheckBig size={30} className='text-green-600' />
        </div>
        <div className='grid grid-cols-2 gap-3 text-sm'>
          <div className='space-y-1'>
            <p>Receipt number:</p>
            <p className='font-semibold'>{dataReceipt?.receipt_number}</p>
          </div>
          <div className='space-y-1'>
            <p>Date:</p>
            <p className='font-semibold'>{formatDateTime(dataReceipt?.payment_date)}</p>
          </div>
          <div className='space-y-1'>
            <p>Patient:</p>
            <p className='font-semibold'>
              {dataReceipt?.patient?.first_name} {dataReceipt?.patient?.last_name}
            </p>
          </div>
          <div className='space-y-1'>
            <p>Phone:</p>
            <p className='font-semibold'>{dataReceipt?.patient?.phone}</p>
          </div>
        </div>
      </div>
      {dataReceipt?.lab_bills && (
        <div className='space-y-3'>
          <h1 className='text-xl text-blue-600 font-bold'>Lab Services</h1>
          <Table className='text-sm bg-background'>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataReceipt.lab_bills.map((labBill) => (
                <TableRow key={labBill.id}>
                  <TableCell>{labBill.service?.service_name}</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>
                    {formatNumber(labBill.unit_cost)} {labBill.service?.currency}
                  </TableCell>
                  <TableCell>
                    {formatNumber(labBill.total_cost)} {labBill.service?.currency}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {dataReceipt?.prescription_bills && (
        <div className='space-y-3'>
          <h1 className='text-xl text-blue-600 font-bold'>Prescriptions</h1>
          <Table className='text-sm bg-background'>
            <TableHeader>
              <TableRow>
                <TableHead>Prescription name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataReceipt.prescription_bills.map((prescriptionBill) => (
                <TableRow key={prescriptionBill.id}>
                  <TableCell>
                    <div>
                      <p>{prescriptionBill.prescription?.medication?.medication_name}</p>
                      <p className='text-xs text-muted-foreground'>
                        {prescriptionBill.prescription?.dosage} - {prescriptionBill.prescription?.frequency} -{' '}
                        {prescriptionBill.prescription?.duration}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{prescriptionBill.quantity}</TableCell>
                  <TableCell>
                    {formatNumber(prescriptionBill.unit_cost)} {prescriptionBill.prescription?.medication?.currency}
                  </TableCell>
                  <TableCell>
                    {formatNumber(prescriptionBill.total_cost)} {prescriptionBill.prescription?.medication?.currency}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <Separator />
      {dataReceipt && (
        <div className='space-y-2 bg-background p-3 rounded-xs'>
          <div className='flex items-center justify-between'>
            <div>Subtotal:</div>
            <div>{formatNumber(dataReceipt.subtotal)}</div>
          </div>
          <div className='flex items-center justify-between text-sm text-destructive'>
            <div>Discount:</div>
            <div>-{formatNumber(dataReceipt.discount)}</div>
          </div>
          <Separator />
          <div className='flex items-center justify-between text-xl text-blue-500 font-bold'>
            <div>Total:</div>
            <div>{formatNumber(dataReceipt.total_amount)}</div>
          </div>
          <div className='flex items-center justify-between'>
            <div>Amount paid:</div>
            <div>{formatNumber(dataReceipt.amount_paid)}</div>
          </div>
          <div className='flex items-center justify-between'>
            <div>Change:</div>
            <div>{formatNumber(dataReceipt.amount_paid - dataReceipt.total_amount)}</div>
          </div>
          <div className='flex items-center justify-between'>
            <div>Payment method:</div>
            <div>{dataReceipt.payment_method}</div>
          </div>
        </div>
      )}
      <Separator />
      <div className='text-sm text-center text-muted-foreground'>
        <p>Thank you for your visit! Wishing you good health!</p>
        <p>Please retain this receipt for future reference and verification purposes.</p>
      </div>
      <div className='mt-3 flex items-center justify-between gap-6'>
        <Button className='flex-1 cursor-pointer' disabled={isPrinting} onClick={() => handlePrintPdf(dataReceipt.id)}>
          {isPrinting && <Spinner />}
          {!isPrinting && <Printer />}
          <span>Print receipt</span>
        </Button>
        {!isDialog && (
          <Button
            variant={'outline'}
            className='flex-1 cursor-pointer'
            onClick={() => navigate({ pathname: path.cashier.billings })}
          >
            Back to Billing
          </Button>
        )}
      </div>
      <Separator />
      <Timestamps createdAt={dataReceipt.created_at} updatedAt={dataReceipt.updated_at} />
    </>
  )
}
