'use client';

export function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="divide-y divide-gray-200">
          <details className="faq-item group py-4">
            <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
              <span>What is AI-powered local search?</span>
              <span className="transition group-open:rotate-45">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
              AI-powered search (like Google's SGE or ChatGPT) provides users with direct, conversational answers instead of just a list of links. Our service optimizes your business information to be the top answer for these types of queries.
            </p>
          </details>
          <details className="faq-item group py-4">
            <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
              <span>How is this different from traditional SEO?</span>
              <span className="transition group-open:rotate-45">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
              While traditional SEO focuses on keywords for blue links, our AI SEO structures your data for voice assistants, AI-generated summaries, and map results. It's about being the most credible and relevant answer, not just a link.
            </p>
          </details>
          <details className="faq-item group py-4">
            <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
              <span>Can I cancel my subscription at any time?</span>
              <span className="transition group-open:rotate-45">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
              Yes, absolutely. You can cancel your monthly or yearly subscription at any time directly from your dashboard. You will retain premium access until the end of your billing period.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
