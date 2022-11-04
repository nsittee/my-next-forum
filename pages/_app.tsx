import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { Layout } from '../layout/Layout'
import { wrapper } from '../store/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps)

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
