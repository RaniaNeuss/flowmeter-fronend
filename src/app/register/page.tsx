'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'

const RegisterSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type RegisterFormData = z.infer<typeof RegisterSchema>

export default function RegisterPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        toast.error(result.message || 'Registration failed')
        return
      }

      toast.success('Registered successfully!')
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } catch (error) {
      toast.error('Something went wrong while registering.')
      console.error(error)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-sm text-muted-foreground">Enter your info to register</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" {...register('username')} />
          {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register('password')} />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Register
        </Button>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline underline-offset-4">
            Login here
          </Link>
        </p>
      </form>
    </div>
  )
}
