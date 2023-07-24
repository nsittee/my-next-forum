import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '.'
import { ROLES } from '../../../src/constant/app-roles'
import { setCookie } from 'cookies-next'
import { OptionsType } from 'cookies-next/lib/types'

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
  const option: OptionsType = {
    req,
    res,
    httpOnly: true,
    maxAge: 60 * 4 // 4 minutes
  }
  setCookie('tokenHttpOnly', signedJwt, option)
  setCookie('token', signedJwt, { ...option, httpOnly: false })

  res
    .status(200)
    .setHeader('Roles', auth)
    .send(signedJwt)
}
