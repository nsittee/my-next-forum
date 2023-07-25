import type { NextRequest } from 'next/server'

const formatTimestamp = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` +
    `T` +
    `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`
}

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const timestamp = formatTimestamp(new Date())
  console.log(`${timestamp}|${req.method}|${req.nextUrl}|${req.mode}`)
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}