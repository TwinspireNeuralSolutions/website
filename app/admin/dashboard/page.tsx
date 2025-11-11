'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { ProtectedRoute } from '@/components/auth'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Upload,
  FileSpreadsheet,
  X,
  CheckCircle2,
  ArrowLeft,
  LogOut,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { UploadSuccess } from '../components/UploadSuccess'

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

interface UploadedFile {
  name: string
  size: string
}

function DashboardContent() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle')
  const [uploadMessage, setUploadMessage] = useState('')
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  const handleLogout = async () => {
    await signOut()
    router.push('/admin')
  }

  const validateFile = (file: File): boolean => {
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
      'application/vnd.google-apps.spreadsheet',
    ]
    const isValidType =
      validTypes.includes(file.type) ||
      file.name.endsWith('.xlsx') ||
      file.name.endsWith('.xls') ||
      file.name.endsWith('.csv')

    if (!isValidType) {
      setUploadStatus('error')
      setUploadMessage(
        'Invalid file type. Please upload Excel (.xlsx, .xls) or CSV files.'
      )
      return false
    }
    return true
  }

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file)
      setUploadStatus('idle')
      setUploadMessage('')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.currentTarget === dropZoneRef.current) {
      setIsDragging(false)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('error')
      setUploadMessage('Please select a file first')
      return
    }

    setUploadStatus('uploading')
    setUploadMessage('Uploading file...')

    await new Promise((resolve) => setTimeout(resolve, 2000))

    // TODO: Replace with actual upload API
    // const formData = new FormData()
    // formData.append('file', selectedFile)
    // const response = await fetch('/api/upload', {
    //   method: 'POST',
    //   body: formData,
    // })

    setUploadedFile({
      name: selectedFile.name,
      size: formatFileSize(selectedFile.size),
    })

    setUploadStatus('success')
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemoveSelectedFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setUploadStatus('idle')
    setUploadMessage('')
  }

  const handleUploadAnother = () => {
    setUploadStatus('idle')
    setUploadMessage('')
    setUploadedFile(null)
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a2e] via-[#16213e] to-[#0f3460] p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between rounded-lg bg-white/10 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <div className="h-8 border-l border-white/20" />
            <div>
              <h1 className="text-xl font-bold text-white md:text-2xl">
                Admin Dashboard
              </h1>
              <p className="text-xs text-gray-300 md:text-sm">
                {user?.email || user?.displayName}
              </p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="hover:bg-white/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {uploadStatus === 'success' && uploadedFile ? (
          <UploadSuccess
            fileName={uploadedFile.name}
            fileSize={uploadedFile.size}
            onUploadAnother={handleUploadAnother}
          />
        ) : (
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-2xl">Upload Files</CardTitle>
              <CardDescription className="text-base">
                Drag and drop your Excel or CSV files, or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div
                ref={dropZoneRef}
                role="button"
                tabIndex={0}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    fileInputRef.current?.click()
                  }
                }}
                className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 ${
                  isDragging
                    ? 'scale-[1.02] border-blue-500 bg-blue-50'
                    : selectedFile
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="flex flex-col items-center justify-center px-6 py-12 md:py-16">
                  {selectedFile ? (
                    <>
                      <div className="mb-4 flex items-center justify-center">
                        <div className="rounded-full bg-green-100 p-4">
                          <FileSpreadsheet className="h-12 w-12 text-green-600" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="mb-1 text-lg font-semibold text-gray-900">
                          {selectedFile.name}
                        </p>
                        <p className="mb-4 text-sm text-gray-500">
                          {formatFileSize(selectedFile.size)}
                        </p>
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          <span className="text-sm font-medium text-green-600">
                            File ready to upload
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveSelectedFile()
                        }}
                        variant="ghost"
                        size="sm"
                        className="mt-4"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Remove file
                      </Button>
                    </>
                  ) : (
                    <>
                      <div
                        className={`mb-6 flex items-center justify-center transition-transform duration-200 ${
                          isDragging ? 'scale-110' : ''
                        }`}
                      >
                        <div
                          className={`rounded-full p-6 ${
                            isDragging ? 'bg-blue-100' : 'bg-gray-200'
                          }`}
                        >
                          <Upload
                            className={`h-16 w-16 ${
                              isDragging ? 'text-blue-600' : 'text-gray-400'
                            }`}
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="mb-2 text-xl font-semibold text-gray-900">
                          {isDragging
                            ? 'Drop your file here'
                            : 'Drag & drop your file here'}
                        </p>
                        <p className="mb-6 text-base text-gray-600">
                          or click to browse from your computer
                        </p>
                        <div className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm">
                          <FileSpreadsheet className="h-5 w-5 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Supports: .xlsx, .xls, .csv
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {uploadMessage && uploadStatus === 'error' && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
                  <div className="flex items-center gap-2">{uploadMessage}</div>
                </div>
              )}

              <Button
                onClick={handleUpload}
                disabled={!selectedFile || uploadStatus === 'uploading'}
                className="mt-6 h-12 w-full text-base font-semibold"
                size="lg"
              >
                {uploadStatus === 'uploading' ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload File
                  </span>
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute redirectTo="/admin">
      <DashboardContent />
    </ProtectedRoute>
  )
}
