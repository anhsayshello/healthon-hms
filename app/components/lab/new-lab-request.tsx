import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { CirclePlus } from 'lucide-react'
import { Button } from '../ui/button'
import useLabServices from '@/hooks/lab/useLabServices'
import { Spinner } from '../ui/spinner'
import useCreateLabRequest from '@/hooks/lab/useCreateLabRequest'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { LabRequestForm } from '@/lib/schemas/lab-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import type z from 'zod'
import type { Service } from '@/types/lab.type'
import formatNumber from '@/helpers/formatNumber'
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { useParams } from 'react-router'
import { toast } from 'sonner'
import { useIsMobile } from '@/hooks/use-mobile'

export default function NewLabRequest() {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service>()
  const { medicalRecordId } = useParams()

  const { dataLabServices, isPending: isLoadingServices } = useLabServices({ limit: '1000' })
  const { mutate, isPending } = useCreateLabRequest()

  const form = useForm({
    resolver: zodResolver(LabRequestForm)
  })

  const onSubmit = (data: z.infer<typeof LabRequestForm>) => {
    if (medicalRecordId) {
      mutate(
        { medical_record_id: Number(medicalRecordId), service_id: data.service_id },
        {
          onSuccess: () => {
            setOpen(false)
            toast.success(`Service requested ${selectedService?.service_name}`)
          }
        }
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='cursor-pointer'>
          <CirclePlus />
          <span>Lab Request</span>
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={isMobile}>
        <DialogHeader>
          <DialogTitle>Request Lab Test</DialogTitle>
          <DialogDescription>Specify the test type and add a note if needed before submitting.</DialogDescription>
        </DialogHeader>
        <form id='form-request-lab-test' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name='service_id'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    <span>Service</span>
                    <span className='-ml-1 text-destructive text-lg leading-0'>*</span>
                  </FieldLabel>

                  <Select
                    name={field.name}
                    value={field.value ? String(field.value) : undefined}
                    onValueChange={(value) => {
                      field.onChange(value)
                      const service = dataLabServices?.find((s) => String(s.id) === value)
                      setSelectedService(service)
                    }}
                  >
                    <SelectTrigger id={field.name} aria-invalid={fieldState.invalid} className='w-full'>
                      <SelectValue placeholder={'Select Service'} />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoadingServices && <Spinner />}
                      {dataLabServices?.map((service) => (
                        <SelectItem
                          onClick={() => setSelectedService(service)}
                          key={service.id}
                          value={String(service.id)}
                        >
                          {service.service_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        {selectedService && (
          <>
            <Item variant='outline'>
              <ItemContent>
                <ItemTitle>
                  Price:
                  <div className='space-x-1 text-base'>
                    <span>{formatNumber(selectedService.price)}</span>
                    <span className='lowercase'>{selectedService.currency}</span>
                  </div>
                </ItemTitle>
              </ItemContent>
            </Item>
            <Item variant='muted'>
              <ItemContent>
                <ItemTitle>Description</ItemTitle>
                <ItemDescription>{selectedService.description}</ItemDescription>
              </ItemContent>
            </Item>
          </>
        )}
        <DialogFooter className='pt-2'>
          <DialogClose>
            <Button variant={'outline'}>Cancel</Button>
          </DialogClose>
          <Button className='cursor-pointer' form='form-request-lab-test' disabled={isPending}>
            {isPending && <Spinner />}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
