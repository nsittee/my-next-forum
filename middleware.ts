import { withAuth } from 'next-auth/middleware'

const formatTimestamp = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` +
    `T` +
    `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`
}

// This funtion can't be active at the same time as the default export
// This function can be marked `async` if using`await` inside
// export const middleware = async (req: NextRequest, res: NextResponse) => {
//   const timestamp = formatTimestamp(new Date())
//   console.log(`${timestamp}|${req.method}|${req.nextUrl.pathname}`)
// }

export const config = {
  matcher: [
    '/((?!_next/static|favicon.ico).*)',
    '/setting'
  ],
}

const adminPage = [
  "/setting",
]
// This is the only middleware
const withAuthMiddleware = withAuth(
  // `withAuth` augments your `Request` with the user's token.
  (req) => {
    const timestamp = formatTimestamp(new Date())
    console.log(`${timestamp}|${req.method}|${req.nextUrl.pathname}`)
  },
  {
    secret: "secret",
    callbacks: {
      authorized({ req, token }) {
        const pathName = req.nextUrl.pathname
        if (token) {
          const userAuth = ((token as any).auth) as string[]
          if (adminPage.includes(pathName)) {
            return userAuth.includes("admin")
          }
        }

        if (token) return true // If there is a token, the user is authenticated
        // if (req.nextUrl.pathname === "/setting") {
        //   return token?.userRole === "admin"
        // }
        // `/me` only requires the user to be logged in
        return true
      },
    },
  })

export default withAuthMiddleware