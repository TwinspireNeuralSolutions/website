export const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <h1 className={`text-8xl font-bold uppercase ${className}`}>{children}</h1>
  )
}

export default Heading
