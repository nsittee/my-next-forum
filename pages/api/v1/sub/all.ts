import { subService } from '@/server/service/sub-service'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const list = await subService.getAll()
  res.status(200).json(list)
}
