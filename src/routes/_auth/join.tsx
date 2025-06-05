import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/join')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4 p-4 bg-background-tertiary rounded-lg shadow-md w-full max-w-sm md:max-w-md mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Join Us</h1>
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <input type="email" placeholder="Email" required className="py-2 px-3 border-foreground-subtle rounded-lg border" />
        <input type="password" placeholder="Password" required className="py-2 px-3 border-foreground-subtle rounded-lg border" />
        <input type="password" placeholder="Confirm Password" required className="py-2 px-3 border-foreground-subtle rounded-lg border" />
        <button
          type="submit"
          className="bg-primary transition-colors hover:bg-primary-hover text-primary-foreground w-fit px-5 rounded-lg py-1.5 ml-auto"
        >
          Join
        </button>
      </form>
      <div className="flex items-center">
        <div className="border-foreground-subtle border-b flex-1" />
        <span className="px-2 text-foreground-muted -mt-1">or</span>
        <div className="border-foreground-subtle border-b flex-1" />
      </div>
      <Link to="/login" className="text-center text-foreground-muted hover:text-foreground transition-colors">
        Already have an account? Login
      </Link>
    </div>
  )
}
