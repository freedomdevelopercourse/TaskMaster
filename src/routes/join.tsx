import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/join')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/join"!
      <Link to="/login">Login</Link>
    </div>
  )
}
