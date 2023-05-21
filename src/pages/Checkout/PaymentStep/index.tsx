import { Box } from '@mui/system';
import colorTheme from '../../../components/ColorThemes';
import Footer from '../../../components/Footer';
import { Container, Paper } from '@mui/material';
import CheckoutPayment from './Payment';
import NavbarCheckout from '../../../components/NavBar/NavbarCheckout';


const PaymentStep = () => {

  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light}}>
      <NavbarCheckout />
      <Box sx={{backgroundColor: colorTheme.palette.primary.light,  minHeight: '100vh', mb: 4, paddingTop: 10, height: '100%'  }}>
        <Container component="main" maxWidth="lg">
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <CheckoutPayment />
          </Paper>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default PaymentStep;