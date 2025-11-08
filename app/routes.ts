import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'
import path from './constants/path'

export default [
  index('routes/home.tsx'),

  layout('./layouts/auth-layout.tsx', [
    route(path.signIn, 'routes/auth/sign-in.tsx'),
    route(path.signUp, 'routes/auth/sign-up.tsx'),
    route(path.emailLinkSent, 'routes/auth/email-link-sent.tsx'),
    route(path.emailVerification, 'routes/auth/email-verification.tsx')
  ]),

  layout('./layouts/protected-layout.tsx', [
    route(path.dashboard, 'routes/dashboard.tsx'),
    route(path.admin.users, 'routes/admin/firebase-user-management.tsx'),
    route(path.record.appointments, 'routes/appointments.tsx'),
    route(path.record.doctors, 'routes/admin/doctor-records.tsx'),
    route(path.record.patients, 'routes/patient-records.tsx'),
    route(path.record.staffs, 'routes/admin/staff-records.tsx'),
    route(path.record.medicalRecords, 'routes/medical-records.tsx'),
    route(path.record.medicalRecordDetail, 'routes/medical-record/medical-record-detail.tsx'),
    route(path.nurse.vitalSigns, 'routes/nurse/vital-signs-records.tsx'),
    route(path.lab.requests, 'routes/lab/lab-requests.tsx'),
    route(path.lab.tests, 'routes/lab/lab-tests.tsx'),
    route(path.lab.services, 'routes/lab/lab-services.tsx'),
    route(path.patient.profile, 'routes/patient/profile.tsx')
  ]),

  layout('./layouts/registration-layout.tsx', [route(path.patient.register, 'routes/patient/registration.tsx')])
] satisfies RouteConfig
