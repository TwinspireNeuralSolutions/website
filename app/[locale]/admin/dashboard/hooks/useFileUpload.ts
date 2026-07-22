import { useRef, useState } from 'react'
import {
  validateFile,
  formatFileSize,
} from '@/app/[locale]/admin/lib/upload-validation'

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

interface UploadedFile {
  name: string
  size: string
}

export const DEVICE_OPTIONS = [
  { value: 'vald', label: 'Vald' },
  { value: 'statssports', label: 'Statssports' },
]

function getCurrentDate(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * useFileUpload — device selection, drag/drop, validation and upload-to-API
 * logic for the admin dashboard. Page-specific presentation lives in page.tsx.
 */
export function useFileUpload(userId: string | null | undefined) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle')
  const [uploadMessage, setUploadMessage] = useState('')
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)
  const [deviceName, setDeviceName] = useState('')
  const [selectedDevice, setSelectedDevice] = useState(false)

  const selectedDeviceLabel =
    DEVICE_OPTIONS.find((opt) => opt.value === deviceName)?.label || ''

  const handleFileSelect = (file: File) => {
    const result = validateFile(file)
    if (!result.valid) {
      setUploadStatus('error')
      setUploadMessage(result.error ?? 'Invalid file')
      return
    }
    setSelectedFile(file)
    setUploadStatus('idle')
    setUploadMessage('')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.currentTarget === dropZoneRef.current) setIsDragging(false)
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
    if (files && files.length > 0) handleFileSelect(files[0])
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

    if (!userId) {
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

      if (!response.ok) throw new Error(data.error || 'Upload failed')

      setUploadedFile({
        name: selectedFile.name,
        size: formatFileSize(selectedFile.size),
      })
      setUploadStatus('success')
      setUploadMessage(`File uploaded successfully: ${data.fileName}`)
      setSelectedFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
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
    if (fileInputRef.current) fileInputRef.current.value = ''
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
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleBackToDeviceSelect = () => {
    setSelectedDevice(false)
    setDeviceName('')
    setSelectedFile(null)
    setUploadStatus('idle')
    setUploadMessage('')
  }

  const handleDeviceSelect = (value: string) => {
    setDeviceName(value)
    setSelectedDevice(true)
  }

  return {
    deviceOptions: DEVICE_OPTIONS,
    selectedFile,
    uploadStatus,
    uploadMessage,
    uploadedFile,
    isDragging,
    fileInputRef,
    dropZoneRef,
    deviceName,
    selectedDevice,
    selectedDeviceLabel,
    handleFileChange,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleUpload,
    handleRemoveSelectedFile,
    handleUploadAnother,
    handleBackToDeviceSelect,
    handleDeviceSelect,
  }
}
