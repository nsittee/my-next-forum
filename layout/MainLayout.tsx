import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { TOKEN_KEY } from '../constant/app-constant'
import { getAccount, setNotAuthenticate } from '../store/authSlice'
import { MyFooter } from './MyFooter'
import { MyHead } from './MyHead'
import { MyHeader } from './MyHeader'
import { PagePermission } from './PagePermission'

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
    <div style={{
      backgroundColor: "lightgray"
    }}>
      <MyHead title={props.title ? props.title : "my-forum"} />
      <MyHeader />
      <PagePermission>
        {props.children}
      </PagePermission>
      <MyFooter />
    </div>
  )
}