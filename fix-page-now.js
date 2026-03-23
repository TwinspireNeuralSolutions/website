#!/usr/bin/env node
const fs = require('fs')

const content = `export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="mx-auto max-w-md space-y-8 px-4 text-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Welcome
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Please sign in to access the platform
          </p>
        </div>
        
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <a
            href="/admin"
            className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go to Admin Login
          </a>
        </div>
      </div>
    </div>
  )
}
`

fs.writeFileSync(
  '/Users/daryankamalifar/Development/tns/website/app/page.tsx',
  content
)
console.log('✅ Fixed page.tsx')
