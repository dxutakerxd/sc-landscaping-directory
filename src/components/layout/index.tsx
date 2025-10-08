import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import type { ReactNode } from 'react'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col mx-auto h-screen">
      <nav className="relative z-20 border-b border-gray-200 py-5 shadow-[0_0_15px_0_rgb(0,0,0,0.1)]">
        <div className="flex items-center justify-between px-14 mx-auto max-w-7xl lg:px-6">
          <div className="flex flex-row items-center">
            <Link className="no-underline transition-colors" href="/">
              <span>
                <svg height={26} viewBox="0 0 75 65" fill="#000">
                  <title>Vercel Logo</title>
                  <path d="M37.59.25l36.95 64H.64l36.95-64z" />
                </svg>
              </span>
            </Link>
          </div>
          <div className="flex flex-1 justify-end md:flex">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}
