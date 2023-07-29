'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"

const SigninPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return <div>
    LoginPage
    <div>
      <input
        value={username}
        onChange={e => { setUsername(e.target.value) }}
        placeholder="username" />
      <input
        type="password"
        value={password}
        onChange={e => { setPassword(e.target.value) }}
        placeholder="password" />
      <button
        onClick={() => {
          signIn("credentials", {
            username,
            password,
            redirect: true,
            callbackUrl: "/",
          })
        }}
      >login</button>
    </div>
  </div>
}

export default SigninPage