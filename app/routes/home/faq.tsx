import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqs = [
  {
    label: 'What types of patient information can the system store?',
    description:
      'The system stores personal details, emergency contacts, blood type, allergy history, past illnesses, clinical notes, prescriptions, lab results, and visit records.'
  },
  {
    label: 'How does the system improve clinical workflows for doctors?',
    description:
      'Doctors can quickly retrieve patient records, view lab results in real time, create digital prescriptions, and track treatment progress without relying on manual paperwork.'
  },
  {
    label: 'What benefits does online appointment scheduling provide for patients?',
    description:
      'Patients can choose available time slots, avoid long wait times, and manage their schedules more proactively through the patient portal.'
  },
  {
    label: 'How does the billing module support financial transparency?',
    description:
      'The billing module generates detailed invoices, records service fees, tracks payment status, and maintains a full transaction history for accountability.'
  },
  {
    label: 'What features help administrators manage hospital staff efficiently?',
    description:
      'Administrators can manage staff profiles, specialties, working hours, shift schedules, and track performance across departments.'
  },
  {
    label: 'How does electronic medical record storage reduce operational risks?',
    description:
      'Digital records prevent data loss caused by misplaced paper files, ensure consistent formats, and support automated backups for safety.'
  },
  {
    label: 'What tools are available for patients to track their health information?',
    description:
      'Patients can view previous appointments, monitor lab test outcomes, review prescriptions, and follow their health trends through an online dashboard.'
  },
  {
    label: 'How does the system improve collaboration between departments?',
    description:
      'Departments such as pharmacy, laboratory, and outpatient services share synchronized data, allowing seamless communication and faster decision-making.'
  },
  {
    label: 'What reporting or analytics features are included?',
    description:
      'The system offers statistical dashboards, patient flow reports, financial summaries, and operational insights to support hospital-wide decision-making.'
  },
  {
    label: 'How does the system support future expansion of hospital services?',
    description:
      'Its modular architecture allows adding new features—such as telemedicine, inventory management, or specialized clinical modules—without disrupting existing operations.'
  }
]

export default function Faq() {
  return (
    <div className='relative py-12 mx-auto max-w-4xl w-full'>
      <div className='px-4'>
        <h2 className='font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl mt-4 leading-tight text-center'>
          Frequently asked questions
        </h2>
        <h2 className='text-sm md:text-base my-4 text-muted-foreground font-normal dark:text-muted-dark text-center max-w-lg mx-auto'>
          We are here to help you with any questions you may have. If you don't find what you need, please contact us at
          healthon@example.com
        </h2>
      </div>
      <Accordion type='single' collapsible className='mt-12 px-4 space-y-2 sm:space-y-3 lg:space-y-4'>
        {faqs.map((faq) => (
          <AccordionItem value={faq.label}>
            <AccordionTrigger className='text-base font-semibold'>{faq.label}</AccordionTrigger>
            <AccordionContent className='flex flex-col gap-4 text-balance'>{faq.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
