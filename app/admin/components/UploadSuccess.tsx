import { CheckCircle2, FileSpreadsheet, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface UploadSuccessProps {
  fileName: string
  fileSize: string
  onUploadAnother: () => void
}

export function UploadSuccess({
  fileName,
  fileSize,
  onUploadAnother,
}: UploadSuccessProps) {
  return (
    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-20" />
            <div className="relative rounded-full bg-green-100 p-6">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-900">
              Upload Successful!
              <Sparkles className="h-5 w-5 text-yellow-500" />
            </h3>
            <p className="text-sm text-gray-600">
              We&apos;re processing your file now
            </p>
          </div>

          <div className="w-full max-w-sm rounded-lg border border-green-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-50 p-2">
                <FileSpreadsheet className="h-6 w-6 text-green-600" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate font-medium text-gray-900">{fileName}</p>
                <p className="text-sm text-gray-500">{fileSize}</p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button
              onClick={onUploadAnother}
              variant="default"
              className="bg-green-600 hover:bg-green-700"
            >
              Upload Another File
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
