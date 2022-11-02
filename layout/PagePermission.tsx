import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import { ROLES } from '../constant/app-roles'
import { PERMISSION_MAP } from '../constant/permission-map'
import { selectAuthState } from '../store/authSlice'

export const PagePermission = (props: any) => {
  const authState = useSelector(selectAuthState)
  const router = useRouter()

  const currentPermission = PERMISSION_MAP.find((item) => {
    if (item.key === router.pathname) return item
  })

  const hasPermission = currentPermission?.value.some(r => authState.roles.indexOf(r) >= 0)
  return (
    <div>
      {authState.status.isLoading ?
        <p>loading user data...</p>
        :
        authState.authenticate ?
          hasPermission ?
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
