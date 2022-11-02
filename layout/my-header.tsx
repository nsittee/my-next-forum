import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TOKEN_KEY, USERNAME_KEY } from '../constant/app-constant'
import { authenticate, resetAuthState, selectAuthState } from '../store/authSlice'

export const MyHeader = (props: any) => {
  const authState = useSelector(selectAuthState)
  const [username, setUsername] = useState<string>('')
  const dispatch = useDispatch()

  return (
    <div style={{
      backgroundColor: 'gray',
      display: 'flex'
    }}>
      <div style={{
        width: '100%'
      }}>
        <Link href={{ pathname: `/` }}>
          <button> Home </button>
        </Link>
        <Link href={{ pathname: `Profile` }}>
          <button> Profile </button>
        </Link>
        <Link href={{ pathname: `Admin` }}>
          <button> Admin </button>
        </Link>
        <Link href={{ pathname: `Moderator` }}>
          <button> Moderator </button>
        </Link>
      </div>
      <div style={{
        width: '100%',
      }}>
        {
          !authState.authenticate ?
            <>
              <input onChange={(e) => setUsername(e.target.value)} />
              <button disabled={username === ''} onClick={() => {
                dispatch(authenticate({
                  username: username,
                  password: '123456'
                }))
              }}>
                sign in
              </button>
            </>
            :
            <>
              <button>{authState.username}</button>
              <button onClick={() => {
                window.localStorage.removeItem(TOKEN_KEY)
                setUsername('')
                dispatch(resetAuthState())
              }}>
                sign out
              </button>
            </>
        }
      </div>
    </div>
  )
}
