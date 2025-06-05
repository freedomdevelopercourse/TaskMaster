import { createFileRoute, Link } from '@tanstack/react-router'
import Button from '../components/Button'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="[--header-height:65px] [--footer-height:85px]">
      <Nav />
      <main className="p-10 min-h-[calc(100dvh-var(--header-height)-var(--footer-height))] flex flex-col items-center justify-center gap-10 bg-background-primary">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  )
}

function Nav() {
  return (
    <header className="flex h-[var(--header-height)] items-center justify-between px-4 bg-background-tertiary border-b border-border">
      <h1 className="text-2xl font-bold">TaskMaster</h1>
      <nav className="flex items-center gap-4">
        <Link to="/login">
          <Button color="secondary" size="small">
            Login
          </Button>
        </Link>
        <Link to="/join">
          <Button size="small">Join</Button>
        </Link>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-background-primary">
      <h1 className="text-4xl font-bold">Welcome to TaskMaster</h1>
      <img src="/images/TaskMasterBranding.png" alt="Logo" className="size-[200px]" />

      <p className="text-lg text-foreground-muted mb-4">Your ultimate task management solution</p>
      <Link to="/login">
        <Button size="large">Get Started</Button>
      </Link>
    </div>
  )
}

function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      {FeaturesList.map((feature, index) => (
        <div key={index} className="p-6 bg-background-secondary rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            {feature.icon} {feature.title}
          </h2>
          <p className="text-foreground-muted">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}

const FeaturesList = [
  {
    title: 'Organize Your Tasks',
    description: 'Keep track of your tasks with ease using our intuitive interface.',
    icon: '🗂️',
  },
  {
    title: 'Collaborate with Teams',
    description: 'Work together with your team members in real-time.',
    icon: '🤝',
  },
  {
    title: 'Track Progress',
    description: 'Monitor your task progress and stay on top of deadlines.',
    icon: '📈',
  },
]

function Footer() {
  return (
    <footer className="px-4 bg-background-tertiary text-white text-center h-[var(--footer-height)] flex flex-col items-center justify-center gap-2">
      <p className="text-foreground-muted">&copy; {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
      <p className="text-foreground-subtle text-sm">
        <Link to="/">Privacy Policy</Link> | <Link to="/">Terms of Service</Link>
      </p>
    </footer>
  )
}
