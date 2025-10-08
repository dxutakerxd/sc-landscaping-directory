'use client'

import { useUser } from '@clerk/nextjs'
import {
  ClipboardCopyIcon,
  InfoCircledIcon,
  MagicWandIcon,
  RocketIcon,
} from '@radix-ui/react-icons'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// --- Types ---
type UserData = { id: string; Tier?: string; [key: string]: any }
type ListingData = { id: string; 'AI Score'?: number; Services?: string; [key: string]: any }
type OptimizationSuggestion = {
  original_score: number
  optimized_services: string
  optimization_summary: string
  new_score: number
}

export default function DashboardPage() {
  // --- State Management ---
  const { isLoaded, isSignedIn, user } = useUser()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [listingData, setListingData] = useState<ListingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [isEditingServices, setIsEditingServices] = useState(false)
  const [editableServices, setEditableServices] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [scanUrl, setScanUrl] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [showComparisonDialog, setShowComparisonDialog] = useState(false)
  const [optimizationSuggestion, setOptimizationSuggestion] =
    useState<OptimizationSuggestion | null>(null)

  // --- Data Fetching ---
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const syncAndFetchData = async () => {
        try {
          const primaryEmail = user.primaryEmailAddress?.emailAddress
          if (!primaryEmail) throw new Error('Primary email not found.')
          await fetch('/api/sync-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: primaryEmail }),
          })
          const response = await fetch('/api/get-user-data')
          if (!response.ok) throw new Error(`API Error: ${response.status} ${response.statusText}`)
          const data = await response.json()
          setUserData(data.user)
          setListingData(data.listing)
        } catch (e: any) {
          setError(e.message)
        } finally {
          setIsLoading(false)
        }
      }
      syncAndFetchData()
    } else if (isLoaded) {
      setIsLoading(false)
    }
  }, [isLoaded, isSignedIn, user])

  // --- Event Handlers ---
  const handleInitialScan = async () => {
    if (!listingData || !scanUrl) return
    setIsScanning(true)
    setError(null)
    try {
      const response = await fetch('/api/initial-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: listingData.id, url: scanUrl }),
      })
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Failed to perform scan.')
      }
      const updatedFields = await response.json()
      setListingData((prev) => (prev ? { ...prev, ...updatedFields } : null))
      toast.success('Initial scan complete! Your listing and score have been updated.')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsScanning(false)
    }
  }

  const handleOptimize = async () => {
    if (!listingData || !userData) return
    setIsOptimizing(true)
    setError(null)
    try {
      const response = await fetch('/api/optimize-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listingData.id,
          businessName: userData['Business Name'],
          currentServices: listingData.Services,
        }),
      })
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Failed to optimize listing.')
      }
      const suggestion = await response.json()
      setOptimizationSuggestion(suggestion)
      setShowComparisonDialog(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsOptimizing(false)
    }
  }

  const handleAcceptOptimization = () => {
    if (!optimizationSuggestion) return
    handleSaveListing({
      Services: optimizationSuggestion.optimized_services,
      'AI Score': optimizationSuggestion.new_score,
    })
    setShowComparisonDialog(false)
  }

  const handleSaveListing = async (fieldsToSave: object) => {
    if (!listingData) return
    setIsSaving(true)
    try {
      const response = await fetch('/api/update-listing-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ airtableRecordId: listingData.id, ...fieldsToSave }),
      })
      if (!response.ok) throw new Error('Failed to save changes.')
      const updatedFields = await response.json()
      setListingData((prev) => (prev ? { ...prev, ...updatedFields } : null))
      setIsEditingServices(false)
      toast.success('Your listing has been updated!')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCopyToClipboard = () => {
    if (!listingData?.Services) return
    navigator.clipboard.writeText(listingData.Services)
    toast.success('Services description copied to clipboard!')
  }

  // --- Render Logic ---
  if (isLoading) return <div className="p-8">Loading Dashboard...</div>
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>
  if (!isSignedIn) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <Button asChild className="mt-4">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-lg text-gray-600 mt-1">Welcome back, {user?.firstName || 'User'}!</p>
          </div>
          {userData?.Tier === 'Paid' ? (
            <Badge className="mt-2 sm:mt-0 text-base" variant="secondary">
              Premium Tier
            </Badge>
          ) : (
            <Badge className="mt-2 sm:mt-0 text-base" variant="outline">
              Free Tier
            </Badge>
          )}
        </div>

        {listingData && !listingData.Services && (
          <Card className="shadow-md bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MagicWandIcon className="h-6 w-6 text-purple-600" /> Get Your Free AI Score
              </CardTitle>
              <CardDescription>
                Let AI analyze your online presence to generate a baseline for your services and AI
                Visibility Score.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder="https://your-business-website.com"
                  value={scanUrl}
                  onChange={(e) => setScanUrl(e.target.value)}
                />
                <Button onClick={handleInitialScan} disabled={isScanning || !scanUrl}>
                  {isScanning ? 'Scanning...' : 'Get My Score'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {listingData && listingData.Services && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Your Listing Preview</CardTitle>
              <CardDescription>
                This is how your listing appears to AI search engines. Use the tools below to
                improve it.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                <strong className="font-semibold text-gray-700">Business Name:</strong>{' '}
                {userData?.['Business Name'] || 'Not set'}
              </p>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <strong className="font-semibold text-gray-700">Services Description:</strong>
                  <div className="flex items-center gap-2">
                    {userData?.Tier === 'Paid' && !isEditingServices && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setIsEditingServices(true)
                          setEditableServices(listingData.Services || '')
                        }}
                      >
                        Edit
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={handleCopyToClipboard}>
                      <ClipboardCopyIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {isEditingServices ? (
                  <div className="space-y-2">
                    <Textarea
                      value={editableServices}
                      onChange={(e) => setEditableServices(e.target.value)}
                      className="min-h-[120px]"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSaveListing({ Services: editableServices })}
                        disabled={isSaving}
                      >
                        {isSaving ? 'Saving...' : 'Save'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditingServices(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-800 p-3 bg-gray-50 rounded-md border">
                    {listingData.Services || 'Not set'}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  <b>Action:</b> Copy this text and use it on your Google Business Profile, Yelp,
                  Facebook, etc., to improve your visibility.
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <p className="text-base font-semibold">AI Visibility Score</p>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoCircledIcon className="h-4 w-4 text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          This score represents how well your listing is optimized for AI search
                          engines. Higher is better!
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-4xl font-bold text-green-600">
                    {listingData['AI Score'] || 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end items-center bg-gray-50 p-4 rounded-b-lg">
              {userData?.Tier === 'Paid' && (
                <Button
                  onClick={handleOptimize}
                  disabled={isOptimizing || !listingData || !listingData.Services}
                >
                  {isOptimizing ? 'Optimizing...' : 'Optimize with AI'}
                </Button>
              )}
            </CardFooter>
          </Card>
        )}

        {userData?.Tier !== 'Paid' && listingData?.Services && (
          <Alert>
            <RocketIcon className="h-4 w-4" />
            <AlertTitle className="font-bold">Upgrade to Premium!</AlertTitle>
            <AlertDescription className="space-y-2">
              <p>
                Your score is {listingData['AI Score'] || 'N/A'}. Unlock our AI tools to improve it,
                edit your listing, and get more features for just $7/mo.
              </p>
              <Button variant="secondary" className="mt-2">
                Upgrade Now
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </div>

      <Dialog open={showComparisonDialog} onOpenChange={setShowComparisonDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>AI Optimization Suggestion</DialogTitle>
            <DialogDescription>{optimizationSuggestion?.optimization_summary}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6 py-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Before</h3>
                <Badge variant="outline">Score: {optimizationSuggestion?.original_score}</Badge>
              </div>
              <p className="p-4 bg-gray-100 rounded-md text-sm text-gray-700 h-48 overflow-y-auto">
                {listingData?.Services}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">After (AI Suggestion)</h3>
                <Badge className="bg-green-100 text-green-800">
                  Score: {optimizationSuggestion?.new_score}
                </Badge>
              </div>
              <p className="p-4 bg-green-50 rounded-md text-sm text-green-900 h-48 overflow-y-auto">
                {optimizationSuggestion?.optimized_services}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowComparisonDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAcceptOptimization}>Accept & Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}
