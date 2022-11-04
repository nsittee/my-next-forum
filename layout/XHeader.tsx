import { Menu } from '@mui/icons-material'
import { AppBar, Button, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TOKEN_KEY } from '../constant/app-constant'
import { authenticate, resetAuthState, selectAuthState } from '../store/authSlice'
import { drawerWidth } from './XSidebar'

export const XHeader = (props: any) => {
  const authState = useSelector(selectAuthState)
  const [username, setUsername] = useState<string>('')
  const dispatch = useDispatch()

  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <CssBaseline />
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          app_name
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  )

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
        <Link href={{ pathname: `/profile` }}>
          <button> Profile </button>
        </Link>
        <Link href={{ pathname: `/admin` }}>
          <button> Admin </button>
        </Link>
        <Link href={{ pathname: `/moderator` }}>
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
