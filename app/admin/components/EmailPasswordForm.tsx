import { FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

interface EmailPasswordFormProps {
  email: string
  password: string
  isLoading: boolean
  isDisabled: boolean
  hasError: boolean
  onEmailChange: (email: string) => void
  onPasswordChange: (password: string) => void
  onSubmit: (e: FormEvent) => void
}

export function EmailPasswordForm({
  email,
  password,
  isLoading,
  isDisabled,
  hasError,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: EmailPasswordFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          disabled={isDisabled}
          autoComplete="email"
          maxLength={255}
          aria-label="Email address"
          aria-invalid={hasError}
          className="bg-white/90 border-white/20 text-gray-900 placeholder:text-gray-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-white">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          required
          disabled={isDisabled}
          autoComplete="current-password"
          maxLength={255}
          aria-label="Password"
          aria-invalid={hasError}
          className="bg-white/90 border-white/20 text-gray-900 placeholder:text-gray-500"
        />
      </div>

      <Button
        type="submit"
        className="w-full rounded-full bg-[#0802A3] text-white shadow-md hover:bg-[#001060]"
        disabled={isDisabled}
        aria-label="Sign in with email"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign in with Email'
        )}
      </Button>
    </form>
  )
}

