import { Metadata } from 'next'
import Link from 'next/link'

export default function SubLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Link href={'/'}>
        HOME
      </Link>
      {children}
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Next13',
}