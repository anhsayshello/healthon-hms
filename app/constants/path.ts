const path = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  emailLinkSent: '/email-sent',
  emailVerification: '/email-vefification',

  dashboard: '/dashboard',
  notifications: '/notifications',

  admin: {
    auditLogs: '/admin/audit-logs',
    settings: '/admin/settings',
    users: '/admin/users'
  },
  record: {
    doctors: '/record/doctors',
    patients: '/record/patients',
    staffs: '/record/staffs',
    appointments: '/record/appointments',
    medicalRecords: '/record/medical-records',
    medicalRecordDetail: '/record/medical-records/:medicalId',
    billingOverview: '/record/billing'
  },
  nurse: {
    vitalSigns: '/nurse/vital-signs',
    administerMedications: '/nurse/administer-medications'
  },
  lab: {
    requests: '/lab/requests',
    tests: '/lab/tests',
    services: '/lab/services'
  },
  patient: {
    register: '/patient/register',
    profile: '/patient/profile',
    records: '/patient/records',
    prescriptions: '/patient/prescriptions',
    billing: '/patient/billing'
  }
} as const
export default path
