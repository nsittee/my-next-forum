import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PERMISSION_MAP } from '../constant/permission-map'
import { selectAuthState } from '../store/authSlice'
import { resetTitle, setTitle } from '../store/mainSlice'

export const PagePermission = (props: any) => {
  const authState = useSelector(selectAuthState)
  // const mainState = useSelector(selectMainState)
  const router = useRouter()
  const dispatch = useDispatch()
  const [canView, setCanView] = useState(false)

  useEffect(() => {
    const currentPermission = PERMISSION_MAP.find((item) => {
      if (item.key === router.pathname) return item
    })
    const hasPermission = currentPermission?.value.some(r => authState.roles.indexOf(r) >= 0)
    if (hasPermission) {
      setCanView(true)
      if (currentPermission?.name !== '')
        dispatch(setTitle(currentPermission?.name))
    } else {
      setCanView(false)
      dispatch(resetTitle())
    }

  }, [router.asPath, authState.roles])

  return (
    <div>
      {authState.status.isLoading ?
        <p>loading user data...</p>
        :
        authState.authenticate ?
          canView ?
            <p>
              {props.children}
            </p>
            :
            <p>authenticate, no permission</p>
          :
          <p>no authenticate</p>
      }
    </div>
  )
}
