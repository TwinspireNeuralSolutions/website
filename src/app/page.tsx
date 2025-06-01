import { Navbar } from '@/components'

import heroImage from '@/public/images/hero.jpeg'

export default function Home() {
  return (
    <>
      <Navbar />

      <main style={{ minHeight: '4000px' }}>
        {/* Section 1: Hero Section */}
        <div
          className="h-screen w-full bg-cover bg-center text-white"
          style={{
            backgroundImage: `url(${heroImage.src})`,
            width: '100%',
            height: '100vh',
            filter: 'grayscale(100%)',
          }}
        ></div>
        {/* Section 2: About Section */}
        <div></div>
      </main>
      <footer></footer>
    </>
  )
}
