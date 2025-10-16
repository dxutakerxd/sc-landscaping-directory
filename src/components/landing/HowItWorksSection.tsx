'use client';

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">It's as easy as 1-2-3</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">Our AI handles the complexity so you can focus on what you do best: running your business.</p>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect Your Business</h3>
            <p className="text-gray-500">Securely link your Google Business Profile and other local listings in seconds.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Enhancement</h3>
            <p className="text-gray-500">Our AI analyzes your data and optimizes your online presence for conversational and predictive search queries.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"></line><line x1="18" x2="18" y1="20" y2="4"></line><line x1="6" x2="6" y1="20" y2="16"></line></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Rank Higher</h3>
            <p className="text-gray-500">Watch your business climb the ranks in new AI search platforms and attract more local customers effortlessly.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
