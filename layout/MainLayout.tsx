import { Box, CssBaseline, Toolbar } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { TOKEN_KEY } from '../constant/app-constant'
import { getAccount, setNotAuthenticate } from '../store/authSlice'
import { MyFooter } from './MyFooter'
import { MyHead } from './MyHead'
import { MyHeader } from './MyHeader'
import { PagePermission } from './PagePermission'
import { XSidebar } from './XSidebar'

export const MainLayout = (props: any) => {
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
      <MyHead title={props.title ? props.title : "my-forum"} />
      <MyHeader />
      <XSidebar />

      <Box component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <PagePermission>
          {props.children}
        </PagePermission>
        <MyFooter />
      </Box>
    </Box>
  )
}
