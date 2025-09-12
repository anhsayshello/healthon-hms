import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('sign-in', 'routes/sign-in.tsx'),
  route('sign-up', 'routes/sign-up.tsx'),

  layout('../layouts/auth-layout.tsx', [
    route('admin', 'routes/admin.tsx')
    // route('doctor', 'routes/doctor.tsx'),
    // route('patient', 'routes/patient.tsx')
  ])
] satisfies RouteConfig
