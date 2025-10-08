'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface OptimizeButtonProps {
  listingId: string
  services: string
  businessName: string
}

export default function OptimizeButton({ listingId, services, businessName }: OptimizeButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleOptimize = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listingId, services, businessName }),
      })

      if (response.ok) {
        // Refresh the page to show the new description and score
        router.refresh()
      }
    } catch (error) {
      console.error('Error optimizing listing:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleOptimize}
      disabled={isLoading}
      className="font-semibold text-sm text-green-600 bg-white border-2 border-green-600 rounded-full px-5 py-2 hover:bg-green-50 transition-colors disabled:opacity-50"
    >
      {isLoading ? 'Optimizing...' : 'Re-Optimize with AI'}
    </button>
  )
}
