import React, { useState } from 'react'

export const MyHeader = (props: any) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [username, setUsername] = useState<string>('')

  return (
    <div style={{
      backgroundColor: "lightgreen",
    }}>
      <div style={{
        margin: "0 50%"
      }}>

        {
          !authenticated ?
            <div>
              <input onChange={(e) => setUsername(e.target.value)} />
              <button onClick={() => {
                setAuthenticated(true)
              }}>
                sign in
              </button>
            </div>
            :
            <div>
              {username}
              <button onClick={() => {
                setAuthenticated(false)
                setUsername('')
              }}>
                sign out
              </button>
            </div>
        }
      </div>
    </div>
  )
}
