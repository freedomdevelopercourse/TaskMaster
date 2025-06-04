import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/"!
      <Link to="/login">Login</Link>
      <Link to="/join">Join</Link>
    </div>
  )
}
