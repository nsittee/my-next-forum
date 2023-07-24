'use client'

import { Metadata } from 'next'
import { useContext, useState } from 'react'
import { Provider } from 'react-redux'
import { wrapper } from './redux/store'
import { DrawerContext } from '../context/drawerContext'
import { Box, CssBaseline, Toolbar, styled } from '@mui/material'
import { XFooter } from '../layout/XFooter'
import { XHeader } from '../layout/XHeader'
import { XSidebar, drawerWidth } from '../layout/XSidebar'
import { StyledLayout } from '../layout/Layout'

const CenterLayout = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

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
            <StyledLayout>
              {children}
            </StyledLayout>
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