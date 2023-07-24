'use client'

import { Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [counter, setCounter] = useState(0)

  return (
    <html lang="en">
      <body>
        <button onClick={() => setCounter(counter + 1)}>
          {counter}
        </button>

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