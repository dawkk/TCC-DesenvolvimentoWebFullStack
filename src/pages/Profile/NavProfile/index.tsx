import { Link, Box, Paper, MenuList, MenuItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import colorTheme from "../../../components/ColorThemes";
import { Link as RouterLink } from 'react-router-dom';
import styles from './NavProfile.module.scss'

/* ICONS */
import LockIcon from '@mui/icons-material/Lock';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


const NavProfile = () => {

  return (

    <Box className={styles.Container}>
      <Box>
        <Paper>
          <MenuList sx={{ color: colorTheme.palette.primary.main }} className={styles.MenuList}>
            <Link component={RouterLink} to="/profile/overview" underline="none" className={styles.Link}>
              <MenuItem className={styles.MenuItem}>
                <ListItemIcon className={styles.ListItemIcon}>
                  <HomeIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText className={styles.ListItemText}>Visão geral da conta</ListItemText>
              </MenuItem>
            </Link>
            <Divider />
            <Link component={RouterLink} to="/profile/info" underline="none" className={styles.Link}>
              <MenuItem className={styles.MenuItem}>
                <ListItemIcon className={styles.ListItemIcon}>
                  <EditIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText className={styles.ListItemText}>Editar perfil</ListItemText>
              </MenuItem>
            </Link>
            <Divider />
            <Link component={RouterLink} to="/profile/address" underline="none" className={styles.Link}>
              <MenuItem className={styles.MenuItem}>
                <ListItemIcon className={styles.ListItemIcon}>
                  <AccountBoxIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText className={styles.ListItemText}>Meus endereços</ListItemText>
              </MenuItem>
            </Link>
            <Divider />
            <Link component={RouterLink} to="/profile/orders" underline="none" className={styles.Link}>
              <MenuItem className={styles.MenuItem}>
                <ListItemIcon className={styles.ListItemIcon}>
                  <ShoppingBasketIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText className={styles.ListItemText}>Meus pedidos</ListItemText>
              </MenuItem>
            </Link>
            <Divider />
            <Link component={RouterLink} to="/" underline="none" className={styles.Link}>
              <MenuItem className={styles.MenuItem}>
                <ListItemIcon className={styles.ListItemIcon}>
                  <LockIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText className={styles.ListItemText}>Alterar senha</ListItemText>
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