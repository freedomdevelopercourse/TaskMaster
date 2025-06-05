import AuthCard from '@/features/auth/components/AuthCard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/join')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AuthCard type="join" onSubmit={() => {}} />
}
