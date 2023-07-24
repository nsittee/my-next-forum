'use client'
import { Metadata } from 'next'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMainFeed, resetMainFeedState, selectMainFeedState } from './redux/store/main-feed-slice'
import { selectAuthState } from './redux/store/auth-slice'

export const metadata: Metadata = {
  title: 'MyForum',
}

export default function Page({ pageProps }: AppProps) {
  const dispatch = useDispatch()
  const mainFeedState = useSelector(selectMainFeedState)

  useEffect(() => {
    dispatch(getMainFeed())
  }, [dispatch])

  return (
    <div>
      Thread List
      Total Thread: {mainFeedState.threadList.length}
      <section>
        {
          mainFeedState.threadList.map(thread => {
            return <div>
              <p>{thread._id}</p>
              <p>{thread.Title}</p>
            </div>
          })
        }
      </section>
    </div>
  )
}