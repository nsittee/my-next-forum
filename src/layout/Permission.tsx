import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PERMISSION_MAP } from '../constant/permission-map'
import { selectAuthState } from '../../app/redux/store/auth-slice'
import { resetTitle, setTitle } from '../../app/redux/store/main-slice'

export const Permission = (props: any) => {
  const authState = useSelector(selectAuthState)
  // const mainState = useSelector(selectMainState)
  const router = useRouter()
  const dispatch = useDispatch()
  const [canView, setCanView] = useState(false)

  useEffect(() => {
    const currentPermission = PERMISSION_MAP.find((item) => item.path === router.pathname)
    const hasPermission = currentPermission?.roles.some(r => authState.roles.indexOf(r) >= 0)
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
      {
        PERMISSION_MAP.find((item) => item.path === router.pathname)?.auth === false ? props.children
          :
          authState.status.isLoading ?
            <p>loading user data...</p>
            :
            authState.authenticate ?
              canView ?
                props.children
                :
                <p>authenticate, no permission</p>
              :
              <p>no authenticate</p>
      }
    </div>
  )
}
