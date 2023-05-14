import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Badge, Button, Divider, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './cartDrawer.module.scss'
import colorTheme from '../../../ColorThemes';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ICartItem from '../../../../interfaces/ICartItem';
import Cart from './Cart';

const CartDrawer: React.FC = () => {
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cartItemsCount, setCartItemsCount] = React.useState<number>(0);
  const [cartItems, setCartItems] = React.useState<ICartItem[]>([]);

  React.useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]') as ICartItem[];
    setCartItems(items);
  }, []);

  React.useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartItemsCount(count);
  }, [cartItems]);


  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const handleCartItemsUpdate = (items: ICartItem[]) => {
    setCartItems(items);
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setCartItemsCount(count);
  };

  return (
    <>
      <Box>
        <IconButton color="inherit" onClick={handleCartOpen}>
          <Badge badgeContent={cartItemsCount} color="secondary">
            <ShoppingCartIcon sx={{ color: colorTheme.palette.primary.contrastText }} />
          </Badge>
        </IconButton>
        <Box >
          <Drawer anchor="right" open={cartOpen} onClose={handleCartClose}>
            <List className={styles.CartDrawer}> {/* Tamanho da drawer */}
              <ListItem>
                <Typography gutterBottom variant="h6" component="div" sx={{pl:2}}>
                  <Divider>
                    Carrinho de Compras
                  </Divider>
                </Typography>
                <ListItemText primary="" />
                <Button onClick={handleCartClose}>
                  <CloseIcon />
                </Button>
              </ListItem>
              <ListItem sx={{p:0}}>
                <Cart onUpdate={handleCartItemsUpdate} />
              </ListItem>
            </List>
          </Drawer>
        </Box>
      </Box>
    </>
  );
};

export default CartDrawer;