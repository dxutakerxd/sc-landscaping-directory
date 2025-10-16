'use client';

import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="gradient-bg pt-32 pb-20 px-6">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Be the First Choice in the <span className="text-blue-600">AI Search</span> Era.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Your local business is brilliant. We use cutting-edge AI to make sure new customers find you through AI-powered search, voice assistants, and next-gen map results.
        </p>
        <div className="mt-10">
          <Link href="#pricing" className="cta-button bg-blue-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700">Rank Higher Now</Link>
          <p className="mt-4 text-sm text-gray-500">No credit card required for free plan.</p>
        </div>
      </div>
    </section>
  );
}
