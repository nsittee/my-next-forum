import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

export const JWT_SECRET = 'secret'
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  if (req.method !== 'GET') return res.status(405).send(false)

  try {
    const token = req.headers.authorization?.split('Bearer ')[1] as string

    // invalid will throw exception
    jwt.verify(token, JWT_SECRET)
    // valid jwt, return true or some other user specific data
    return res.status(200).json(true)
  }
  catch (e) {
    console.log(e)
    return res.status(401).send(false)
  }
}
