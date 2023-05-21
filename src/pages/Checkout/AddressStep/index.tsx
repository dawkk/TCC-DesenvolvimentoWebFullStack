import { Box } from '@mui/system';
import colorTheme from '../../../components/ColorThemes';
import Footer from '../../../components/Footer';
import { Container, Paper } from '@mui/material';
import CheckoutAddress from './Address';
import NavbarCheckout from '../../../components/NavBar/NavbarCheckout';

const AddressStep = () => {

  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light}}>
      <NavbarCheckout />
      <Box sx={{ paddingTop: 10, height:'100%', minHeight: '100vh',mb:4 }}>
        <Container component="main" maxWidth="lg">
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <CheckoutAddress />
          </Paper>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default AddressStep;