import { Alert, AppBar, Box, Button, Link, Toolbar } from '@mui/material';
import { Container } from '@mui/system';
import colorTheme from '../ColorThemes';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../Logo';
import { useEffect, useState } from "react";
import CartDrawer from './cartDrawer';
import DropDownList from './DropdownList';
import { useAuth } from '../../context/AuthProvider';



const NavBar = () => {
  const [showLogoutAlert, setShowLogoutAlert] = useState<boolean>(false);
  const auth = useAuth();

  if (auth.isLoading) {
    return null; 
  }

  const isStaff = auth.user?.isStaff;

  useEffect(() => {
    console.log("user changed", auth.user);
    // re-render the NavBar component when the user data changes
  }, [auth.user]);

/*   console.log('navbar user during login after data response', auth.user);
  console.log('navbar isStaff', isStaff); */


  const handleLogoutButton = () => {
    auth.logout();
    setShowLogoutAlert(true);
  };

  const handleCloseLogoutAlert = () => {
    setShowLogoutAlert(false);
  };


  return (
    <AppBar>
      <Container>
        <Toolbar>
          <Box sx={{ boxSizing: 'border-box', paddingRight: 16 }}>
            <Logo />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', alignContent: 'center', width: '100%', padding: 1, boxSizing: 'border-box' }}>
          {isStaff && <DropDownList />}
            <Link component={RouterLink} to="/">
              <Button sx={{ my: 2, color: colorTheme.palette.primary.contrastText }}>
                Início
              </Button>
            </Link>
            <Link component={RouterLink} to="/menu">
              <Button sx={{ my: 2, color: colorTheme.palette.primary.contrastText }}>
                Menu
              </Button>
            </Link>
            <Link component={RouterLink} to="/about">
              <Button sx={{ my: 2, color: colorTheme.palette.primary.contrastText }}>
                Quem somos
              </Button>
            </Link>
            {auth.user ? (
              <Box>
                <Link component={RouterLink} to="/profile/overview">
                  <Button sx={{ mr: 4, my: 2, color: colorTheme.palette.primary.contrastText }}>
                    Meu Perfil
                  </Button>
                </Link>
                <Button onClick={handleLogoutButton} sx={{ my: 2, color: colorTheme.palette.primary.contrastText }}>
                  Logout
                </Button>
              </Box>
            ) : (
              <Link component={RouterLink} to="/login">
                <Button sx={{ my: 2, color: colorTheme.palette.primary.contrastText }}>
                  Login
                </Button>
              </Link>
            )}
            <Link component={RouterLink} to="" sx={{ my: 2 }} >
              <CartDrawer />
            </Link>
          </Box>
        </Toolbar>
      </Container>
      {showLogoutAlert && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Alert onClose={handleCloseLogoutAlert} severity="success" sx={{ position: 'absolute', top: '12vh', width: '25vw' }}>
            Logout realizado com sucesso.
          </Alert>
        </Box>
      )}
    </AppBar>
  )
}

export default NavBar;
