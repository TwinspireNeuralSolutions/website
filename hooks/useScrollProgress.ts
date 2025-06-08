'use client'

import { useEffect, useState } from 'react'

export function useSectionScrollProgress(
  sectionRef: React.RefObject<HTMLElement>,
  scrollLength = 400
) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()

      const scrolled = -rect.top
      const percent = Math.min(1, Math.max(0, scrolled / scrollLength))
      setProgress(percent)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // Init on mount
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionRef, scrollLength])

  return progress
}

export function useSectionMultiStepProgress(
  sectionRef: React.RefObject<HTMLElement>,
  stepScrolls: number[] = [400]
) {
  const [step, setStep] = useState(0)
  const [stepProgress, setStepProgress] = useState(0)
  const [overallProgress, setOverallProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const scrolled = Math.max(0, -rect.top)

      // Calculate which step we're in
      let cumulative = 0
      let currentStep = 0

      for (let i = 0; i < stepScrolls.length; i++) {
        if (scrolled >= cumulative + stepScrolls[i]) {
          cumulative += stepScrolls[i]
          currentStep = i + 1
        } else {
          break
        }
      }

      // Clamp step to valid range
      currentStep = Math.min(currentStep, stepScrolls.length - 1)

      // Progress within current step
      const prevCumulative = stepScrolls
        .slice(0, currentStep)
        .reduce((a, b) => a + b, 0)
      const thisStepLength = stepScrolls[currentStep]
      const inStep = scrolled - prevCumulative
      const inStepProgress = Math.min(1, Math.max(0, inStep / thisStepLength))

      // Overall progress (from 0 to 1 across all steps)
      const totalLength = stepScrolls.reduce((a, b) => a + b, 0)
      const overall = Math.min(1, scrolled / totalLength)

      setStep(currentStep)
      setStepProgress(inStepProgress)
      setOverallProgress(overall)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionRef, stepScrolls])

  return { step, stepProgress, overallProgress }
}
