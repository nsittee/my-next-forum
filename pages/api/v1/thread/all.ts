import { IxThread } from '@/server/model/thread-model'
import { threadService } from '@/server/service/thread-service'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const list = await threadService.getAll()
  res.status(200).json(list)
}
