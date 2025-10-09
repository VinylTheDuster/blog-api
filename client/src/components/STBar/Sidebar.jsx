import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import HomeIcon from '@mui/icons-material/Home';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

export default function Sidebar() {

    return (
        <Box color="primary" sx={{ zIndex: 1 }}>
            <Drawer variant="permanent" anchor="left">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home Panel" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <BookmarksIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tag Editor" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    )
}