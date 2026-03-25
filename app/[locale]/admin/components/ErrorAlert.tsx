import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

interface ErrorAlertProps {
  message: string
}

/**
 * ErrorAlert — displays a destructive alert for auth errors.
 */
export function ErrorAlert({ message }: ErrorAlertProps) {
  if (!message) return null

  return (
    <Alert variant="destructive" className="mt-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
