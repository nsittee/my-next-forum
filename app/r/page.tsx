'use client'

import { Card } from '@mui/material'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sub List',
}

async function getData() {
  const res = await fetch(`/api/v1/thread/all`, {
    cache: 'force-cache'
    // cache: 'no-store'
  })
}

export default function Page() {
  return <Card>
    Sub List Page
  </Card>
}