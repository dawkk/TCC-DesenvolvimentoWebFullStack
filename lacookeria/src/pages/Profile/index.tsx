import { Box, Button, Divider, Grid, Link, ListItemIcon, ListItemText, MenuItem, MenuList, Paper } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import colorTheme from '../../components/ColorThemes';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { grey } from "@mui/material/colors";
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import { ContentCut } from "@mui/icons-material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';


const Profile = () => {
  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light, height: '100%', paddingTop: 20 }}>
      <NavBar />
      <Box sx={{ height: '100vh', ml: '25%', mr: '25%', pb:20 }}>
        <Box sx={{ display: 'flex', width: '25%', flexWrap: 'wrap'}}>
          <Box>
            <Paper>
              <MenuList sx={{  color:colorTheme.palette.primary.main}}>
                <MenuItem>
                  <ListItemIcon>
                    <HomeIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText>Visão Geral da Conta</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <AccountBoxIcon fontSize="small" color="primary"  />
                  </ListItemIcon>
                  <ListItemText>Meus Dados</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <EditIcon fontSize="small" color="primary"  />
                  </ListItemIcon>
                  <ListItemText>Editar Perfil</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <ShoppingBasketIcon fontSize="small" color="primary"  />
                  </ListItemIcon>
                  <ListItemText>Meus Pedidos</ListItemText>
                </MenuItem>
              </MenuList>
            </Paper>
          </Box>
        </Box>
      </Box >
      <Footer />
    </Box >
  )
}

export default Profile;

{/* <Link component={RouterLink} to="/">
              <Button variant="outlined" sx={{ width: '100%' }} startIcon={<HomeIcon />}>
                Visão Geral da Conta
              </Button>
            </Link>
          </Box>

          <Link component={RouterLink} to="/" >
            <Button variant="outlined" startIcon={<AccountBoxIcon />}>
              Editar Perfil
            </Button>
          </Link>

          <Link component={RouterLink} to="/">
            <Button variant="outlined" sx={{ width: '100%' }} startIcon={<EditIcon />}>
              Meus Pedidos
            </Button>
          </Link> */}