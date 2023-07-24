'use client'

import { Metadata } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMainFeed, selectMainFeedState } from './redux/store/main-feed-slice'
import { Card, CardContent, Typography, CardActions, Button, Divider } from '@mui/material'

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
      {
        mainFeedState.threadList.map((thread, id) => {
          return <>
            <Card key={id} sx={{ minWidth: 275 }}>
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
            </Card>
            <Divider />
          </>
        })
      }
    </div>
  )
}