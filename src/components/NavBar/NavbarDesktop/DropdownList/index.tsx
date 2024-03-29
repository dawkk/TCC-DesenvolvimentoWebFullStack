import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import colorTheme from '../../../ColorThemes';

const DropDownList = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ color: colorTheme.palette.primary.contrastText}}
        data-testid={`menu-staff`}
      >
        Menu Administrativo
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link component={RouterLink} to="/staff/dashboard" data-testid={`menu-staff-dashboard`}>
          <MenuItem sx={{ p: 2, boxSizing: 'border-box' }}>
            Dashboard
          </MenuItem>
        </Link>
        <Link component={RouterLink} to="/staff/dishes" data-testid={`menu-staff-dishes`}>
          <MenuItem sx={{ p: 2, boxSizing: 'border-box' }}>
            Pratos
          </MenuItem>
        </Link>
        <Link component={RouterLink} to="/staff/menus" data-testid={`menu-staff-menus`}>
          <MenuItem sx={{ p: 2, boxSizing: 'border-box' }}>
            Menus
          </MenuItem>
        </Link>
        <Link component={RouterLink} to="/staff/users" data-testid={`menu-staff-users`}>
          <MenuItem sx={{ p: 2, boxSizing: 'border-box' }}>
            Usuários
          </MenuItem>
        </Link>
        <Link component={RouterLink} to="/staff/orders" data-testid={`menu-staff-orders`}>
          <MenuItem sx={{ p: 2, boxSizing: 'border-box' }}>
            Pedidos
          </MenuItem>
        </Link>
       {/*  <Link component={RouterLink} to="/staff/inventory">
          <MenuItem sx={{ p: 2, boxSizing: 'border-box' }}>
            Inventário
          </MenuItem>
        </Link> */}
      </Menu>
    </div>
  );
}

export default DropDownList;