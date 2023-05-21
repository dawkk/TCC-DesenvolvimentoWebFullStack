import { AppBar, Box, Button, Link, Toolbar } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';
import CustomizedSnackbars from '../../Alerts/Snackbar';
import colorTheme from '../../ColorThemes';
import Logo from '../../Logo';
import DropDownList from './DropdownList';
import styles from './NavbarDesktop.module.scss';
import CartDrawer from './cartDrawer';



const NavbarDesktop = () => {
  const [showSucessAlert, setShowSucessAlert] = useState<boolean>(false);
  const [showFailAlert, setShowFailAlert] = useState<boolean>(false);
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
    } catch(error) {
      console.log(error)
      setShowSucessAlert(false);
      setShowFailAlert(true);
    }

    setShowSucessAlert(true);
    setShowFailAlert(false);
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
              <Link component={RouterLink} to="/menu" className={styles.NavLink} data-testid={`menu-cardapio`}>
                <Button sx={{ color: colorTheme.palette.primary.contrastText }}>
                  Menu
                </Button>
              </Link>
            </Box>
            <Box className={styles.NavFlexBox}>
              <Link component={RouterLink} to="/about" className={styles.NavLink} data-testid={`menu-about`}>
                <Button sx={{ color: colorTheme.palette.primary.contrastText }}>
                  Quem somos
                </Button>
              </Link>
            </Box>
            {auth.user ? (
              <Box className={styles.NavFlexBox}>
                <Box className={styles.NavFlexBox}>
                  <Link component={RouterLink} to="/profile/overview" className={styles.NavLink} data-testid={`menu-profile`}>
                    <Button sx={{ color: colorTheme.palette.primary.contrastText }}>
                      Meu Perfil
                    </Button>
                  </Link>
                </Box>
                <Box className={styles.NavFlexBoxMarginLeft}>
                  <Box className={styles.NavLink}>
                    <Button onClick={handleLogoutButton} className={styles.NavLink} sx={{ color: colorTheme.palette.primary.contrastText }} data-testid={`menu-logout`}>
                      Logout
                    </Button>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box className={styles.NavFlexBox}>
                <Link component={RouterLink} to="/login" className={styles.NavLink}>
                  <Button sx={{ color: colorTheme.palette.primary.contrastText }} data-testid={`menu-login`}>
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
    </AppBar>
  )
}

export default NavbarDesktop;
