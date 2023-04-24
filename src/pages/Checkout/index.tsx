import { Box } from '@mui/system';
import colorTheme from '../../components/ColorThemes';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { Container, Paper, Typography } from '@mui/material';
import CheckoutIdentification from './IdentificationStep';

const Checkout = () => {

  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light, paddingTop: 10 }}>
      <NavBar />
      <Box sx={{ minHeight: '75vh' }}>
        <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <CheckoutIdentification />
          </Paper>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default Checkout;