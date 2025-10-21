import type { Patient } from '@/types/patient.type'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import InfoItem from './info-item'

export default function PatientInformation({ patient }: { patient: Patient }) {
  return (
    <Tabs defaultValue='basic-info' className='w-full'>
      <TabsList>
        <TabsTrigger value='basic-info'>Basic Info</TabsTrigger>
        <TabsTrigger value='emergency-contact'>Emergency</TabsTrigger>
        <TabsTrigger value='medical-info'>Medical</TabsTrigger>
      </TabsList>
      <TabsContent value='basic-info'>
        <PatientBasicInfo patient={patient} />
      </TabsContent>
      <TabsContent value='emergency-contact'>
        <PatientEmergencyContact patient={patient} />
      </TabsContent>
      <TabsContent value='medical-info'>
        <PatientMedicalInfo patient={patient} />
      </TabsContent>
    </Tabs>
  )
}

export function PatientBasicInfo({ patient }: { patient: Patient }) {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <InfoItem label='Phone' value={patient.phone} />
      <InfoItem label='Address' value={patient.address} />
      <InfoItem label='Date of Birth' value={new Date(patient.date_of_birth).toLocaleDateString()} />
      <InfoItem label='Gender' value={patient.gender} />
      <InfoItem label='Marital Status' value={patient.marital_status} />
      <InfoItem label='Blood Group' value={patient.blood_group} />
    </div>
  )
}

export function PatientEmergencyContact({ patient }: { patient: Patient }) {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <InfoItem label='Contact Name' value={patient.emergency_contact_name} />
      <InfoItem label='Contact Number' value={patient.emergency_contact_number} />
      <InfoItem label='Relation' value={patient.relation} />
    </div>
  )
}

export function PatientMedicalInfo({ patient }: { patient: Patient }) {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <InfoItem label='Allergies' value={patient.allergies || 'None recorded'} />
      <InfoItem label='Medical Conditions' value={patient.medical_conditions || 'None recorded'} />
      <InfoItem label='Medical History' value={patient.medical_history || 'None recorded'} fullWidth />
    </div>
  )
}
