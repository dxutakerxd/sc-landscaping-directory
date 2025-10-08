'use client'

import { useState } from 'react'

interface UpgradeButtonProps {
  priceId: string
  airtableRecordId: string
}

export default function UpgradeButton({ priceId, airtableRecordId }: UpgradeButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, airtableRecordId }),
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={isLoading}
      className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:bg-slate-400"
    >
      {isLoading ? 'Processing...' : 'Upgrade for $7/mo'}
    </button>
  )
}
