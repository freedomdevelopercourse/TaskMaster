import supabase from '@/api/Supabase'
import AuthCard from '@/features/auth/components/AuthCard'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'
import { z } from 'zod'

export const Route = createFileRoute('/_auth/login')({
  validateSearch(search) {
    return SearchSchema.parse(search)
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { email } = Route.useSearch()
  const navigate = useNavigate()

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) return alert(error.message)

      navigate({
        to: '/dashboard',
        replace: true,
      })
    },
    [navigate]
  )
  return <AuthCard type="login" onSubmit={handleLogin} defaultEmail={email} />
}

const SearchSchema = z.object({
  email: z.string().email().optional(),
})
