import { Box } from '@mui/system';
import colorTheme from '../../../components/ColorThemes';
import Footer from '../../../components/Footer';
import NavBar from '../../../components/NavBar';
import { Container, Paper, Typography } from '@mui/material';
import CheckoutPayment from './Payment';


const PaymentStep = () => {

  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light, paddingTop: 10 }}>
      <NavBar />
      <Box sx={{ minHeight: '75vh',mb:4 }}>
        <Container component="main" maxWidth="lg">
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <CheckoutPayment />
          </Paper>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default PaymentStep;