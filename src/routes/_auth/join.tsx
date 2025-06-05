import supabase from '@/api/Supabase'
import AuthCard from '@/features/auth/components/AuthCard'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'

export const Route = createFileRoute('/_auth/join')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  const handleJoin = useCallback(
    async (email: string, password: string) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) return alert(error.message)

      alert('Check your email for the confirmation link!')

      navigate({
        to: '/login',
        search: { email },
      })
    },
    [navigate]
  )

  return <AuthCard type="join" onSubmit={handleJoin} />
}
