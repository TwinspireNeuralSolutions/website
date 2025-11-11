import { Loader2 } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0a0a2e] via-[#16213e] to-[#0f3460]">
      <Loader2 className="h-8 w-8 animate-spin text-white" />
    </div>
  )
}

