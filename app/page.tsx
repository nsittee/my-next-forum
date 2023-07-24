'use client'
import { Metadata } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMainFeed, selectMainFeedState } from './redux/store/main-feed-slice'

export const metadata: Metadata = {
  title: 'MyForum',
}

export default function Page() {
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
          mainFeedState.threadList.map((thread, id) => {
            return <div key={id}>
              <p>{thread._id}</p>
              <p>{thread.Title}</p>
            </div>
          })
        }
      </section>
    </div>
  )
}