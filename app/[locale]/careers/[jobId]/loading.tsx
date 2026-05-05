export default function CareerDetailLoading() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-[700px] animate-pulse px-6 py-10 sm:py-14">
        {/* Back link skeleton */}
        <div className="border-border mb-10 border-b pb-6">
          <div className="h-4 w-36 rounded bg-gray-200" />
        </div>

        {/* Badge skeleton */}
        <div className="mb-6 h-6 w-28 rounded bg-gray-200" />

        {/* Title skeleton */}
        <div className="mb-3 h-10 w-full rounded bg-gray-200" />
        <div className="mb-6 h-10 w-3/4 rounded bg-gray-200" />

        {/* Meta skeleton */}
        <div className="mb-12 flex gap-6">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-4 w-36 rounded bg-gray-200" />
        </div>

        {/* Body skeleton */}
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-4/5 rounded bg-gray-200" />
        </div>
      </div>
    </main>
  )
}
