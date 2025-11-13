import type { Route } from '../medical-record/+types/medical-record-detail'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PatientBasicInfo, PatientEmergencyContact, PatientMedicalInfo } from '@/components/shared/patient-information'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { getInitials } from '@/components/shared/profile-avatar'
import { Activity, Heart, Ruler, Thermometer, Weight, Wind } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import NewLabRequest from '@/components/lab/new-lab-request'
import useRole from '@/hooks/useRole'
import type { Patient } from '@/types/patient.type'
import { Item } from '@/components/ui/item'
import useMedicalRecordById from '@/hooks/medical-record/useMedicalRecordById'
import NewDiagnosis from '../../components/medical-record/new-diagnosis'
import DiagnosisCard from '../../components/medical-record/diagnosis-card'
import NewPrescription from '@/components/medical-record/new-prescription'
import PrescriptionCard from '@/components/medical-record/prescription-card'
import { AppointmentStatusEnum } from '@/types/appointment.type'
import VitalCard from '@/components/medical-record/vital-card'
import LabTestCard from '@/components/medical-record/lab-test-card'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Patient Examination' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function MedicalRecordDetail() {
  const { isDoctor } = useRole()
  const { dataMedicalRecord, isPending } = useMedicalRecordById()

  const isModify = isDoctor && dataMedicalRecord?.appointment?.status === AppointmentStatusEnum.SCHEDULED

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
            Lab Test
          </TabsTrigger>
          <TabsTrigger className='truncate' value='diagnosis'>
            Diagnosis
          </TabsTrigger>
          <TabsTrigger className='truncate' value='prescription'>
            Prescription
          </TabsTrigger>
        </TabsList>
        <TabsContent value='patient-info'>
          {dataMedicalRecord?.patient && (
            <Item variant={'outline'} className='md:p-5'>
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
            </Item>
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
        <TabsContent value='lab-test' className='space-y-4'>
          {isModify && (
            <div className='flex justify-end'>
              <NewLabRequest />
            </div>
          )}
          {dataMedicalRecord?.patient &&
            dataMedicalRecord?.lab_tests?.map((labTest) => (
              <LabTestCard key={labTest.id} labTest={labTest} patient={dataMedicalRecord.patient as Patient} />
            ))}
        </TabsContent>
        <TabsContent value='diagnosis' className='space-y-4'>
          {isModify && (
            <div className='flex justify-end'>
              <NewDiagnosis />
            </div>
          )}
          {dataMedicalRecord?.diagnoses?.map((diagnosis) => (
            <DiagnosisCard key={diagnosis.id} diagnosis={diagnosis} isModify={isModify} />
          ))}
        </TabsContent>
        <TabsContent value='prescription' className='space-y-4'>
          {isModify && (
            <div className='flex justify-end'>
              <NewPrescription />
            </div>
          )}
          {dataMedicalRecord?.prescriptions?.map((prescription) => (
            <PrescriptionCard key={prescription.id} prescription={prescription} isModify={isModify} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
