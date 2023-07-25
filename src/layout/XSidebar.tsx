import { Collapse, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import Link from 'next/link'
import { ReactNode, useContext, useState } from 'react'

import AccountBoxIcon from '@mui/icons-material/AccountBox'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import ShieldIcon from '@mui/icons-material/Shield'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import SettingsIcon from '@mui/icons-material/Settings'
import MonitorIcon from '@mui/icons-material/Monitor'
import HeadsetIcon from '@mui/icons-material/Headset'
import KeyboardIcon from '@mui/icons-material/Keyboard'
import { DrawerContext } from '../context/drawerContext'

export const drawerWidth = 190;

interface IMenu {
  name: string
  path: string
  icon?: ReactNode
  subMenu?: IMenu[]
}

const sidebarNavigationMap: IMenu[] = [
  {
    name: 'Home',
    path: '/',
    icon: <HomeIcon />
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: <AccountBoxIcon />
  },
  {
    name: 'Admin',
    path: '/admin',
    icon: <SupervisorAccountIcon />
  },
  {
    name: 'Moderator',
    path: '/moderator',
    icon: <ShieldIcon />
  },
  {
    name: 'Others',
    path: '', // empty string will not make <Link/> navigate to anywhere
    icon: <MenuIcon />,
    subMenu: [
      {
        name: 'Profile',
        path: '/profile',
        icon: <AccountBoxIcon />
      },
      {
        name: 'Admin',
        path: '/admin',
        icon: <SupervisorAccountIcon />
      },
      {
        name: 'Moderator',
        path: '/moderator',
        icon: <ShieldIcon />
      },
    ]
  },
  {
    name: 'Setting',
    path: '', // empty string will not make <Link/> navigate to anywhere
    icon: <SettingsIcon />,
    subMenu: [
      {
        name: 'Graphic',
        path: '',
        icon: <MonitorIcon />
      },
      {
        name: 'Audio',
        path: '',
        icon: <HeadsetIcon />
      },
      {
        name: 'Control',
        path: '',
        icon: <KeyboardIcon />
      },
    ]
  },
]

export const XSidebar = () => {
  const drawerContext = useContext(DrawerContext)
  const [openSubMenu, setOpenSubMenu] = useState([
    { name: 'Others', open: false },
    { name: 'Setting', open: false },
  ])

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      open={drawerContext.open}
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {sidebarNavigationMap.map((menu, index) => {
          const subMenuIndex = openSubMenu.findIndex(item => item.name === menu.name)
          const toggleSubMenu = () => {
            if (subMenuIndex != -1) {
              const newSubMenuState = [...openSubMenu]
              newSubMenuState[subMenuIndex].open = !newSubMenuState[subMenuIndex].open
              setOpenSubMenu(newSubMenuState)
            }
          }
          return (
            <div key={`${index}-${menu.name}`}>
              <ListItem disablePadding key={`${index}-${menu.name}`}>
                <Link href={menu.path}>
                  <ListItemButton onClick={toggleSubMenu}>
                    <ListItemIcon>
                      {
                        menu.icon != null ?
                          menu.icon
                          :
                          <MenuIcon />
                      }
                    </ListItemIcon>
                    <ListItemText primary={menu.name} />
                  </ListItemButton>
                </Link>
              </ListItem>
              {
                menu.subMenu != null &&
                <Collapse in={openSubMenu[subMenuIndex].open} key={`${index}-${menu.name}-subMenu`}>
                  {menu.subMenu.map((subMenu, subIndex) => {
                    return (
                      <ListItem disablePadding key={subIndex}>
                        <Link href={subMenu.path}>
                          <ListItemButton >
                            <ListItemIcon>
                              {
                                subMenu.icon != null ?
                                  subMenu.icon
                                  :
                                  <MenuIcon />
                              }
                            </ListItemIcon>
                            <ListItemText primary={subMenu.name} />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    )
                  })}
                </Collapse>
              }
            </div>
          )
        })}
        <Divider />
      </List>
    </Drawer>
  )
}
