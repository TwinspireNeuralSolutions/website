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
        >
          <h1>Home</h1>
        </div>
        {/* Section 2*/}
        <section id="solutions">
          <div className="h-screen w-full bg-cover bg-center text-black">
            <h1>Solutions 2</h1>
          </div>
        </section>
      </main>
      <footer></footer>
    </>
  )
}
