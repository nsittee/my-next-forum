import type { NextRequest } from 'next/server'

const formatTimestamp = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` +
    `T` +
    `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`
}

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const timestamp = formatTimestamp(new Date())

  if (req.nextUrl.pathname.startsWith("/api")) {
    // TODO: Verify bearer token
    const token = req.cookies.get("tokenHttpOnly")?.value || ""
    console.log(`${timestamp}|${req.method}|${req.nextUrl.pathname}|${req.mode}|${token.substring(0, 10)}`)
  }

}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|favicon.ico).*)',
  ],
}