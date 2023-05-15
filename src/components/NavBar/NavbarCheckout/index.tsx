import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Logo from '../../Logo';



const NavbarCheckout = () => {

  return (
    <AppBar>
      <Container>
        <Toolbar>
          <Box>
            <Logo/>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%', height: '88px' }}>
            <Box  sx={{ display: 'flex', justifyContent: 'center', alignContent:'center', mt:3}}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavbarCheckout;
