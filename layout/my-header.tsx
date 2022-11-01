import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { USERNAME_KEY } from '../constant/app-constant'
import { authenticate, resetAuthState, selectAuthState } from '../store/authSlice'

export const MyHeader = (props: any) => {
  const authState = useSelector(selectAuthState)
  const [username, setUsername] = useState<string>('')
  const dispatch = useDispatch()

  return (
    <div style={{
      backgroundColor: "gray",
    }}>
      {
        !authState.authenticate ?
          <div>
            <input onChange={(e) => setUsername(e.target.value)} />
            <button disabled={username === ''} onClick={() => {
              dispatch(authenticate({
                username: username,
                password: '123456'
              }))
            }}>
              sign in
            </button>
          </div>
          :
          <div>
            {authState.username}
            <button onClick={() => {
              window.localStorage.removeItem('TOKEN')
              setUsername('')
              dispatch(resetAuthState())
            }}>
              sign out
            </button>
          </div>
      }
    </div>
  )
}
