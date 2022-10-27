import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../store/store'
import { MainLayout } from '../layout/main-layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default wrapper.withRedux(MyApp)
