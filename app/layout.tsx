'use client'

import { Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { DrawerContext } from '../src/context/drawerContext'
import { CenterLayout } from '../src/layout/Layout'
import { wrapper } from '../src/redux/store'
import { NextAuthProvider } from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true)

  var drawerContextValue = {
    open: open, setOpen: (value: boolean) => setOpen(value),
  }

  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <DrawerContext.Provider value={drawerContextValue}>
            <Provider store={wrapper.useWrappedStore({ initialState: {} }).store}>
              <CenterLayout>
                <Link href={"/setting"}>/setting</Link>

                {children}
              </CenterLayout>
            </Provider>
          </DrawerContext.Provider>
        </NextAuthProvider>
      </body>
    </html >
  )
}

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}