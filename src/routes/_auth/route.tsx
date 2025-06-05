import { UserQueryOptions } from '@/api/queries/User'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  async loader({ context: { queryClient } }) {
    const user = await queryClient.fetchQuery(UserQueryOptions)
    if (user) return redirect({ to: '/dashboard' })
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh">
      <Outlet />
    </div>
  )
}
