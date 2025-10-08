import { SignedIn, SignedOut } from '@clerk/nextjs'

export default function RootPage() {
  return (
    <main className="flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">SC Landscaping Directory</h1>
      <p className="text-lg text-slate-700 max-w-2xl mx-auto">
        The best place for South Carolina's landscaping professionals to get discovered. We use AI
        to optimize your listing for modern search engines.
      </p>

      <div className="mt-8">
        <SignedIn>
          <p className="text-green-600">
            Welcome back! You can manage your account and dashboard using the links in the header.
          </p>
        </SignedIn>
        <SignedOut>
          <p className="text-blue-600">
            Sign up or sign in to create your free listing and get started.
          </p>
        </SignedOut>
      </div>
    </main>
  )
}
