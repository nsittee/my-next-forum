import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
                // setAuthenticated(true)
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
                // setAuthenticated(false)
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
