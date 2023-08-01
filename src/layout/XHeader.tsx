import { Menu } from '@mui/icons-material'
import { AppBar, Box, Button, Card, CardContent, CssBaseline, Dialog, IconButton, Toolbar, Typography } from '@mui/material'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useContext, useState } from 'react'
import { DrawerContext } from '../context/drawerContext'

export const XHeader = (props: any) => {
  const session = useSession()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [signInDialog, setSignInDialog] = useState(false)
  const drawerContext = useContext(DrawerContext)

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
        {
          session.status === "loading" ?
            <Button color="inherit" onClick={() => setSignInDialog(true)}>Login</Button>
            :
            session.status === "authenticated" ?
              <Button color="inherit" onClick={() => setSignInDialog(true)}>{session.data.user?.name}</Button>
              :
              <Button color="inherit" onClick={() => setSignInDialog(true)}>Login</Button>

        }
      </Toolbar>
      <Dialog
        open={(signInDialog)}
        onClose={() => setSignInDialog(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Card>
            <CardContent>
              {
                session.status === "authenticated" ?
                  <>
                    <button>{session.data.user?.name}</button>
                    <button
                      onClick={() => {
                        // TODO
                        signOut()
                      }}>
                      sign out
                    </button>
                  </>
                  :
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
              }
            </CardContent>
          </Card>
        </Box>
      </Dialog>
    </AppBar>
  )
}
