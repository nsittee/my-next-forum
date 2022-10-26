import React from 'react'
import { MyFooter } from './my-footer'
import { MyHead } from './my-head'
import { MyHeader } from './my-header'

export const CommonLayout = (props: any) => {
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
