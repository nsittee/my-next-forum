import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '.'
import { ROLES } from '../../../constant/app-roles'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405)

  const username = req.body.username
  const password = req.body.password
  const sub = req.body.username
  const auth = `${ROLES.MODERATOR},${ROLES.USER}`

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
