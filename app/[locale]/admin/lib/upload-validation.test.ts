import { describe, it, expect } from 'vitest'
import { validateFile, formatFileSize } from './upload-validation'

function makeFile(name: string, type: string): File {
  return new File(['content'], name, { type })
}

describe('validateFile', () => {
  it('accepts a .xlsx file by MIME type', () => {
    const file = makeFile(
      'team.xlsx',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    expect(validateFile(file)).toEqual({ valid: true })
  })

  it('accepts a legacy .xls file by MIME type', () => {
    const file = makeFile('team.xls', 'application/vnd.ms-excel')
    expect(validateFile(file)).toEqual({ valid: true })
  })

  it('accepts a .csv file by MIME type', () => {
    const file = makeFile('team.csv', 'text/csv')
    expect(validateFile(file)).toEqual({ valid: true })
  })

  it('accepts a file by extension when the MIME type is unrecognized', () => {
    const file = makeFile('team.csv', 'application/octet-stream')
    expect(validateFile(file)).toEqual({ valid: true })
  })

  it('rejects an unsupported file type', () => {
    const file = makeFile('team.pdf', 'application/pdf')
    const result = validateFile(file)
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/Invalid file type/)
  })

  it('rejects a file with no extension and an unrecognized MIME type', () => {
    const file = makeFile('team', 'application/octet-stream')
    expect(validateFile(file).valid).toBe(false)
  })
})

describe('formatFileSize', () => {
  it('formats 0 bytes', () => {
    expect(formatFileSize(0)).toBe('0 Bytes')
  })

  it('formats bytes below 1KB', () => {
    expect(formatFileSize(512)).toBe('512 Bytes')
  })

  it('formats kilobytes', () => {
    expect(formatFileSize(1536)).toBe('1.5 KB')
  })

  it('formats megabytes', () => {
    expect(formatFileSize(1024 * 1024 * 2.5)).toBe('2.5 MB')
  })
})
