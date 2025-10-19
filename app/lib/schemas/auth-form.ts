import z from 'zod'

export const SignUpFormSchema = z
  .object({
    email: z.email(),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirm: z.string().nonempty('Confirm password is required')
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm']
  })

export const SignInFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'Password must be at least 8 characters.')
})
