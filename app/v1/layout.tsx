import { Metadata } from 'next'
import Link from 'next/link'

export default function Next13Layout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Link href={'/next13/nested'}>
        /next13/nested
      </Link>
      <h3>Next13 Layout</h3>
      {children}
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Next13',
}