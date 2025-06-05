import Button from '@/components/Button'
import Input from '@/components/Input'
import { Link } from '@tanstack/react-router'
import { useCallback, type FormEventHandler } from 'react'

export default function AuthCard({ type, defaultEmail, onSubmit }: AuthCardProps) {
  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const email = formData.get('email') as string
      const password = formData.get('password') as string
      const confirmPassword = formData.get('confirmPassword') as string
      if (type === 'join' && password !== confirmPassword) {
        alert('Passwords do not match')
        return
      }
      onSubmit(email, password)
    },
    [type, onSubmit]
  )

  return (
    <div className="flex flex-col gap-4 p-4 bg-background-tertiary rounded-lg shadow-md w-full max-w-sm md:max-w-md mx-auto">
      <h1 className="text-3xl font-semibold mb-4">{type === 'login' ? 'Login' : 'Join'}</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Email" required defaultValue={defaultEmail} />
        <Input name="password" type="password" placeholder="Password" required />
        {type === 'join' && <Input name="confirmPassword" type="password" placeholder="Confirm Password" required />}
        <Button type="submit" className="ml-auto">
          {type === 'login' ? 'Login' : 'Join'}
        </Button>
      </form>
      <div className="flex items-center">
        <div className="border-foreground-subtle border-b flex-1" />
        <span className="px-2 text-foreground-muted -mt-1">or</span>
        <div className="border-foreground-subtle border-b flex-1" />
      </div>
      <Link
        to={type === 'login' ? '/join' : '/login'}
        className="text-center text-foreground-muted hover:text-foreground transition-colors"
      >
        {type === 'login' ? 'Create an account' : 'Already have an account? Login'}
      </Link>
    </div>
  )
}

interface AuthCardProps {
  defaultEmail?: string
  type: 'login' | 'join'
  onSubmit: (email: string, password: string) => void
}
