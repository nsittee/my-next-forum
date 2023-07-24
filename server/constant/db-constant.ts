import process from 'process'

const env = process.env

// FIXME: usage of `!` symbol
export const config = {
  dbConnection: env.DB_CONNECTION!,

  secretKey: env.SECRET!,

  accessTokenDuration: env.ACCESS_TOKEN_DURATION!,
  refreshTokenDuration: env.REFRESH_TOKEN_DURATION!
}
