import dbConnect from '@/server/config/db-config'
import { Thread } from '@/server/model/thread-model'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  await dbConnect()
  const threadList = await Thread.find().exec()
  console.log(threadList.length)
  res.status(200).json("OK")
}
