import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFileUpload } from './useFileUpload'

function makeFile(name: string, type: string) {
  return new File(['content'], name, { type })
}

function makeChangeEvent(file: File) {
  return {
    target: { files: [file] },
  } as unknown as React.ChangeEvent<HTMLInputElement>
}

describe('useFileUpload', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  it('rejects an invalid file type without touching upload state beyond the error', () => {
    const { result } = renderHook(() => useFileUpload('user-1'))

    act(() => {
      result.current.handleFileChange(
        makeChangeEvent(makeFile('team.pdf', 'application/pdf'))
      )
    })

    expect(result.current.uploadStatus).toBe('error')
    expect(result.current.uploadMessage).toMatch(/Invalid file type/)
    expect(result.current.selectedFile).toBeNull()
  })

  it('accepts a valid file', () => {
    const { result } = renderHook(() => useFileUpload('user-1'))
    const file = makeFile(
      'team.xlsx',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

    act(() => {
      result.current.handleFileChange(makeChangeEvent(file))
    })

    expect(result.current.selectedFile).toBe(file)
    expect(result.current.uploadStatus).toBe('idle')
  })

  it('blocks upload when no device has been selected', async () => {
    const { result } = renderHook(() => useFileUpload('user-1'))
    const file = makeFile(
      'team.xlsx',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

    act(() => {
      result.current.handleFileChange(makeChangeEvent(file))
    })
    await act(async () => {
      await result.current.handleUpload()
    })

    expect(result.current.uploadStatus).toBe('error')
    expect(result.current.uploadMessage).toBe(
      'Please select a device before uploading'
    )
    expect(fetch).not.toHaveBeenCalled()
  })

  it('blocks upload when there is no logged-in user', async () => {
    const { result } = renderHook(() => useFileUpload(undefined))
    const file = makeFile(
      'team.xlsx',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

    act(() => {
      result.current.handleDeviceSelect('vald')
      result.current.handleFileChange(makeChangeEvent(file))
    })
    await act(async () => {
      await result.current.handleUpload()
    })

    expect(result.current.uploadMessage).toBe(
      'You must be logged in to upload files'
    )
    expect(fetch).not.toHaveBeenCalled()
  })

  it('uploads a selected file for the selected device and reports success', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ fileName: 'team.xlsx' }),
    } as Response)
    const { result } = renderHook(() => useFileUpload('user-1'))
    const file = makeFile(
      'team.xlsx',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

    act(() => {
      result.current.handleDeviceSelect('vald')
      result.current.handleFileChange(makeChangeEvent(file))
    })
    await act(async () => {
      await result.current.handleUpload()
    })

    expect(fetch).toHaveBeenCalledWith(
      '/api/upload',
      expect.objectContaining({ method: 'POST' })
    )
    expect(result.current.uploadStatus).toBe('success')
    expect(result.current.uploadedFile).toEqual({
      name: 'team.xlsx',
      size: '7 Bytes',
    })
    expect(result.current.selectedFile).toBeNull()
  })

  it('resets everything back to the device-select step on handleUploadAnother', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ fileName: 'team.xlsx' }),
    } as Response)
    const { result } = renderHook(() => useFileUpload('user-1'))
    const file = makeFile(
      'team.xlsx',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

    act(() => {
      result.current.handleDeviceSelect('vald')
      result.current.handleFileChange(makeChangeEvent(file))
    })
    await act(async () => {
      await result.current.handleUpload()
    })

    act(() => {
      result.current.handleUploadAnother()
    })

    expect(result.current.uploadStatus).toBe('idle')
    expect(result.current.uploadedFile).toBeNull()
    expect(result.current.selectedDevice).toBe(false)
    expect(result.current.deviceName).toBe('')
  })
})
