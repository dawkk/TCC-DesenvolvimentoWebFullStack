import { Alert, AppBar, Box, Button, Link, Toolbar } from '@mui/material';
import { Container } from '@mui/system';
import colorTheme from '../../ColorThemes';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../../Logo';
import { useEffect, useState } from "react";
import CartDrawer from './cartDrawer';
import DropDownList from './DropdownList';
import { useAuth } from '../../../context/AuthProvider';
import styles from './NavbarDesktop.module.scss'



const NavbarDesktop = () => {
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
    <AppBar>
      <Container>
        <Toolbar>
          <Box>
            <Logo />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', alignContent: 'center', width: '100%', ml: 12 }}>
            {isStaff &&
              <Box className={styles.NavFlexBox}>
                <Box className={styles.NavLink}>
                  <DropDownList />
                </Box>
              </Box>
            }
            <Box className={styles.NavFlexBox}>
              <Link component={RouterLink} to="/" className={styles.NavLink}>
                <Button sx={{ color: colorTheme.palette.primary.contrastText }}>
                  Início
                </Button>
              </Link>
            </Box>
            <Box className={styles.NavFlexBox}>
              <Link component={RouterLink} to="/menu" className={styles.NavLink}>
                <Button sx={{ color: colorTheme.palette.primary.contrastText }}>
                  Menu
                </Button>
              </Link>
            </Box>
            <Box className={styles.NavFlexBox}>
              <Link component={RouterLink} to="/about" className={styles.NavLink}>
                <Button sx={{ color: colorTheme.palette.primary.contrastText }}>
                  Quem somos
                </Button>
              </Link>
            </Box>
            {auth.user ? (
              <Box className={styles.NavFlexBox}>
                <Box className={styles.NavFlexBox}>
                  <Link component={RouterLink} to="/profile/overview" className={styles.NavLink}>
                    <Button sx={{ color: colorTheme.palette.primary.contrastText }}>
                      Meu Perfil
                    </Button>
                  </Link>
                </Box>
                <Box className={styles.NavFlexBoxMarginLeft}>
                  <Box className={styles.NavLink}>
                    <Button onClick={handleLogoutButton} className={styles.NavLink} sx={{ color: colorTheme.palette.primary.contrastText }}>
                      Logout
                    </Button>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box className={styles.NavFlexBox}>
                <Link component={RouterLink} to="/login" className={styles.NavLink}>
                  <Button sx={{ color: colorTheme.palette.primary.contrastText }}>
                    Login
                  </Button>
                </Link>
              </Box>
            )}
            <Link id="cart-menu-open-icon" component={RouterLink} to="" sx={{ my: 2 }} className={styles.NavLink}>
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

export default NavbarDesktop;
