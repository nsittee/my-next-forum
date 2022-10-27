import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { USERNAME_KEY } from '../constant/app-constant'
import { selectAuthState, setAuthState } from '../store/authSlice'

export const MyHeader = (props: any) => {
  const authState = useSelector(selectAuthState)
  const [username, setUsername] = useState<string>('')
  const dispatch = useDispatch()

  // const [authenticated, setAuthenticated] = useState(authState.authState)

  return (
    <div style={{
      backgroundColor: "gray",
    }}>
      <div style={{
        // margin: "0 50%"
      }}>
        {
          !authState.authenticate ?
            <div>
              <input onChange={(e) => setUsername(e.target.value)} />
              <button disabled={username === ''} onClick={() => {
                window.localStorage.setItem(USERNAME_KEY, username)
                dispatch(setAuthState({
                  authenticate: true,
                  username: username
                }))
              }}>
                sign in
              </button>
            </div>
            :
            <div>
              {authState.username}
              <button onClick={() => {
                window.localStorage.removeItem(USERNAME_KEY)
                setUsername('')
                dispatch(setAuthState({
                  authenticate: false,
                  username: ''
                }))
              }}>
                sign out
              </button>
            </div>
        }
      </div>
    </div>
  )
}
