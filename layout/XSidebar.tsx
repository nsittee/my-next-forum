import { Menu } from '@mui/icons-material';
import { Drawer, Toolbar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material'
import React, { useState } from 'react'

export const drawerWidth = 190;

export const XSidebar = () => {
  const [openMenu, setOpenMenu] = useState(false)
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
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Menu />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />

        <ListItem key={'Others'} disablePadding>
          <ListItemButton onClick={() => setOpenMenu(!openMenu)}>
            <ListItemIcon>
              <Menu />
            </ListItemIcon>
            <ListItemText primary={'Others'} />
          </ListItemButton>
        </ListItem>
      </List>
      <Collapse in={openMenu} timeout="auto" unmountOnExit>
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Menu />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Drawer>
  )
}
