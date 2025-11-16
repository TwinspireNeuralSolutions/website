import React from 'react'

export const Button = ({
  children,
  className,
  onClick,
  color = 'blue',
  disabled = false,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  color?: 'blue' | 'white'
  disabled?: boolean
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-md cursor-pointer rounded-full px-6 py-2 font-normal whitespace-nowrap shadow-md transition ${
        color === 'blue'
          ? 'bg-[#0802A3] text-white hover:bg-[#001060]'
          : 'bg-white text-black hover:bg-[#e0e0e0]'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  )
}
