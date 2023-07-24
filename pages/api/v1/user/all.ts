import dbConnect from '@/server/config/db-config'
import { User } from '@/server/model/user-model'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect()
  const list = await User.find().exec()
  res.status(200).json(list)
}
