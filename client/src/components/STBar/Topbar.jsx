import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


export default function Topbar() {
  return (
    <Box sx={{ dispaly: "flex", zIndex: 0 }}>
      <AppBar color="primary" position="fixed">
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Administator Panel</Typography>
            <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>Ce panneau de contrôle est réservé à l'Administrateur du blog.</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
