import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  layout('./layouts/auth-layout.tsx', [
    route('/sign-in', 'routes/auth/sign-in.tsx'),
    route('/sign-up', 'routes/auth/sign-up.tsx')
  ]),

  route('/admin', 'routes/admin.tsx'),

  layout('./layouts/protected-layout.tsx', [
    route('/patient', 'routes/patient/index.tsx'),
    route('/doctor', 'routes/doctor/index.ts')
  ])
] satisfies RouteConfig
