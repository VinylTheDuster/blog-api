import { useState } from 'react';

import Home from './Home/Home';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from "@mui/material/Toolbar";

import HomeIcon from '@mui/icons-material/Home';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import HandymanIcon from '@mui/icons-material/Handyman';

const drawerWidth = 240;

export default function Menu() {


    // Current Page Logic
    const [currentPage, setCurrentPage] = useState("home");
    //

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar color="primary" position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Administator Panel</Typography>
                    <Typography variant="body2" component="div" sx={{ flexGrow: 1 }}>Ce panneau de contrôle est réservé à l'Administrateur du blog.</Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                borderColor: "rgba(255,255,255,0.2)",
              },
            }}
            >
                <Toolbar />
                <List>
                    <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => setCurrentPage("home")} sx={{ "&:hover": {backgroundColor: "rgba(255,255,255,0.1)",},}}>
                            <ListItemIcon sx={{ color: "white" }}><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Home Panel" />
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => setCurrentPage("article")} sx={{ "&:hover": {backgroundColor: "rgba(255,255,255,0.1)",},}}>
                            <ListItemIcon sx={{ color: "white" }}><HandymanIcon /></ListItemIcon>
                            <ListItemText primary="Article Editor" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => setCurrentPage("tag")} sx={{ "&:hover": {backgroundColor: "rgba(255,255,255,0.1)",},}}>
                            <ListItemIcon sx={{ color: "white" }}><BookmarksIcon /></ListItemIcon>
                            <ListItemText primary="Tag Editor" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                }}
            >
                <Toolbar />
                { currentPage === "home" && <Home /> }
            </Box>
        </Box>
    )
}