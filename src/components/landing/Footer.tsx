'use client';

export function Footer() {
  return (
    <footer className="py-12 bg-gray-800 text-white">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} LocalRank AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
