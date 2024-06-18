'use client'

import {Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";

const drawerWidth = 240;

export default function LeftDrawer() {
  return (
    <Drawer
      variant="permanent"
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Chart"/>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}