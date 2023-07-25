import { Box, CssBaseline, styled, Toolbar } from '@mui/material'
import { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { TOKEN_KEY } from '../constant/app-constant'
import { XFooter } from './XFooter'
import { XHeader } from './XHeader'
import { drawerWidth, XSidebar } from './XSidebar'
import { DrawerContext } from '../context/drawerContext'
import { getAccount, setNotAuthenticate } from '../redux/store/auth-slice'

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export const CenterLayout = (props: any) => {
  const dispatch = useDispatch()
  const drawerContext = useContext(DrawerContext)

  useEffect(() => {
    const localJwt = window.localStorage.getItem(TOKEN_KEY)
    if (localJwt == null) {
      dispatch(setNotAuthenticate())
    } else {
      dispatch(getAccount())
    }
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <XHeader />
      <XSidebar />

      <Main
        open={drawerContext.open}
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {props.children}
        <XFooter />
      </Main>
    </Box>
  )
}
