import { Box, Card, CardMedia, Typography, Button, CardActions, CardContent, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ICartItem from "../../../../interfaces/ICartItem";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';

interface ICartProps {
  onUpdate: (items: ICartItem[]) => void;
}

const Cart: React.FC<ICartProps> = ({ onUpdate }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]') as ICartItem[];
    setCartItems(items);
  }, []);

  const handleRemoveFromCart = (id: string) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    onUpdate(updatedCartItems);
  };

  const handleIncreaseQuantity = (id: string) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    onUpdate(updatedCartItems);
  };

  const handleDecreaseQuantity = (id: string) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }
      return item;
    }).filter(item => item.quantity > 0);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    onUpdate(updatedCartItems);
  };

  let total = 0;

  cartItems.forEach(item => {
    total += item.price * item.quantity;
  });

  let totalQuantity = 0;

  cartItems.forEach(item => {
    totalQuantity += item.quantity;
  });

  return (

    <Grid container>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

      </Grid>
      {cartItems.map(item => (
        <Grid item key={item.id} xs={8} sm={4} md={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: 300, maxWidth: 380, padding: 3, boxSizing: 'border-box' }}>
          <Card sx={{ display: 'flex' }}>
            <CardMedia
              component="img"
              alt="item"
              image={`https://source.unsplash.com/random?${item.name}`}
              sx={{ height: 120, width: 100 }}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography gutterBottom variant="body1" textAlign={"center"} sx={{ mb: 1 }}>
                {item.name}
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body1" sx={{ mr: 6 }}>
                  {item.quantity}X
                </Typography>
                <Typography variant="body1" >
                  R${item.price * item.quantity}
                </Typography>
              </Box>
              <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex' }}>
                  <Button sx={{ mr: 0.5 }} variant='contained' disabled={item.quantity === 1} onClick={() => handleDecreaseQuantity(item.id)}>
                    <KeyboardArrowDownIcon />
                  </Button>
                  <Button sx={{ mr: 0.5 }} variant='contained' onClick={() => handleIncreaseQuantity(item.id)} >
                    <KeyboardArrowUpIcon />
                  </Button>
                  <Button variant='contained' disabled={item.quantity >= 20} onClick={() => handleRemoveFromCart(item.id)}>
                    <DeleteIcon />
                  </Button>
                </Box>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12} sx={{ display: 'flex',justifyContent: 'center', alignItems: 'center', pt: 2 }}>
        <Typography variant="body1">
          Subtotal:
        </Typography>
        <Typography sx={{ml:0.5}}>( {totalQuantity} itens)</Typography>
        <Typography variant="body1" fontWeight='bold' sx={{ml:0.5}}>
          R$ {total}
        </Typography>
      </Grid>

    </Grid>

  );
};

export default Cart;