import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthState, setAuthState } from '../store/authSlice'

export const MyHeader = (props: any) => {
  const authState = useSelector(selectAuthState)
  const dispatch = useDispatch()

  // const [authenticated, setAuthenticated] = useState(authState.authState)
  const [username, setUsername] = useState<string>('')

  return (
    <div style={{
      backgroundColor: "gray",
    }}>
      <div style={{
        margin: "0 50%"
      }}>

        {
          !authState.authenticate ?
            <div>
              <input onChange={(e) => setUsername(e.target.value)} />
              <button onClick={() => {
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
              {username}
              <button onClick={() => {
                // setAuthenticated(false)
                // setUsername('')
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
