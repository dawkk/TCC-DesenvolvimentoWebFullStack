import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import colorTheme from '../../components/ColorThemes';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import NavProfile from "./NavProfile";
import OverviewData from "./Overview/OverviewData";


const Profile = () => {

  function createData(
    order: number,
    name: string,
    status: string,
    total: number,
    link: string,
  ) {
    return { order, name, status, total, link };
  }

  const rows = [
    createData(15, 'Frozen yoghurt', 'Concluido', 250, 'Ver Mais(link)'),
  ];

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