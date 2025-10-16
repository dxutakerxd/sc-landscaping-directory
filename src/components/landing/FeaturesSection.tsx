'use client';

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">The Future of Local Search is Here</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">Gain a competitive edge with features designed for the AI revolution.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">AI Profile Optimization</h3>
            <p className="text-gray-600">Continuously updates your business info to match what AI search algorithms are looking for.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Voice Search Readiness</h3>
            <p className="text-gray-600">Structures your data to be the top answer for "near me" voice queries on Alexa, Siri, and Google Assistant.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Hyperlocal Targeting</h3>
            <p className="text-gray-600">Pinpoints neighborhood-specific keywords and trends to attract your most relevant customers.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Generative AI Content</h3>
            <p className="text-gray-600">Creates compelling, AI-friendly descriptions and updates for your business listings.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Competitor Analysis</h3>
            <p className="text-gray-600">Our AI monitors what your top competitors are doing in AI search and helps you stay one step ahead.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Performance Dashboard</h3>
            <p className="text-gray-600">A simple, clear dashboard shows you exactly how your AI ranking is improving over time.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
