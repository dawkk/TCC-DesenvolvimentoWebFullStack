import { ExpandLess, ExpandMore } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Collapse, Divider, Drawer, IconButton, Link, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';
import CustomizedSnackbars from '../../Alerts/Snackbar';
import Logo from '../../Logo';
import CartDrawer from '../NavbarDesktop/cartDrawer';
import styles from './NavbarTablet.module.scss';



const NavbarTablet = () => {
  const [showSucessAlert, setShowSucessAlert] = useState<boolean>(false);
  const [showFailAlert, setShowFailAlert] = useState<boolean>(false);

  const [open, setOpen] = useState(false);
  const [menuAdministrativoOpen, setMenuAdministrativoOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };
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
    try {
      auth.logout();
      setShowSucessAlert(true);
      setShowFailAlert(false);
    } catch (error) {
      console.log(error)
      setShowSucessAlert(false);
      setShowFailAlert(true);
    }

    setShowSucessAlert(true);
    setShowFailAlert(false);
  };


  return (
    <div>
      <AppBar>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ boxSizing: 'border-box' }}>
            <Logo />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 2.5 }}>
            <IconButton edge="end" color="inherit" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
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
              <ListItem button data-testid={`menu-staff-expand-collapse`} onClick={() => setMenuAdministrativoOpen(!menuAdministrativoOpen)}>
                <AdminPanelSettingsIcon sx={{ ml: 1, mr: 1 }} />
                <ListItemText primary="Menu Administrativo" />
                {menuAdministrativoOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={menuAdministrativoOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link component={RouterLink} to="/staff/dashboard" style={{ textDecoration: 'none', color: 'black' }} data-testid={`menu-staff-dashboard`}>
                    <ListItem button sx={{ pl: 4 }}>
                      <ListItemText primary="Dashboard" />
                    </ListItem>
                  </Link>
                  <Link component={RouterLink} to="/staff/dishes" style={{ textDecoration: 'none', color: 'black' }} data-testid={`menu-staff-dishes`}>
                    <ListItem button sx={{ pl: 4 }}>
                      <ListItemText primary="Pratos" />
                    </ListItem>
                  </Link>
                  <Link component={RouterLink} to="/staff/menus" style={{ textDecoration: 'none', color: 'black' }} data-testid={`menu-staff-menus`}>
                    <ListItem button sx={{ pl: 4 }}>
                      <ListItemText primary="Menus" />
                    </ListItem>
                  </Link>
                  <Link component={RouterLink} to="/staff/users" style={{ textDecoration: 'none', color: 'black' }} data-testid={`menu-staff-users`}>
                    <ListItem button sx={{ pl: 4 }}>
                      <ListItemText primary="Usuários" />
                    </ListItem>
                  </Link>
                  <Link component={RouterLink} to="/staff/orders" style={{ textDecoration: 'none', color: 'black' }} data-testid={`menu-staff-orders`}>
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
          <Link component={RouterLink} to="/menu" style={{ textDecoration: 'none', color: 'black' }} data-testid={`menu-cardapio`}>
            <ListItem button>
              <LunchDiningIcon sx={{ ml: 1, mr: 1 }} />
              <ListItemText primary="Cardápio" />
            </ListItem>
          </Link>
          <Divider />
          <Link component={RouterLink} to="/about" style={{ textDecoration: 'none', color: 'black' }} data-testid={`menu-about`}>
            <ListItem button>
              <InfoIcon sx={{ ml: 1, mr: 1 }} />
              <ListItemText primary="Quem Somos" />
            </ListItem>
          </Link>
          <Divider />
          {auth.user ? (
            <List sx={{ pt: 0, pb: 0 }}>
              <Link component={RouterLink} to="/profile/overview" style={{ textDecoration: 'none', color: 'black' }} data-testid={`menu-profile`} >
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
          {showSucessAlert &&
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CustomizedSnackbars
                open={showSucessAlert}
                message="Logout realizado com sucesso!"
                severity="success"
                onClose={() => setShowSucessAlert(false)}
              />
            </Box>
          }
          {showFailAlert &&
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CustomizedSnackbars
                open={showFailAlert}
                message="Erro: Falha ao realizar logout. Por favor entre em contato com a administração."
                severity="error"
                onClose={() => setShowFailAlert(false)}
              />
            </Box>
          }
          <Divider />
        </List>
      </Drawer>
    </div>
  )
}

export default NavbarTablet;
