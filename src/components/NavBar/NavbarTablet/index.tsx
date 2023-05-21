import { Alert, AppBar, Box, Button, Collapse, Divider, Drawer, IconButton, Link, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../../Logo';
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CartDrawer from '../NavbarDesktop/cartDrawer';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../../context/AuthProvider';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React from 'react';
import styles from './NavbarTablet.module.scss'



const NavbarTablet = () => {
  const [open, setOpen] = useState(false);
  const [menuAdministrativoOpen, setMenuAdministrativoOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  }
  const [showLogoutAlert, setShowLogoutAlert] = useState<boolean>(false);
  const auth = useAuth();

  if (auth.isLoading) {
    return null;
  }

  const isStaff = auth.user?.isStaff;

  useEffect(() => {
    /*  This is for checking user and also not to leave the useEffect empty in order to get user
    console.log("user changed", auth.user); */

  }, [auth.user]);

  const handleLogoutButton = () => {
    auth.logout();
    setShowLogoutAlert(true);
  };

  const handleCloseLogoutAlert = () => {
    setShowLogoutAlert(false);
  };


  return (
    <div>
      <AppBar>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ boxSizing: 'border-box'}}>
            <Logo />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', m:2.5 }}>
            <IconButton edge="end" color="inherit" onClick={handleDrawerToggle} sx={{mr:2}}>
              <MenuIcon />
            </IconButton>
            <Link id="cart-menu-open-icon" component={RouterLink} to="">
              <CartDrawer />
            </Link>
          </Box>
        </Toolbar>

      </AppBar>
      <Drawer open={open} anchor="right" onClose={handleCloseDrawer}>
        <List className={styles.DrawerTabletMenu} sx={{ width: '360px' }}>
          <ListItem>
            <Typography gutterBottom variant="h6" component="div" sx={{ pl: 2 }}>
              Menu
            </Typography>
            <ListItemText primary="" />
            <Button onClick={handleCloseDrawer}>
              <CloseIcon />
            </Button>
          </ListItem>
          <Divider />
          {isStaff &&
            <React.Fragment>
              <ListItem button onClick={() => setMenuAdministrativoOpen(!menuAdministrativoOpen)}>
                <AdminPanelSettingsIcon sx={{ ml: 1, mr: 1 }}/>
                <ListItemText primary="Menu Administrativo" />
                {menuAdministrativoOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={menuAdministrativoOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link component={RouterLink} to="/staff/dashboard" style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem button sx={{ pl: 4 }}>
                      <ListItemText primary="Dashboard" />
                    </ListItem>
                  </Link>
                  <Link component={RouterLink} to="/staff/dishes" style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem button sx={{ pl: 4 }}>
                      <ListItemText primary="Pratos" />
                    </ListItem>
                  </Link>
                  <Link component={RouterLink} to="/staff/menus" style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem button sx={{ pl: 4 }}>
                      <ListItemText primary="Menus" />
                    </ListItem>
                  </Link>
                  <Link component={RouterLink} to="/staff/users" style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem button sx={{ pl: 4 }}>
                      <ListItemText primary="Usuários" />
                    </ListItem>
                  </Link>
                  <Link component={RouterLink} to="/staff/orders" style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem button sx={{ pl: 4 }}>
                      <ListItemText primary="Pedidos" />
                    </ListItem>
                  </Link>
              {/*     <Link component={RouterLink} to="/staff/inventory" style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem button sx={{ pl: 4 }}>
                      <ListItemText primary="Inventario" />
                    </ListItem>
                  </Link> */}

                </List>
              </Collapse>
              <Divider />
            </React.Fragment>
          }
          <Link component={RouterLink} to="/" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button>
              <HomeIcon sx={{ ml: 1, mr: 1 }} />
              <ListItemText primary="Início" />
            </ListItem>
          </Link>
          <Divider />
          <Link component={RouterLink} to="/menu" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button>
              <LunchDiningIcon sx={{ ml: 1, mr: 1 }} />
              <ListItemText primary="Cardápio" />
            </ListItem>
          </Link>
          <Divider />
          <Link component={RouterLink} to="/about" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button>
              <InfoIcon sx={{ ml: 1, mr: 1 }} />
              <ListItemText primary="Quem Somos" />
            </ListItem>
          </Link>
          <Divider />
          {auth.user ? (
            <List sx={{ pt: 0, pb: 0 }}>
              <Link component={RouterLink} to="/profile/overview" style={{ textDecoration: 'none', color: 'black' }}>
                <ListItem button>
                  <AccountCircleIcon sx={{ ml: 1, mr: 1 }} />
                  <ListItemText primary="Meu Perfil" />
                </ListItem>
              </Link>
              <Divider />
              <ListItem button onClick={handleLogoutButton}>
                <LogoutIcon sx={{ ml: 1, mr: 1 }} />
                <ListItemText primary="Logout" />
              </ListItem>
            </List>

          ) : (
            <Link component={RouterLink} to="/login" style={{ textDecoration: 'none', color: 'black' }}>
              <ListItem button>
                <LoginIcon sx={{ ml: 1, mr: 1 }} />
                <ListItemText primary="Login" />
              </ListItem>
            </Link>
          )}
          {showLogoutAlert && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Alert onClose={handleCloseLogoutAlert} severity="success" sx={{ position: 'absolute', top: '12vh', width: '25vw' }}>
                Logout realizado com sucesso.
              </Alert>
            </Box>
          )}
          <Divider />
        </List>
      </Drawer>
    </div>
  )
}

export default NavbarTablet;
