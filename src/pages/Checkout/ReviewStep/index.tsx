import { Box } from '@mui/system';
import colorTheme from '../../../components/ColorThemes';
import Footer from '../../../components/Footer';
import { Container, Paper } from '@mui/material';
import CheckoutReview from './Review';
import NavbarCheckout from '../../../components/NavBar/NavbarCheckout';


const ReviewStep = () => {

  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light, paddingTop: 10, height: '100%' }}>
      <NavbarCheckout />
      <Box sx={{ height: '100%', mb: 4 }}>
        <Container component="main" maxWidth="lg">
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <CheckoutReview />
          </Paper>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default ReviewStep;