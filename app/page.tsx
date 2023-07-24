'use client'
import { Metadata } from 'next'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetMainFeedState } from './redux/store/main-feed-slice'
import { selectAuthState } from './redux/store/auth-slice'

export const metadata: Metadata = {
  title: 'MyForum',
}

export default function Page({ pageProps }: AppProps) {
  const dispatch = useDispatch()
  const authState = useSelector(selectAuthState)

  useEffect(() => {
    dispatch(resetMainFeedState())
  }, [dispatch])

  return (
    <div>
      Root Page
      - {authState.authenticate} -
    </div>
  )
}