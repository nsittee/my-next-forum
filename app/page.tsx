'use client'
import { Metadata } from 'next'
import { Provider } from 'react-redux'
import { wrapper } from '../store/store'
import { AppProps } from 'next/app'

export const metadata: Metadata = {
  title: 'MyForum',
}

export default function Page({ pageProps }: AppProps) {
  return (
    <Provider store={wrapper.useWrappedStore(pageProps).store}>
      <div>
        Root Page
      </div>
    </Provider>
  )
}