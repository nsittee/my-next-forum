import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../store/store'
import { MainLayout } from '../layout/main-layout'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  )
}

export default MyApp
