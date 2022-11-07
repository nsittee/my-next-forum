import React from 'react'

export const DrawerContext = React.createContext({
  open: false,
  setOpen: (value: boolean) => { },
})