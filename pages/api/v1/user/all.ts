import { userService } from '@/server/service/user-service'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const list = await userService.getAll()
  res.status(200).json(list)
}
