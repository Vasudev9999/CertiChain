import React, { useState } from "react";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Avatar,
  useMediaQuery,
  useTheme,
  Tooltip
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VerifiedIcon from '@mui/icons-material/Verified';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const navItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Issue Certificate', icon: <AddCircleIcon />, path: '/issue' },
    { text: 'Verify', icon: <VerifiedIcon />, path: '/verify' },
    { text: 'My Certificates', icon: <CollectionsBookmarkIcon />, path: '/certificates' },
    { text: 'Transactions', icon: <ReceiptIcon />, path: '/transactions' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const notifications = [
    { id: 1, message: 'Certificate issued successfully', time: '2 mins ago' },
    { id: 2, message: 'Verification completed', time: '1 hour ago' },
    { id: 3, message: 'New certificate template available', time: '2 days ago' }
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: '#1976d2', fontWeight: 'bold' }}>
        CertiChain
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={Link} 
            to={item.path}
            selected={isActive(item.path)}
            sx={{ 
              color: isActive(item.path) ? '#1976d2' : 'inherit',
              borderLeft: isActive(item.path) ? '4px solid #1976d2' : 'none',
              backgroundColor: isActive(item.path) ? 'rgba(25, 118, 210, 0.08)' : 'transparent'
            }}
          >
            <ListItemIcon sx={{ color: isActive(item.path) ? '#1976d2' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: '#ffffff', 
        color: '#1a202c',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: theme.zIndex.drawer + 1
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography 
          variant="h5" 
          component={Link} 
          to="/"
          sx={{ 
            flexGrow: 1, 
            fontWeight: 'bold', 
            textDecoration: 'none', 
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <VerifiedIcon sx={{ fontSize: 32, color: "#4caf50" }} />
          CertiChain
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {navItems.map((item) => (
            <Button 
              key={item.text}
              component={Link}
              to={item.path}
              sx={{ 
                mx: 1, 
                color: isActive(item.path) ? '#1976d2' : 'inherit',
                fontWeight: isActive(item.path) ? 'bold' : 'normal',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                }
              }}
              startIcon={item.icon}
            >
              {item.text}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Notifications">
            <IconButton 
              color="inherit" 
              onClick={handleNotificationOpen}
              sx={{ ml: 1 }}
            >
              <NotificationsIcon />
              <Chip 
                label="3" 
                color="error" 
                size="small" 
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  height: 16,
                  width: 16,
                  fontSize: '0.625rem'
                }} 
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Account settings">
            <IconButton 
              color="inherit"
              onClick={handleUserMenuOpen}
              sx={{ ml: 1 }}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#1976d2' }}>D</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
      
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>

      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        PaperProps={{
          elevation: 3,
          sx: { mt: 1.5, minWidth: 180 }
        }}
      >
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ bgcolor: '#1976d2' }}>D</Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Dev Patel</Typography>
            <Typography variant="body2" color="text.secondary">dev@example.com</Typography>
          </Box>
        </Box>
        <MenuItem component={Link} to="/profile" onClick={handleUserMenuClose}>
          <ListItemIcon><AccountCircleIcon fontSize="small" /></ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem component={Link} to="/certificates" onClick={handleUserMenuClose}>
          <ListItemIcon><CollectionsBookmarkIcon fontSize="small" /></ListItemIcon>
          My Certificates
        </MenuItem>
        <MenuItem component={Link} to="/transactions" onClick={handleUserMenuClose}>
          <ListItemIcon><ReceiptIcon fontSize="small" /></ListItemIcon>
          Transactions
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
      </Menu>

      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleNotificationClose}
        PaperProps={{
          elevation: 3,
          sx: { mt: 1.5, width: 320 }
        }}
      >
        <Typography variant="subtitle1" sx={{ px: 2, py: 1.5, fontWeight: 'bold' }}>
          Notifications
        </Typography>
        {notifications.map((notification) => (
          <MenuItem key={notification.id} onClick={handleNotificationClose}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="body2">{notification.message}</Typography>
              <Typography variant="caption" color="text.secondary">{notification.time}</Typography>
            </Box>
          </MenuItem>
        ))}
        <Box sx={{ borderTop: '1px solid #eee', p: 1, textAlign: 'center' }}>
          <Button size="small" onClick={handleNotificationClose}>View All</Button>
        </Box>
      </Menu>
    </AppBar>
  );
};

export default Navbar;