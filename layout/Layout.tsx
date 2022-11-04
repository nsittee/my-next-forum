import { Box, CssBaseline, Toolbar } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { TOKEN_KEY } from '../constant/app-constant'
import { getAccount, setNotAuthenticate } from '../store/authSlice'
import { XFooter } from './XFooter'
import { XHead } from './XHead'
import { XHeader } from './XHeader'
import { Permission } from './Permission'
import { XSidebar } from './XSidebar'

export const Layout = (props: any) => {
  const dispatch = useDispatch()

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
      <XHead title={props.title ? props.title : "my-forum"} />
      <XHeader />
      <XSidebar />

      <Box component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Permission>
          {props.children}
        </Permission>
        <XFooter />
      </Box>
    </Box>
  )
}
