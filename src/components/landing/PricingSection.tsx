'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Start for free, then scale as you grow. Simple, transparent pricing.</p>
        
        <div className="flex justify-center items-center space-x-4 mb-10">
          <span className={cn('font-medium', { 'text-blue-600': billingCycle === 'monthly' })}>Monthly</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="billing-toggle" className="sr-only peer" onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')} />
            <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
          <span className={cn('font-medium', { 'text-blue-600': billingCycle === 'yearly' })}>
            Yearly <span className="text-green-600 font-semibold">(Save 15%)</span>
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
          {/* Free Tier */}
          <div className="pricing-card bg-gray-50 p-8 rounded-xl text-left">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <p className="text-gray-500 mb-6">For businesses getting started.</p>
            <p className="text-4xl font-extrabold mb-6">$0<span className="text-base font-medium text-gray-500">/month</span></p>
            <Link href="/sign-up" className="w-full text-center cta-button bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-300">Get Started</Link>
            <ul className="mt-8 space-y-4 text-gray-600">
              <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>Basic AI Search Analysis</li>
              <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>1 Connected Location</li>
              <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>Monthly Performance Report</li>
            </ul>
          </div>

          {/* Standard Tier */}
          <div className="pricing-card popular bg-white p-8 rounded-xl text-left relative">
            <span className="absolute top-0 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
            <h3 className="text-2xl font-bold mb-2 text-blue-600">Standard</h3>
            <p className="text-gray-500 mb-6">For growing businesses.</p>
            <p className="text-4xl font-extrabold mb-6">
              <span className={cn({ 'hidden': billingCycle === 'yearly' })}>$10</span>
              <span className={cn({ 'hidden': billingCycle === 'monthly' })}>$8.50</span>
              <span className="text-base font-medium text-gray-500">/month</span>
            </p>
            <Link href="/sign-up" className="w-full text-center cta-button bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700">Choose Standard</Link>
            <ul className="mt-8 space-y-4 text-gray-600">
              <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>Everything in Free, plus:</li>
              <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>Continuous AI Optimization</li>
              <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>Voice Search Readiness</li>
              <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>Hyperlocal Targeting</li>
              <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>Email Support</li>
            </ul>
          </div>

          {/* Boosted Tier */}
          <div className="pricing-card bg-gray-50 p-8 rounded-xl text-left">
            <h3 className="text-2xl font-bold mb-2">Boosted</h3>
            <p className="text-gray-500 mb-6">For market leaders.</p>
            <p className="text-4xl font-extrabold mb-6">
              <span className={cn({ 'hidden': billingCycle === 'yearly' })}>$25</span>
              <span className={cn({ 'hidden': billingCycle === 'monthly' })}>$21.25</span>
              <span className="text-base font-medium text-gray-500">/month</span>
            </p>
            <Link href="/sign-up" className="w-full text-center cta-button bg-gray-800 text-white font-semibold py-3 rounded-lg hover:bg-gray-900">Choose Boosted</Link>
            <ul className="mt-8 space-y-4 text-gray-600">
              <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>Everything in Standard, plus:</li>
              <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>Generative AI Content</li>
              <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>Competitor Analysis</li>
              <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>Up to 3 Locations</li>
              <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>Priority Support</li>
            </ul>
          </div>
        </div>
        <div className="mt-12">
          <div className="inline-block bg-teal-100 text-teal-800 rounded-lg p-4">
            <strong>Special Offer:</strong> Subscribe for 2 years and get a <strong className="font-bold">25% discount!</strong> <a href="#" className="font-bold underline">Contact us</a> for details.
          </div>
        </div>
      </div>
    </section>
  );
}
