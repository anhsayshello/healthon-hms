import { useUserCredentialStore } from '@/stores/useUserCredentialStore'
import type { Patient } from '@/types/patient.type'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { PatientFormSchema } from '@/lib/schemas/patient-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import CustomField from '@/components/shared/custom-field'
import { BLOOD_GROUP, GENDER, MARITAL_STATUS, RELATION } from '@/lib/schemas'
import { useEffect } from 'react'
import { Spinner } from '@/components/ui/spinner'
import useUpsertPatient from '@/hooks/patient/useUpsertPatient'
import { format } from 'date-fns'

interface Props {
  data: Patient | null
  type: 'create' | 'update'
}

export default function PatientProfileForm({ data, type }: Props) {
  const userCred = useUserCredentialStore((state) => state.userCred)
  const { mutate, isPending } = useUpsertPatient(type)

  const userData = {
    first_name: userCred?.firstName ?? '',
    last_name: userCred?.lastName ?? '',
    email: userCred?.email ?? ''
  }

  const form = useForm({
    resolver: zodResolver(PatientFormSchema),
    defaultValues: {
      ...userData,
      date_of_birth: new Date(),
      phone: '',
      address: '',
      emergency_contact_name: '',
      emergency_contact_number: '',
      allergies: '',
      medical_conditions: '',
      medical_history: '',
      insurance_provider: '',
      insurance_number: '',
      privacy_consent: false,
      service_consent: false,
      medical_consent: false
    }
  })

  const onSubmit = async (data: z.infer<typeof PatientFormSchema>) => {
    mutate({ ...data, date_of_birth: format(data.date_of_birth, 'yyyy-MM-dd') })
  }

  useEffect(() => {
    if (type === 'create') {
      form.reset(userData)
    } else if (type === 'update' && data) {
      form.reset({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        date_of_birth: new Date(data.date_of_birth),
        gender: data.gender,
        phone: data.phone,
        marital_status: data.marital_status,
        address: data.address,
        emergency_contact_name: data.emergency_contact_name,
        emergency_contact_number: data.emergency_contact_number,
        relation: data.relation,
        blood_group: data.blood_group,
        allergies: data.allergies,
        medical_conditions: data.medical_conditions,
        medical_history: data.medical_history,
        insurance_provider: data.insurance_provider,
        insurance_number: data.insurance_number,
        privacy_consent: data.privacy_consent,
        service_consent: data.service_consent,
        medical_consent: data.medical_consent
      })
    }
  }, [data, type, form])

  return (
    <Card className='w-full gap-2 lg:px-3 lg:py-6 rounded-lg bg-background'>
      <CardHeader>
        <CardTitle className='text-2xl'>{type === 'create' ? 'Patient Registration' : 'Patient Profile'}</CardTitle>
        <CardDescription>
          {type === 'update' && <p>ID: {data?.uid}</p>}
          <p>
            {type === 'create'
              ? 'Please provide all the information below to help us understand better and provide good and quality service to you.'
              : 'You can update your personal and medical information below to help us keep your profile accurate and up-to-date.'}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='text-xl font-semibold mt-5 mb-4'>Personal Information</div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='flex items-start gap-6 lg:gap-8'>
              <CustomField control={form.control} label='First Name' name='first_name' placeholder='First Name' />
              <CustomField control={form.control} label='Last Name' name='last_name' placeholder='Last Name' />
            </div>
            <CustomField control={form.control} label='Email Address' name='email' placeholder='name@example.com' />
            <div className='flex flex-col lg:flex-row items-start gap-6 lg:gap-8'>
              <CustomField
                control={form.control}
                label='Gender'
                name='gender'
                fieldType='select'
                placeholder='Select Gender'
                options={GENDER}
              />
              <CustomField control={form.control} label='Date of Birth' name='date_of_birth' inputType='date' />
            </div>
            <div className='flex flex-col lg:flex-row items-start gap-6 lg:gap-8'>
              <CustomField control={form.control} label='Phone' name='phone' placeholder='Enter your phone number' />
              <CustomField
                control={form.control}
                label='Marital Status'
                name='marital_status'
                fieldType='select'
                placeholder='Select Marital Status'
                options={MARITAL_STATUS}
              />
            </div>
            <CustomField control={form.control} label='Address' name='address' placeholder='Type your address' />
            <div className='text-xl font-semibold mt-5 mb-4'>Family Information</div>
            <div className='flex flex-col lg:flex-row items-start gap-6 lg:gap-8'>
              <CustomField
                control={form.control}
                label='Emergency Contact Name'
                name='emergency_contact_name'
                placeholder='Enter contact name'
              />
              <CustomField
                control={form.control}
                label='Emergency Contact Phone'
                name='emergency_contact_number'
                placeholder='Enter phone number'
              />
            </div>
            <CustomField
              control={form.control}
              label='Relation'
              name='relation'
              fieldType='select'
              placeholder='Select Relation With Contact Person'
              options={RELATION}
            />
            <div className='text-xl font-semibold mt-5 mb-4'>Medical Information</div>
            <div className='flex flex-col lg:flex-row items-start gap-6 lg:gap-8'>
              <CustomField
                control={form.control}
                label='Allergies'
                name='allergies'
                placeholder='Example: milk'
                isRequired={false}
              />
              <CustomField
                control={form.control}
                label='Blood Group'
                name='blood_group'
                fieldType='select'
                placeholder='Select Blood Group'
                isRequired={false}
                options={BLOOD_GROUP}
              />
            </div>
            <CustomField
              control={form.control}
              label='Medical Conditions'
              name='medical_conditions'
              placeholder='Medical Conditions'
              isRequired={false}
            />
            <CustomField
              control={form.control}
              label='Medical History'
              name='medical_history'
              placeholder='Medical History'
              isRequired={false}
            />
            <div className='flex flex-col lg:flex-row items-start gap-6 lg:gap-8'>
              <CustomField
                control={form.control}
                label='Insurance Provider'
                name='insurance_provider'
                placeholder='Insurance Provider'
                isRequired={false}
              />
              <CustomField
                control={form.control}
                label='Insurance Number'
                name='insurance_number'
                placeholder='Insurance Number'
                isRequired={false}
              />
            </div>
            {type === 'create' && (
              <>
                <div className='text-xl font-semibold mt-5 mb-4'>Consent</div>
                <CustomField
                  control={form.control}
                  label='Privacy Policy Agreement'
                  name='privacy_consent'
                  placeholder='I consent to the collection, storage, and use of my personal and health information as outlined in the Privacy Policy. I understand how my data will be used, who it may be shared with, and my rights regarding access, correction, and deletion of my data.'
                  inputType='checkbox'
                />
                <CustomField
                  control={form.control}
                  label='Terms of Service Agreement'
                  name='service_consent'
                  placeholder='I agree to the Terms of Service, including my responsibilities as a user of this healthcare management system, the limitations of liability, and the dispute resolution process. I understand that continued use of this service is contingent upon my adherence to these terms.'
                  inputType='checkbox'
                />
                <CustomField
                  control={form.control}
                  label='Informed Consent for Medical Treatment'
                  name='medical_consent'
                  placeholder='I provide informed consent to receive medical treatment and services through this healthcare management system. I acknowledge that I have been informed of the nature, risks, benefits, and alternatives to the proposed treatments and that I have the right to ask questions and receive further information before proceeding.'
                  inputType='checkbox'
                />
              </>
            )}
            <Button disabled={isPending} className='cursor-pointer w-full md:w-fit'>
              {isPending && <Spinner />}
              {type === 'create' ? 'Submit' : 'Update'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export function CreateNewPatient() {
  return <PatientProfileForm data={null} type='create' />
}

export function UpdatePatient({ data }: { data: Patient }) {
  return <PatientProfileForm data={data} type='update' />
}
