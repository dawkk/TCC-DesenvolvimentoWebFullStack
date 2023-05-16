import { Box } from '@mui/system';
import colorTheme from '../../../components/ColorThemes';
import Footer from '../../../components/Footer';
import { Button, Container, Paper, Typography } from '@mui/material';
import NavbarCheckout from '../../../components/NavBar/NavbarCheckout';
import orderImage from '../../../assets/images/order/OrderReceived.svg'
import { Link } from 'react-router-dom';
import ElectricMopedIcon from '@mui/icons-material/ElectricMoped';


const OrderReceivedStep = () => {

  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light, paddingTop: 10, height: '100%' }}>
      <NavbarCheckout />
      <Box sx={{ minHeight: '71.5vh', mb: 4 }}>
        <Container component="main" maxWidth="lg">
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60vh',
              }}
            >
              <img src={orderImage} alt="Order Received" style={{ width: '200px' }} />
              <Typography variant="h4">Pedido realizado com sucesso!</Typography>
              <Typography variant="body1"><ElectricMopedIcon sx={{color:colorTheme.palette.primary.main, mt:2, mr:2}}/>Estimativa de entrega entre 50-60min<ElectricMopedIcon sx={{color:colorTheme.palette.primary.main, mt:2, ml:2}}/></Typography>
              
              <Button
                component={Link}
                to="/profile/orders"
                variant="contained"
                color="primary"
                sx={{ marginTop: '40px', marginBottom: '20vh' }}
              >
                Acompanhe o status do pedido clicando aqui
              </Button>
              <a href="https://storyset.com/work">Work illustrations by Storyset</a>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default OrderReceivedStep;