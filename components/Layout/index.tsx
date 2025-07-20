interface LayoutProps {
  children: React.ReactNode
  id?: string
  sectionClassName?: string
  className?: string
  ref?: React.RefObject<HTMLElement>
}

const Layout = ({
  children,
  id,
  sectionClassName,
  className,
  ref,
}: LayoutProps) => {
  return (
    <section
      ref={ref}
      id={id}
      className={`px-10 py-15 md:px-20 md:py-30 ${sectionClassName ?? ''} m-w-[100vw]`}
    >
      <div className={`mx-auto max-w-[1400px] ${className ?? ''}`}>
        {children}
      </div>
    </section>
  )
}

export default Layout
