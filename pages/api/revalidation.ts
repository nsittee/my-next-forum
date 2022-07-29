import type { NextApiRequest, NextApiResponse } from 'next'

// call GET on http://localhost:3000/api/revalidation?subName=${subName}&threadId=${threadId}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  // if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
  //   return res.status(401).json({ message: 'Invalid token' })
  // }

  const subName = req.query.subName
  const threadId = req.query.threadId
  try {
    await res.revalidate(`/r/${subName}/${threadId}`)
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
