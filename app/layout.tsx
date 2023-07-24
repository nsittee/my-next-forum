'use client'

import { Metadata } from 'next'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { DrawerContext } from '../shared/context/drawerContext'
import { CenterLayout } from '../src/layout/Layout'
import { wrapper } from '../src/redux/store'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true)

  var drawerContextValue = {
    open: open, setOpen: (value: boolean) => setOpen(value),
  }

  return (
    <html lang="en">
      <body>
        <DrawerContext.Provider value={drawerContextValue}>
          <Provider store={wrapper.useWrappedStore({ initialState: {} }).store}>
            <CenterLayout>
              {children}
            </CenterLayout>
          </Provider>
        </DrawerContext.Provider>
      </body>
    </html >
  )
}

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}