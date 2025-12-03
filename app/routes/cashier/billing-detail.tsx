import type { Route } from './+types/billing-detail'
import CardWrapper from '@/components/shared/card-wrapper'
import usePaymentById from '@/hooks/cashier/useBillingById'
import { Spinner } from '@/components/ui/spinner'
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import AppointmentStatusIndicator from '@/components/features/appointments/appointment-status-indicator'
import type { AppointmentStatus } from '@/types/appointment.type'
import { Separator } from '@/components/ui/separator'
import formatDate from '@/helpers/formatDate'
import { useForm } from 'react-hook-form'
import type z from 'zod'
import { PaymentFormSchema } from '@/lib/schemas/payment-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import CustomField from '@/components/shared/custom-field'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import useProcessPayment from '@/hooks/cashier/useProcessPayment'
import { PAYMENT_METHODS } from '@/lib/schemas'
import formatNumber from '@/helpers/formatNumber'
import { useNavigate } from 'react-router'
import path from '@/constants/path'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Billing Detail' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function PaymentDetail() {
  const navigate = useNavigate()
  const { dataBilling, isPending: isLoadingPayment } = usePaymentById()
  const { mutate } = useProcessPayment()
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = dataBilling?.subtotal ?? 0

  const form = useForm({
    resolver: zodResolver(PaymentFormSchema(subtotal)),
    defaultValues: {
      discount: 0,
      amount_paid: 0,
      notes: ''
    }
  })
  const discount = Number(form.watch('discount'))
  const amountPaid = Number(form.watch('amount_paid'))

  const totalAmount = subtotal - discount
  const changeAmount = amountPaid > totalAmount ? amountPaid - totalAmount : 0

  const onSubmit = (data: z.infer<ReturnType<typeof PaymentFormSchema>>) => {
    if (dataBilling?.id) {
      setIsProcessing(true)
      mutate(
        { id: dataBilling.id, props: data },
        {
          onSuccess: () => {
            navigate({ pathname: `${path.cashier.receiptOverview}/${dataBilling.id}` })
          },
          onSettled: () => {
            setTimeout(() => setIsProcessing(false), 1000)
          }
        }
      )
    }
  }

  if (isLoadingPayment) {
    return (
      <div className='flex items-center justify-center h-full'>
        <Spinner />
      </div>
    )
  }
  return (
    <div className='flex flex-col xl:flex-row xl:items-start gap-6'>
      <CardWrapper className='grow xl:basis-3/5'>
        <div className='space-y-4'>
          <h1 className='text-xl font-semibold'>Patient Information</h1>
          <div className='space-y-2 p-4 rounded-sm bg-background'>
            <div className='flex items-center justify-between'>
              <p>Fullname:</p>
              <p className='font-medium'>
                {dataBilling?.appointment?.patient.first_name} {dataBilling?.appointment?.patient.last_name}
              </p>
            </div>
            <div className='flex items-center justify-between'>
              <p>Date of birth:</p>
              <p className='font-medium'>{formatDate(dataBilling?.appointment?.patient.date_of_birth as string)}</p>
            </div>
            <div className='flex items-center justify-between'>
              <p>Adress:</p>
              <p className='font-medium'>{dataBilling?.appointment?.patient.address}</p>
            </div>
            <div className='flex items-center justify-between'>
              <p>Phone:</p>
              <p className='font-medium'>{dataBilling?.appointment?.patient.phone}</p>
            </div>
            <div className='flex items-center justify-between'>
              <p>Consultation Date:</p>
              <p className='font-medium'>{formatDate(dataBilling?.appointment?.appointment_date as string)}</p>
            </div>
            <div className='flex items-center justify-between'>
              <p>Status:</p>
              <AppointmentStatusIndicator status={dataBilling?.appointment?.status as AppointmentStatus} />
            </div>
          </div>
        </div>
        <Separator />
        <div className='space-y-4'>
          <h1 className='text-xl font-semibold'>Lab Service</h1>
          {dataBilling?.lab_bills?.map((labBill) => (
            <Item key={labBill.id} variant='outline' className='bg-cyan-600/10'>
              <ItemContent>
                <ItemTitle>{labBill.service?.service_name}</ItemTitle>
                <ItemDescription>Quantity: 1</ItemDescription>
              </ItemContent>
              <ItemActions className='font-semibold text-cyan-600'>
                {formatNumber(labBill.service?.price as number)} {labBill.service?.currency}
              </ItemActions>
            </Item>
          ))}
          {dataBilling?.lab_bills?.length === 0 && <p className='text-muted-foreground text-sm'>No lab services</p>}
        </div>
        <Separator />
        <div className='space-y-4'>
          <h1 className='text-xl font-semibold'>Prescription</h1>
          {dataBilling?.prescription_bills?.map((prescriptionBill) => (
            <Item key={prescriptionBill.id} variant='outline' className='bg-cyan-600/10'>
              <ItemContent>
                <ItemTitle className='capitalize'>
                  {prescriptionBill?.prescription?.medication?.medication_name}
                </ItemTitle>
                <ItemDescription>
                  <>
                    {prescriptionBill.prescription?.dosage} -{prescriptionBill.prescription?.frequency} -
                    {prescriptionBill.prescription?.duration}
                    <br />
                    Quantity: {prescriptionBill.quantity}
                  </>
                </ItemDescription>
              </ItemContent>
              <ItemActions className='font-semibold text-cyan-600'>
                {formatNumber(prescriptionBill.total_cost)} {prescriptionBill.prescription?.medication?.currency}
              </ItemActions>
            </Item>
          ))}
          {dataBilling?.prescription_bills?.length === 0 && (
            <p className='text-muted-foreground text-sm'>No prescription</p>
          )}
        </div>
      </CardWrapper>
      <CardWrapper className='xl:basis-2/5'>
        <div className='space-y-4'>
          <h1 className='text-xl font-semibold'>Payment</h1>
          <div className='space-y-3 p-4 rounded-sm bg-background'>
            <div className='flex items-center justify-between'>
              <div>Subtotal:</div>
              <div>{formatNumber(dataBilling?.subtotal ?? 0)}</div>
            </div>
            <div className='flex items-center justify-between text-sm text-destructive'>
              <div>Discount:</div>
              <div>-{formatNumber(discount)}</div>
            </div>
            <Separator />
            <div className='flex items-center justify-between text-xl text-blue-500 font-semibold'>
              <div>Total:</div>
              <div>{formatNumber(totalAmount)}</div>
            </div>
          </div>
          <form id='form-process-payment' onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <CustomField
                control={form.control}
                label='Discount'
                name='discount'
                inputType='number'
                placeholder='Enter discount'
              />
              <CustomField
                control={form.control}
                label='Payment Method'
                name='payment_method'
                fieldType='select'
                options={PAYMENT_METHODS}
                placeholder='Select payment method'
              />
              <CustomField
                control={form.control}
                label='Amount paid'
                name='amount_paid'
                inputType='number'
                placeholder='Enter amount'
              />
              {changeAmount > 0 && (
                <Item variant={'outline'} className='bg-green-600/10 border-green-600'>
                  <ItemContent>
                    <ItemTitle>Change amount</ItemTitle>
                  </ItemContent>
                  <ItemActions>{formatNumber(changeAmount)}</ItemActions>
                </Item>
              )}
              {/* <CustomField
                control={form.control}
                label='Notes (optional)'
                name='notes'
                fieldType='textarea'
                maxCharacters={300}
                placeholder='Add notes if needed'
                isRequired={false}
              /> */}
            </FieldGroup>
          </form>
        </div>
        <Button className='cursor-pointer w-full mt-4' form='form-process-payment' disabled={isProcessing}>
          {isProcessing && <Spinner />}
          {isProcessing ? 'Processing...' : 'Confirm Payment'}
        </Button>
      </CardWrapper>
    </div>
  )
}
