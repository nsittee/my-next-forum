'use client'

import { Metadata } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, Typography, CardActions, Button, Divider } from '@mui/material'
import { getMainFeed, selectMainFeedState } from '../src/redux/store/main-feed-slice'

export const metadata: Metadata = {
  title: 'MyForum',
}

async function getData() {
  const res = await fetch(`/api/v1/thread/all`, {
    cache: 'force-cache'
    // cache: 'no-store'
  })
  const resJson = await res.json()
  console.log(resJson.data)
  return resJson
}

export default function Page() {
  const dispatch = useDispatch()
  const mainFeedState = useSelector(selectMainFeedState)

  useEffect(() => {
    // getData()
    dispatch(getMainFeed())
  }, [dispatch])

  return (
    <div>
      {
        mainFeedState.threadList.map((thread, id) => {
          return <Card key={id} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {thread.Author?.Username}
              </Typography>
              <Typography variant="h5" component="div">
                {thread.Title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {thread.CreatedDate}
              </Typography>
              <Typography variant="body2">
                {thread.Content}
                <br />
                {thread.Upvote}
                <br />
                {thread.Downvote}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
            <Divider />
          </Card>
        })
      }
    </div>
  )
}