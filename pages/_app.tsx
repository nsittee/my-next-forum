import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { Layout } from '../layout/Layout'
import { wrapper } from '../store/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
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
  )
}

export default MyApp
