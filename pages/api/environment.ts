// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  environment: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const env = process.env.ENVIRONMENT ? process.env.ENVIRONMENT : ""
  res.status(200).json({ environment: env })
}
