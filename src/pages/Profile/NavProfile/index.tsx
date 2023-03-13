import { Link, Box, Paper, MenuList, MenuItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import colorTheme from "../../../components/ColorThemes";
import { Link as RouterLink } from 'react-router-dom';

/* ICONS */
import LockIcon from '@mui/icons-material/Lock';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


const NavProfile = () => {

  return (

    <Box sx={{ display: 'flex', width: '25%', flexWrap: 'wrap', mr:4 }}>
      <Box>
        <Paper>
          <MenuList sx={{ color: colorTheme.palette.primary.main }}>
            <Link component={RouterLink} to="/profile/overview" underline="none">
              <MenuItem sx={{mt:1,mb:1}}>
                <ListItemIcon>
                  <HomeIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText>Visão geral da conta</ListItemText>
              </MenuItem>
            </Link>
            <Divider />
            <Link component={RouterLink} to="/" underline="none">
              <MenuItem sx={{mt:1,mb:1}}>
                <ListItemIcon>
                  <EditIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText>Editar perfil</ListItemText>
              </MenuItem>
            </Link>
            <Divider />
            <Link component={RouterLink} to="/profile/address" underline="none" >
              <MenuItem sx={{mt:1,mb:1}}>
                <ListItemIcon>
                  <AccountBoxIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText>Meus endereços</ListItemText>
              </MenuItem>
            </Link>
            <Divider />
            <Link component={RouterLink} to="/profile/orders" underline="none">
              <MenuItem sx={{mt:1,mb:1}}>
                <ListItemIcon>
                  <ShoppingBasketIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText>Meus pedidos</ListItemText>
              </MenuItem>
            </Link>
            <Divider />
            <Link component={RouterLink} to="/" underline="none">
              <MenuItem sx={{mt:1,mb:1}}>
                <ListItemIcon>
                  <LockIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText>Alterar senha</ListItemText>
              </MenuItem>
            </Link>
            <Divider />
          </MenuList>
        </Paper>
      </Box>
    </Box >

  )
}

export default NavProfile;