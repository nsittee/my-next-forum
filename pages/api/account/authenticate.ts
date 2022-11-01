import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '.'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405)

  const username = req.body.username
  const password = req.body.password

  const signedJwt = jwt.sign({
    username,
    password
  },
    JWT_SECRET,
  )

  res.status(200).send(signedJwt)
}
