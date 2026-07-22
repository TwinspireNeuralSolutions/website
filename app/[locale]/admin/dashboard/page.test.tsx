import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminDashboard from './page'
import { useAuth } from '@/hooks/useAuth'
import { useGetProfile } from '@/services/firebase/queries/useGetProfile'
import { useRouter, useParams } from 'next/navigation'

vi.mock('@/components/auth', () => ({
  ProtectedRoute: ({ children }: { children: React.ReactNode }) => children,
}))
vi.mock('@/hooks/useAuth')
vi.mock('@/services/firebase/queries/useGetProfile')
vi.mock('next/navigation')

const mockUseAuth = vi.mocked(useAuth)
const mockUseGetProfile = vi.mocked(useGetProfile)
const mockUseRouter = vi.mocked(useRouter)
const mockUseParams = vi.mocked(useParams)

const push = vi.fn()
const signOut = vi.fn()

function makeFile(name: string, type: string) {
  return new File(['content'], name, { type })
}

describe('AdminDashboard', () => {
  beforeEach(() => {
    push.mockClear()
    signOut.mockClear()
    mockUseRouter.mockReturnValue({ push } as unknown as ReturnType<
      typeof useRouter
    >)
    mockUseParams.mockReturnValue({ locale: 'en' })
    mockUseAuth.mockReturnValue({
      user: { uid: 'user-1', email: 'manager@twinspire.ai' },
      signOut,
    } as unknown as ReturnType<typeof useAuth>)
    mockUseGetProfile.mockReturnValue({
      data: { uid: 'user-1', name: 'Manager', role: 'team-manager' },
    } as unknown as ReturnType<typeof useGetProfile>)
    vi.stubGlobal('fetch', vi.fn())
  })

  it('shows the device-select step first', () => {
    render(<AdminDashboard />)

    expect(screen.getByText('Select Device')).toBeInTheDocument()
  })

  it('reveals the upload dropzone after a device is selected', async () => {
    const user = userEvent.setup()
    render(<AdminDashboard />)

    await user.click(screen.getByRole('radio', { name: 'Vald' }))

    expect(screen.getByText('Upload Vald Team Data')).toBeInTheDocument()
  })

  it('rejects an invalid file type without calling the upload API', async () => {
    const user = userEvent.setup()
    render(<AdminDashboard />)
    await user.click(screen.getByRole('radio', { name: 'Vald' }))

    // userEvent.upload() filters by the input's `accept` attribute, so an
    // unsupported file would never even reach the change handler that way.
    // Dispatch the change event directly to exercise the app's own
    // validateFile() check (e.g. a file dragged in via handleDrop instead).
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement
    const file = makeFile('team.pdf', 'application/pdf')
    Object.defineProperty(input, 'files', { value: [file] })
    fireEvent.change(input)

    expect(screen.getByText(/Invalid file type/)).toBeInTheDocument()
    expect(fetch).not.toHaveBeenCalled()
  })

  it('uploads a valid file and shows the success screen', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ fileName: 'team.xlsx' }),
    } as Response)
    const user = userEvent.setup()
    render(<AdminDashboard />)
    await user.click(screen.getByRole('radio', { name: 'Vald' }))

    const input = document.querySelector('input[type="file"]') as HTMLElement
    await user.upload(
      input,
      makeFile(
        'team.xlsx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
    )
    await user.click(screen.getByRole('button', { name: /Upload File/ }))

    await waitFor(() =>
      expect(screen.getByText('Upload Successful!')).toBeInTheDocument()
    )
    expect(fetch).toHaveBeenCalledWith(
      '/api/upload',
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('signs out and redirects to the login page on logout', async () => {
    const user = userEvent.setup()
    render(<AdminDashboard />)

    await user.click(screen.getByRole('button', { name: /Logout/ }))

    expect(signOut).toHaveBeenCalled()
    await waitFor(() => expect(push).toHaveBeenCalledWith('/en/admin'))
  })
})
