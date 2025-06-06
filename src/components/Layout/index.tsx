const Layout = ({
  children,
  id,
  sectionClassName,
  className,
}: {
  children: React.ReactNode
  id?: string
  sectionClassName?: string
  className?: string
}) => {
  return (
    <section
      id={id}
      className={`px-10 py-15 md:px-20 md:py-30 ${sectionClassName}`}
    >
      <div className={`mx-auto max-w-[1400px] ${className}`}>{children}</div>
    </section>
  )
}

export default Layout
