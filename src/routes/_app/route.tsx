import { UserQueryOptions } from '@/api/queries/User'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  async loader({ context: { queryClient } }) {
    const user = await queryClient.fetchQuery(UserQueryOptions)
    if (!user) return redirect({ to: '/' })
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
