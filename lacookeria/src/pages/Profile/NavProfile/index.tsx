import { Box, Paper, MenuList, MenuItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import colorTheme from "../../../components/ColorThemes";
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


const NavProfile = () => {
  return (

    <Box sx={{ display: 'flex', width: '25%', flexWrap: 'wrap' }}>
    <Box>
      <Paper>
        <MenuList sx={{ color: colorTheme.palette.primary.main }}>
          <MenuItem>
            <ListItemIcon>
              <HomeIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText>Visão Geral da Conta</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <AccountBoxIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText>Meus Dados</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <EditIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText>Editar Perfil</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <ShoppingBasketIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText>Meus Pedidos</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </Box>
  </Box>

  )
}

export  default NavProfile;