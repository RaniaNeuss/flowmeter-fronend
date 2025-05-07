'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const LoginSchema = z.object({
  email: z.string().email('Enter a valid email').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type LoginFormData = z.infer<typeof LoginSchema>

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email, password },
  })

  const handleSubmit = async (data: LoginFormData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Login failed");
        return;
      }

      localStorage.setItem("token", result.token);
      toast.success("Login successful");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong");
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className={cn('flex flex-col gap-6', className)}
        {...props}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold">Login to Flow Meter Tracker</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials</p>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com"
              {...methods.register("email")} onChange={(e) => setEmail(e.target.value)} />
            {methods.formState.errors.email && (
              <p className="text-sm text-red-500">{methods.formState.errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password"
              {...methods.register("password")} onChange={(e) => setPassword(e.target.value)} />
            {methods.formState.errors.password && (
              <p className="text-sm text-red-500">{methods.formState.errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">Login</Button>
        </div>
        <div className="text-center text-sm">
          Don’t have an account?{' '}
          <a href="/register" className="underline underline-offset-4 text-blue-600 hover:text-blue-800">Sign up
          </a>
        </div>
        <ToastContainer />
      </form>
    </FormProvider>
  )
}
