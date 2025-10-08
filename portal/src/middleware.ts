import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware({
  // An array of routes that should be accessible to both signed-in and signed-out users
  publicRoutes: ['/', '/sign-in', '/sign-up'],
  // Enable debug mode to get detailed authentication logs
  debug: true,
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
