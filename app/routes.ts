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
    route(path.admin.users, 'routes/admin/user-management.tsx'),
    route(path.patient.profile, 'routes/patient/profile.tsx'),
    route(path.record.appointments, 'routes/appointments.tsx')
  ]),

  layout('./layouts/registration-layout.tsx', [route(path.patient.register, 'routes/patient/registration.tsx')])
] satisfies RouteConfig
