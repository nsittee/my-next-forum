import dbConnect from '@/server/config/db-config'
import { Thread } from '@/server/model/thread-model'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect()
  const list = await Thread.find().exec()
  res.status(200).json(list)
}
