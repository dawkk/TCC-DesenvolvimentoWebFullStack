import { Box, Paper, Typography } from "@mui/material";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import colorTheme from '../../components/ColorThemes';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import NavProfile from "./NavProfile";
import OverviewData from "./Overview/OverviewData";


const Profile = () => {

  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light, height: '100%', paddingTop: 25 }}>
      <NavBar />
      <Box sx={{ backgroundColor: colorTheme.palette.primary.light}}>
        <Box sx={{ ml: '20%', mr: '20%', mb: 20 }}>
          <Box sx={{ display: 'flex' }}>
            <NavProfile/>
            <Box sx={{ backgroundColor: 'white' }}>
              <Paper>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 2 }}>
                  <ShoppingCartCheckoutIcon fontSize="large" color="primary" sx={{ mr: 6 }} />
                  <Typography variant="h4">Resumo do seu ultimo pedido</Typography>
                </Box>
              </Paper>
              <OverviewData/>
            </Box>
          </Box >
        </Box >
      </Box>
      <Footer />
    </Box>
  )
}

export default Profile;