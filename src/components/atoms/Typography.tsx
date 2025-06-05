export const H1 = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <h1 className={`max-w-5xl text-8xl font-bold uppercase ${className}`}>
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

export default { H1, H2, H3 }
