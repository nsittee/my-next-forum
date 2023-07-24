import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { DrawerContext } from '../context/drawerContext'
import { Layout } from '../layout/Layout'
import '../styles/globals.css'
import { wrapper } from '../app/redux/store'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [open, setOpen] = useState(true)

  var drawerContextValue = {
    open: open, setOpen: (value: boolean) => setOpen(value),
  }

  return (
    <DrawerContext.Provider value={drawerContextValue}>
      <Provider store={wrapper.useWrappedStore(pageProps).store}>
        {
          router.asPath !== '/sign-in' ?
            <Layout>
              <Component {...pageProps} />
            </Layout>
            :
            <Component {...pageProps} />
        }
      </Provider>
    </DrawerContext.Provider>
  )
}

export default MyApp
