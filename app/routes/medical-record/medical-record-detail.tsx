import type { Route } from '../+types/medical-record-detail'
import useMedicalRecord from '@/hooks/medical-record/useMedicalRecord'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PatientBasicInfo, PatientEmergencyContact, PatientMedicalInfo } from '@/components/shared/patient-information'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { getInitials } from '@/components/shared/profile-avatar'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Heart, Ruler, Thermometer, Weight, Wind, type LucideIcon } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import NewLabRequest from '@/components/lab/new-lab-request'
import type { LabTest } from '@/types/lab.type'
import { useState } from 'react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import LabTestStatusIndicator from '@/components/lab/lab-status-indicator'
import { formatDateTime } from '@/helpers/formatDateTime'
import useRole from '@/hooks/use-role'
import LabTestDetail from '../lab/lab-test-detail'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Patient Examination' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function MedicalRecordDetail() {
  const { isDoctor } = useRole()
  const { dataMedicalRecord, isPending } = useMedicalRecord()

  if (isPending) {
    return (
      <div className='flex items-center justify-center h-full'>
        <Spinner />
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div>
        <div className='text-xl font-semibold'>Medical Record</div>
        <div className='text-muted-foreground'>Patiend ID: {dataMedicalRecord?.patient_id}</div>
      </div>
      <Tabs defaultValue='patient-info' className='w-full gap-6'>
        <TabsList className='w-full'>
          <TabsTrigger className='truncate' value='patient-info'>
            Patient Info
          </TabsTrigger>
          <TabsTrigger className='truncate' value='vital-signs'>
            Vital Signs
          </TabsTrigger>
          <TabsTrigger className='truncate' value='lab-test'>
            Lab Tests
          </TabsTrigger>
          <TabsTrigger className='truncate' value='diagnosis'>
            Diagnosis
          </TabsTrigger>
          <TabsTrigger className='truncate' value='prescription'>
            Prescription
          </TabsTrigger>
        </TabsList>
        <TabsContent value='patient-info' className='px-6'>
          {dataMedicalRecord?.patient && (
            <div className='space-y-5'>
              <div className='flex items-start gap-5'>
                <div className='relative'>
                  <Avatar className={'w-20 h-20 border-2 border-primary'}>
                    <AvatarImage src={dataMedicalRecord.patient?.photo_url} />
                    <AvatarFallback>{getInitials(dataMedicalRecord.patient?.last_name ?? '')}</AvatarFallback>
                  </Avatar>
                </div>
                <div className='flex-1 space-y-0.5'>
                  <h3 className='text-xl font-semibold'>
                    {dataMedicalRecord.patient?.first_name} {dataMedicalRecord.patient?.last_name}
                  </h3>
                  <p className='text-sm text-muted-foreground'>{dataMedicalRecord.patient?.email}</p>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className='font-semibold mb-3 text-lg'>Basic Info</h4>
                <PatientBasicInfo patient={dataMedicalRecord.patient} />
              </div>
              <div>
                <h4 className='font-semibold mb-3 text-lg'>Emergency Contact</h4>
                <PatientEmergencyContact patient={dataMedicalRecord.patient} />
              </div>
              <div>
                <h4 className='font-semibold mb-3 text-lg'>Medical Information</h4>
                <PatientMedicalInfo patient={dataMedicalRecord.patient} />
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value='vital-signs'>
          {dataMedicalRecord?.vital_signs?.map((record) => (
            <div key={record.id} className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5'>
              <VitalCard
                icon={Activity}
                label='Blood Pressure'
                value={`${record.systolic} / ${record.diastolic}`}
                unit='mmHg'
              />
              <VitalCard icon={Heart} label='Heart Rate' value={Number(record.heart_rate)} unit='bpm' />
              <VitalCard icon={Thermometer} label='Temperature' value={record.body_temperature} unit='C' />
              {record.respiratory_rate && (
                <VitalCard icon={Wind} label='Resp. Rate' value={record.respiratory_rate} unit='/min' />
              )}
              {record.oxygen_saturation && (
                <VitalCard icon={Activity} label='O2 Saturation' value={record.oxygen_saturation} unit='%' />
              )}
              <VitalCard icon={Weight} label='Weight' value={record.weight} unit='kg' />
              <VitalCard icon={Ruler} label='Height' value={record.height} unit='cm' />
            </div>
          ))}
        </TabsContent>
        <TabsContent value='prescription'>Prescription</TabsContent>
        <TabsContent value='lab-test' className='space-y-4'>
          {isDoctor && (
            <div className='flex justify-end'>
              <NewLabRequest />
            </div>
          )}
          {dataMedicalRecord?.lab_test?.map((labTest) => (
            <LabTestCard labTest={labTest} />
          ))}
        </TabsContent>
        <TabsContent value='diagnosis'>Diagnosis</TabsContent>
      </Tabs>
    </div>
  )
}

function LabTestCard({ labTest }: { labTest: LabTest }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className='cursor-pointer'>
          <CardHeader>
            <CardTitle>{labTest.service?.service_name}</CardTitle>
            <CardAction>
              <LabTestStatusIndicator status={labTest.status} />
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-muted-foreground'>Created at: {formatDateTime(labTest.created_at)}</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <LabTestDetail labTest={labTest} />
    </Dialog>
  )
}

function VitalCard({
  icon: Icon,
  label,
  value,
  unit
}: {
  icon: LucideIcon
  label: string
  value: number | string
  unit: string
}) {
  return (
    <Card className='gap-3'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Icon />
          <span>{label}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex items-end gap-2'>
        <div className='text-xl font-bold'>{value}</div>
        <div className='text-sm'>{unit}</div>
      </CardContent>
    </Card>
  )
}
