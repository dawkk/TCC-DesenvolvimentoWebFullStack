import { AppBar, Box, Button, Link, Toolbar } from '@mui/material';
import { Container } from '@mui/system';
import colorTheme from '../ColorThemes';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../Logo';


const NavBar = () => {
  return (
    <AppBar>
      <Container>
        <Toolbar>
          <Box sx={{ boxSizing: 'border-box', paddingRight: 16 }}>
            <Logo />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', alignContent: 'center', width: '100%', padding: 1, boxSizing: 'border-box' }}>
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
            <Link component={RouterLink} to="/">
              <Button sx={{ my: 2, color: colorTheme.palette.primary.contrastText }}>
                Delivery
              </Button>
            </Link>
            <Link component={RouterLink} to="/">
              <Button sx={{ my: 2, color: colorTheme.palette.primary.contrastText }}>
                Quem somos
              </Button>
            </Link>
            <Link component={RouterLink} to="/">
              <Button sx={{ my: 2, color: colorTheme.palette.primary.contrastText }}>
                Login
              </Button>
            </Link>
            <Link component={RouterLink} to="/">
              <Button sx={{ my: 2, color: colorTheme.palette.primary.contrastText }}>
                Carrinho
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar;