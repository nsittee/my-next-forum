import dbConnect from '@/server/config/db-config'
import { Sub } from '@/server/model/sub-model'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect()
  const list = await Sub.find().exec()
  res.status(200).json(list)
}
