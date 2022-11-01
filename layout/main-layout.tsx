import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { USERNAME_KEY } from '../constant/app-constant'
import { getAccount } from '../store/authSlice'
import { MyFooter } from './my-footer'
import { MyHead } from './my-head'
import { MyHeader } from './my-header'

export const MainLayout = (props: any) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const localUsername = window.localStorage.getItem(USERNAME_KEY)
    if (localUsername == null) return

    console.log(localUsername)
    dispatch(getAccount({
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
