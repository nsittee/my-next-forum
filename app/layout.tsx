import { Metadata } from 'next'
import Link from 'next/link'

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <div>app-bar</div>
          <Link href={'/'}>
            /
          </Link>
          <p>x</p>
          <Link href={'/next13'}>
            /next13
          </Link>
          <div>footer</div>
          {children}
        </div>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}