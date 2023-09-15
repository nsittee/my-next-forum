import { threadService } from '@/server/service/thread-service'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const threadId = req.query["threadId"]
  if (threadId === undefined) return
  if (typeof threadId !== "string") return

  const thread = await threadService.getThreadFromId(threadId)
  res.status(200).json({
    message: null,
    data: {
      thread: thread,
    }
  })
}
