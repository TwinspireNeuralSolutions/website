'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { useGetProfile } from '@/services/firebase/queries/useGetProfile'
import { ProtectedRoute } from '@/components/auth'
import { Button as ShadcnButton } from '@/components/ui/button'
import { HeroBackground, Button } from '@/components/Atoms'
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
import { ChipSelect } from '@/components/ui/chipSelect'

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

interface UploadedFile {
  name: string
  size: string
}

function DashboardContent() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const { data: profile } = useGetProfile(user?.uid)

  const displayName = profile?.name

  const avatarUrl = profile?.avatarUrl
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle')
  const [uploadMessage, setUploadMessage] = useState('')
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)
  const [deviceName, setDeviceName] = useState('')
  const [selectedDevice, setSelectedDevice] = useState(false)
  const deviceOptions = [
    { value: 'vald', label: 'Vald' },
    { value: 'statssports', label: 'Statssports' },
  ]

  const selectedDeviceLabel =
    deviceOptions.find((opt) => opt.value === deviceName)?.label || ''

  // Get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleLogout = async () => {
    await signOut()
    router.push('/admin')
  }

  const validateFile = (file: File): boolean => {
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
      'application/csv',
    ]
    const isValidType =
      validTypes.includes(file.type) ||
      file.name.endsWith('.xlsx') ||
      file.name.endsWith('.xls') ||
      file.name.endsWith('.csv')

    if (!isValidType) {
      setUploadStatus('error')
      setUploadMessage(
        'Invalid file type. Please upload Excel or CSV files (.xlsx, .xls, .csv) only.'
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

    if (!selectedDevice) {
      setUploadStatus('error')
      setUploadMessage('Please select a device before uploading')
      setSelectedDevice(false)
      return
    }

    if (!user) {
      setUploadStatus('error')
      setUploadMessage('You must be logged in to upload files')
      return
    }

    setUploadStatus('uploading')
    setUploadMessage('Uploading file...')

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('teamId', process.env.NEXT_PUBLIC_TEAM_ID || '')
      formData.append('measureDate', getCurrentDate())
      formData.append('deviceName', deviceName)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setUploadedFile({
        name: selectedFile.name,
        size: formatFileSize(selectedFile.size),
      })

      setUploadStatus('success')
      setUploadMessage(`File uploaded successfully: ${data.fileName}`)
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      setUploadStatus('error')
      setUploadMessage(
        error instanceof Error
          ? error.message
          : 'Upload failed. Please try again.'
      )
      console.error('Upload error:', error)
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
    setSelectedDevice(false)
    setDeviceName('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <HeroBackground>
      <div className="relative z-10 p-4 md:p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="flex items-center justify-between rounded-lg bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <Link href="/">
                <ShadcnButton
                  variant="ghost"
                  size="sm"
                  className="group text-white hover:bg-transparent hover:text-white"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                  Home
                </ShadcnButton>
              </Link>
              <div className="h-8 border-l border-white/20" />
              <div className="flex items-center gap-3">
                {avatarUrl && (
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white/20 md:h-16 md:w-16">
                    <Image
                      src={avatarUrl}
                      alt={displayName}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                )}
                {!avatarUrl && (
                  <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-white/20 bg-white/10 text-xl font-semibold text-white md:h-16 md:w-16 md:text-2xl">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h1 className="text-xl font-bold text-white md:text-2xl">
                    {displayName}
                  </h1>
                  <p className="text-xs text-gray-300 md:text-sm">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              color="white"
              className="flex items-center gap-2 px-4 py-1.5 text-sm"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          {uploadStatus === 'success' && uploadedFile ? (
            <UploadSuccess
              fileName={uploadedFile.name}
              fileSize={uploadedFile.size}
              onUploadAnother={handleUploadAnother}
            />
          ) : selectedDevice ? (
            <Card className="overflow-hidden border-white/20 bg-white/10 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-white/10 to-white/5">
                <ShadcnButton
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 left-4 text-white hover:bg-transparent hover:text-white"
                  onClick={() => {
                    setSelectedDevice(false)
                    setDeviceName('')
                    setSelectedFile(null)
                    setUploadStatus('idle')
                    setUploadMessage('')
                  }}
                >
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                  Back
                </ShadcnButton>
                <div className="h-8" />
                <CardTitle className="text-2xl text-white">
                  Upload {selectedDeviceLabel} Team Data
                </CardTitle>
                <CardDescription className="text-base text-gray-200">
                  Upload your team&apos;s {selectedDeviceLabel} Excel files to
                  get started with analysis
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
                      ? 'scale-[1.02] border-blue-400 bg-blue-500/20'
                      : selectedFile
                        ? 'border-green-400 bg-green-500/20'
                        : 'border-white/30 bg-white/5 hover:border-white/50 hover:bg-white/10'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,application/csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <div className="flex flex-col items-center justify-center px-6 py-12 md:py-16">
                    {selectedFile ? (
                      <>
                        <div className="mb-4 flex items-center justify-center">
                          <div className="rounded-full bg-green-500/30 p-4">
                            <FileSpreadsheet className="h-12 w-12 text-green-400" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="mb-1 text-lg font-semibold text-white">
                            {selectedFile.name}
                          </p>
                          <p className="mb-4 text-sm text-gray-300">
                            {formatFileSize(selectedFile.size)}
                          </p>
                          <div className="flex items-center justify-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-400" />
                            <span className="text-sm font-medium text-green-400">
                              File ready to upload
                            </span>
                          </div>
                        </div>
                        <ShadcnButton
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveSelectedFile()
                          }}
                          variant="ghost"
                          size="sm"
                          className="mt-4 text-white hover:bg-white/10"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Remove file
                        </ShadcnButton>
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
                              isDragging ? 'bg-blue-500/30' : 'bg-white/10'
                            }`}
                          >
                            <Upload
                              className={`h-16 w-16 ${
                                isDragging ? 'text-blue-300' : 'text-white/60'
                              }`}
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="mb-2 text-xl font-semibold text-white">
                            {isDragging
                              ? `Drop your ${selectedDeviceLabel} file here`
                              : `Drag & drop your ${selectedDeviceLabel} file here`}
                          </p>
                          <p className="mb-6 text-base text-gray-300">
                            or click to browse from your computer
                          </p>
                          <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 shadow-sm">
                            <FileSpreadsheet className="h-5 w-5 text-white/60" />
                            <span className="text-sm text-gray-200">
                              Supports: .xlsx, .xls, .csv
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {uploadMessage && uploadStatus === 'error' && (
                  <div className="mt-4 rounded-lg border border-red-400/30 bg-red-500/20 p-4 text-sm font-medium text-red-200">
                    <div className="flex items-center gap-2">
                      {uploadMessage}
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile || uploadStatus === 'uploading'}
                  className="mt-6 flex h-12 w-full items-center justify-center text-base font-semibold"
                >
                  {uploadStatus === 'uploading' ? (
                    <span className="flex items-center justify-center gap-2">
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
                    <span className="flex items-center justify-center gap-2">
                      <Upload className="h-5 w-5" />
                      Upload File
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="overflow-hidden border-white/20 bg-white/10 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-white/10 to-white/5">
                <CardTitle className="text-2xl text-white">
                  Select Device
                </CardTitle>
                <CardDescription className="text-base text-gray-200">
                  Please select a device to proceed with data upload
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <ChipSelect
                    value={deviceName}
                    onValueChange={(value) => {
                      setDeviceName(value)
                      setSelectedDevice(true)
                    }}
                    options={deviceOptions}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </HeroBackground>
  )
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute redirectTo="/admin">
      <DashboardContent />
    </ProtectedRoute>
  )
}
