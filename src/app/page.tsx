import { Navbar } from '@/components'

export default function Home() {
  return (
    <>
      <Navbar />

      <main style={{ minHeight: '4000px' }}>
        {/* Section 1: Hero Section */}
        <section id="home" className="relative h-screen w-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 h-full w-full object-cover grayscale"
          >
            <source src="/hero-veido.mp4" type="video/mp4" />
          </video>
          <div className="relative flex h-screen w-full flex-col items-center justify-center text-white">
            <h1 className="mb-4 text-center text-7xl font-extrabold uppercase">
              TWINPSIRE
            </h1>

            <h1 className="mb-4 text-center text-6xl font-extrabold uppercase">
              Neural Solutions
            </h1>
            <h2 className="mt-6text-center text-2xl">
              Predicting Performance, Preventing Failures
            </h2>
            <div className="mt-20 flex flex-row gap-4">
              <button className="text-md cursor-pointer rounded-full bg-white px-6 py-2 font-normal text-black shadow-md transition hover:bg-[#e0e0e0]">
                Apply as a Team
              </button>
              <button className="text-md cursor-pointer rounded-full bg-[#060e96] px-6 py-2 font-normal text-white shadow-md transition hover:bg-[#001060]">
                Apply as a Therapist
              </button>
            </div>
          </div>
        </section>
        {/* Section 2*/}
        <section id="solutions"></section>
      </main>
      <footer></footer>
    </>
  )
}
