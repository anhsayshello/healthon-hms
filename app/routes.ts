import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'
import path from './constants/path'

export default [
  index('routes/home.tsx'),
  route('/admin', 'routes/admin.tsx'),

  layout('./layouts/auth-layout.tsx', [
    route('/sign-in', 'routes/auth/sign-in.tsx'),
    route('/sign-up', 'routes/auth/sign-up.tsx')
  ]),

  layout('./layouts/protected-layout.tsx', [
    route(path.dashboard, 'routes/dashboard.tsx'),
    route(path.admin.users, 'routes/admin/user-management.tsx'),
    route(path.patient.profile, 'routes/patient/profile.tsx'),
    route(path.record.appointments, 'routes/patient/appointments.tsx')
  ]),

  layout('./layouts/registration-layout.tsx', [route(path.patient.register, 'routes/patient/registration.tsx')])
] satisfies RouteConfig
