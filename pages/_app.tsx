import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { MainLayout } from '../layout/MainLayout'
import { wrapper } from '../store/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps)

  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  )
}

export default MyApp
