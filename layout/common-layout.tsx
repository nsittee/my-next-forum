import React from 'react'
import { MyFooter } from './my-footer'
import { MyHead } from './my-head'

export const CommonLayout = (props: any) => {
  return (
    <div>
      <MyHead title={props.title ? props.title : "my-forum"} />
      {props.children}
      <MyFooter />
    </div>
  )
}
