import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { USERNAME_KEY } from '../constant/app-constant'
import { setAuthState } from '../store/authSlice'
import { MyFooter } from './my-footer'
import { MyHead } from './my-head'
import { MyHeader } from './my-header'

export const CommonLayout = (props: any) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const localUsername = window.localStorage.getItem(USERNAME_KEY)
    if (localUsername == null) return

    dispatch(setAuthState({
      authenticate: true,
      username: localUsername
    }))
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
