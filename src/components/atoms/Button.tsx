export const Button = ({
  children,
  className,
  onClick,
  color = 'blue',
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  color?: 'blue' | 'white'
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-md cursor-pointer rounded-full px-6 py-2 font-normal shadow-md transition ${
        color === 'blue'
          ? 'bg-[#0802A3] text-white hover:bg-[#001060]'
          : 'bg-white text-black hover:bg-[#e0e0e0]'
      } ${className}`}
    >
      {children}
    </button>
  )
}
