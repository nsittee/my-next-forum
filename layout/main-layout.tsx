import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { TOKEN_KEY } from '../constant/app-constant'
import { getAccount } from '../store/authSlice'
import { MyFooter } from './my-footer'
import { MyHead } from './my-head'
import { MyHeader } from './my-header'

export const MainLayout = (props: any) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const localJwt = window.localStorage.getItem(TOKEN_KEY)
    if (localJwt == null) return

    dispatch(getAccount())
  }, [])

  return (
    <div style={{
      backgroundColor: "lightgray"
    }}>
      <MyHead title={props.title ? props.title : "my-forum"} />
      <MyHeader />
      {props.children}
      <MyFooter />
    </div>
  )
}
