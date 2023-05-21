import { Box } from '@mui/system';
import colorTheme from '../../components/ColorThemes';
import Footer from '../../components/Footer';
import { Container, Paper } from '@mui/material';
import CheckoutIdentification from './IdentificationStep';
import NavbarCheckout from '../../components/NavBar/NavbarCheckout';

const Checkout = () => {

  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light, }}>
      <NavbarCheckout />
      <Box sx={{  height: '100%', minHeight: '100vh',mb:4, paddingTop: 10, }}>
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