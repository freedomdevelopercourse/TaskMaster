import supabase from '@/api/Supabase'
import Button from '@/components/Button'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'

export const Route = createFileRoute('/_app/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handleLogout = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) return alert(error.message)
    queryClient.clear()
    navigate({
      to: '/',
      replace: true,
    })
  }, [navigate, queryClient])

  return (
    <div>
      Hello "/_app/dashboard"!
      <br />
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}
