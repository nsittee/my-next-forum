'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"

const SigninPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return <div>
    <>
      <label>username: </label>
      <input onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>password: </label>
      <input onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button
        disabled={username === ''}
        onClick={() => {
          signIn("credentials", {
            username: username,
            password: password,
            redirect: true,
            callbackUrl: "/",
          })
        }}>
        sign in
      </button>
    </>
  </div>
}

export default SigninPage