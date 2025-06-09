import React from 'react'

export const H1 = ({
  children,
  className = '',
  style = {},
  progress,
  color = 'white',
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  progress?: number
  color?: 'white' | 'black'
}) => {
  const hasProgress = typeof progress === 'number'

  const safeProgress = hasProgress
    ? Math.min(1, Math.max(0, Number(progress)))
    : undefined

  return (
    <h1
      className={`max-w-5xl text-8xl font-bold uppercase md:text-6xl lg:text-8xl ${color === 'white' ? 'text-white' : 'text-black'} ${className}`}
      style={
        hasProgress
          ? {
              backgroundImage:
                'linear-gradient(to bottom, #fff 50%, #9ca3af 50%)',
              backgroundSize: '100% 200%',
              backgroundPosition: `0 ${100 - safeProgress! * 100}%`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              // Make the transition slower and super smooth:
              transition: 'background-position .3s cubic-bezier(0.4,0,0.2,1)',
              ...style,
            }
          : {
              ...style,
            }
      }
    >
      {children}
    </h1>
  )
}

export const H2 = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <h2 className={`max-w-5xl text-5xl font-bold uppercase ${className}`}>
      {children}
    </h2>
  )
}
export const H3 = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <h3 className={`text-1xl max-w-5xl font-bold uppercase ${className}`}>
      {children}
    </h3>
  )
}
