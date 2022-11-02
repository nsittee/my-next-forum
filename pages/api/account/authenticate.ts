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
  const sub = req.body.username
  const auth = 'ROLE_ADMIN,ROLE_MODERATOR,ROLE_USER'

  const signedJwt = jwt.sign({
    username,
    sub,
    auth
  },
    JWT_SECRET, {
    expiresIn: '45m'  // or '1h'
  }
  )

  res.status(200).send(signedJwt)
}
