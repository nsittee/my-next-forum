import { threadService } from '@/server/service/thread-service'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // const subId = threadService.getSubFromId()
  const list = await threadService.getAll()
  res.status(200).json({
    message: null,
    data: {
      _id: '',
      SubThread: list
    }
  })
}
