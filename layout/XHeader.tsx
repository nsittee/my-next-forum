import { Menu } from '@mui/icons-material'
import { AppBar, Box, Button, CssBaseline, Dialog, IconButton, Toolbar, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TOKEN_KEY } from '../constant/app-constant'
import { DrawerContext } from '../context/drawerContext'
import { authenticate, resetAuthState, selectAuthState } from '../app/redux/store/store/authSlice'

export const XHeader = (props: any) => {
  const authState = useSelector(selectAuthState)
  const [username, setUsername] = useState<string>('')
  const [signInDialog, setSignInDialog] = useState(false)
  const drawerContext = useContext(DrawerContext)
  const dispatch = useDispatch()

  return (
    <AppBar
      position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    // position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >

      <CssBaseline />
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => drawerContext.setOpen(!drawerContext.open)}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          app_name
        </Typography>
        <Button color="inherit" onClick={() => setSignInDialog(true)}>Login</Button>
      </Toolbar>
      <Dialog
        open={(signInDialog)}
        onClose={() => setSignInDialog(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
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
        </Box>
      </Dialog>
    </AppBar>
  )
}
