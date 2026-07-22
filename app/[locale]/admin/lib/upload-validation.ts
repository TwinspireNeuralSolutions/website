const VALID_FILE_TYPES = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'application/csv',
]

const VALID_EXTENSIONS = ['.xlsx', '.xls', '.csv']

const INVALID_TYPE_ERROR =
  'Invalid file type. Please upload Excel or CSV files (.xlsx, .xls, .csv) only.'

interface FileValidationResult {
  valid: boolean
  error?: string
}

/**
 * Validates that a file is an accepted Excel/CSV type, by MIME type or extension.
 */
export function validateFile(file: File): FileValidationResult {
  const isValidType =
    VALID_FILE_TYPES.includes(file.type) ||
    VALID_EXTENSIONS.some((ext) => file.name.endsWith(ext))

  if (!isValidType) {
    return { valid: false, error: INVALID_TYPE_ERROR }
  }

  return { valid: true }
}

/**
 * Formats a byte count as a human-readable size (e.g. "1.5 MB").
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
