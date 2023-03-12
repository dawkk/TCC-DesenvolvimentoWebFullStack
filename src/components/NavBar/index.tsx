import { Alert, AppBar, Box, Button, Link, Toolbar } from '@mui/material';
import { Container } from '@mui/system';
import colorTheme from '../ColorThemes';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../Logo';
import { useEffect, useState } from "react";

import CartDrawer from './cartDrawer';
import DropDownList from './DropdownList';
import { useAuth } from '../../hooks/useAuth';


const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState<boolean>(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const roles = user.roles || [];

  const isAdmin =
  roles.includes(3000) ||
  roles.includes(2000) ||
  roles.includes(1000);

  const auth = useAuth();

  const handleLogoutButton = () => {
    auth.logout;
    setIsLoggedIn(false);
    setShowLogoutAlert(true);
    localStorage.removeItem('user')
  };

  const handleCloseLogoutAlert = () => {
    setShowLogoutAlert(false);
  };

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      setIsLoggedIn(true);
    }
  }, [])

  return (
    <AppBar>
      <Container>
        <Toolbar>
          <Box sx={{ boxSizing: 'border-box', paddingRight: 16 }}>
            <Logo />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', alignContent: 'center', width: '100%', padding: 1, boxSizing: 'border-box' }}>
            {isLoggedIn && isAdmin &&  (
              <DropDownList />
            )}
            <Link component={RouterLink} to="/">
              <Button sx={{ my: 2, color: colorTheme.palette.primary.contrastText }}>
                Início
              </Button>
            </Link>
            <Link component={RouterLink} to="/menus">
              <Button sx={{ my: 2, color: colorTheme.palette.primary.contrastText }}>
                Menu
              </Button>
            </Link>
            <Link component={RouterLink} to="/about">
              <Button sx={{ my: 2, color: colorTheme.palette.primary.contrastText }}>
                Quem somos
              </Button>
            </Link>
            {isLoggedIn ? (
              <Box>
                <Link component={RouterLink} to="/profile">
                  <Button sx={{ mr: 4, my: 2, color: colorTheme.palette.primary.contrastText }}>
                    Meu Perfil
                  </Button>
                </Link>
                <Link component={RouterLink} to="/">
                  <Button onClick={handleLogoutButton} sx={{ my: 2, color: colorTheme.palette.primary.contrastText }}>
                    Logout
                  </Button>
                </Link>
              </Box>
            ) : (
              <Link component={RouterLink} to="/login">
                <Button sx={{ my: 2, color: colorTheme.palette.primary.contrastText }}>
                  Login
                </Button>
              </Link>
            )
            }

            <Link component={RouterLink} to="" sx={{ my: 2 }} >
              <CartDrawer />
            </Link>
          </Box>
        </Toolbar>
      </Container>
      {showLogoutAlert && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Alert onClose={handleCloseLogoutAlert} severity="success" sx={{ width: '20vw' }}>
            Logout realizado com sucesso.
          </Alert>
        </Box>
      )}
    </AppBar>
  )
}

export default NavBar;