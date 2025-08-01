import { useEffect, useState } from 'react'

export const useMediaQuery = () => {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleWindowSizeChange)

      return () => {
        window.removeEventListener('resize', handleWindowSizeChange)
      }
    }
  }, [])

  const isMobile = width <= 768
  const isTablet = width <= 1024
  const isDesktop = width > 1024

  return { isMobile, isTablet, isDesktop }
}
