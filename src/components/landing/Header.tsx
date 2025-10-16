'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="#" className="text-2xl font-bold text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2 h-7 w-7"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
          LocalRank AI
        </Link>
        <nav className="hidden md:flex space-x-8 items-center">
          <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a>
          <a href="#faq" className="text-gray-600 hover:text-blue-600">FAQ</a>
        </nav>
        <Link href="/sign-up" className="cta-button bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-blue-700">Get Started Free</Link>
      </div>
    </header>
  );
}
