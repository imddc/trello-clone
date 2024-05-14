import { RedirectToSignIn } from '@clerk/nextjs'
import { authMiddleware, clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// export default clerkMiddleware({})
export default authMiddleware({
  publicRoutes: ['/'],
  // @ts-expect-error ts-expect-error
  afterAuth: async (auth, req) => {
    const { orgId, userId, isPublicRoute } = auth
    if (userId && isPublicRoute) {
      let path = '/select-org'

      if (orgId) {
        path = `/organization/${orgId}`
      }

      const orgSelection = new URL(path, req.url)
      console.log(orgSelection, 'orgSelection')
      return NextResponse.redirect(orgSelection)
    }

    if (!userId && !isPublicRoute) {
      return RedirectToSignIn({ redirectUrl: req.url })
    }

    if (userId && !orgId && req.nextUrl.pathname !== '/select-org') {
      const orgSelection = new URL('select-org', req.url)
      return NextResponse.redirect(orgSelection)
    }
  }
})

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
