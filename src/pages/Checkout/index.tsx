import { Box } from '@mui/system';
import colorTheme from '../../components/ColorThemes';
import Footer from '../../components/Footer';
import { Container, Paper, Typography } from '@mui/material';
import CheckoutIdentification from './IdentificationStep';
import NavbarCheckout from '../../components/NavBar/NavbarCheckout';

const Checkout = () => {

  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light, paddingTop: 10, height:'100%' }}>
      <NavbarCheckout />
      <Box sx={{ height: '100vh',mb:4 }}>
        <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
           
            <CheckoutIdentification />
          </Paper>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default Checkout;