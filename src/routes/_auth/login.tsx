import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/login"!
      <Link to="/join">Join</Link>
    </div>
  )
}
