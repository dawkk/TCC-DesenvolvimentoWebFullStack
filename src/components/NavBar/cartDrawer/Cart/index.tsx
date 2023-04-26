import { Box, Card, CardMedia, Typography, Button, CardActions, CardContent, Grid, Link } from "@mui/material";
import { useEffect, useState } from "react";
import ICartItem from "../../../../interfaces/ICartItem";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import http from "../../../../api/axios";
import { Link as RouterLink } from 'react-router-dom';
import colorTheme from "../../../ColorThemes";

interface ICartProps {
  onUpdate: (items: ICartItem[]) => void;
}

const Cart: React.FC<ICartProps> = ({ onUpdate }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const getImage = async (item: ICartItem) => {
    try {
      const response = await http.get(`/dishes/${item.id}/image`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Cache-Control': 'no-cache',
        },
        responseType: 'blob',
      });
      if (response.data) {
        const imageURL = window.URL.createObjectURL(response.data);
        setCartItems(prevCartItems => {
          return prevCartItems.map(prevItem => {
            if (prevItem.id === item.id) {
              return {
                ...prevItem,
                image: imageURL
              };  
            }
            return prevItem;
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]') as ICartItem[];
    setCartItems(items);

    items.forEach(item => {
      getImage(item);
    });
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
              alt={`${item.name}`}
              image={`${item.image}`}
              sx={{ height: "16vh", width: "6vw" }}
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
                  R${(item.price * item.quantity).toFixed(2)}
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
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap:'wrap', pt: 2, pb:3 }}>
        <Typography variant="body1">
          Subtotal:
        </Typography>
        <Typography sx={{ ml: 0.5 }}>( {totalQuantity} itens)</Typography>
        <Typography variant="body1" fontWeight='bold' sx={{ ml: 0.5 }}>
          R$ {total.toFixed(2)}
        </Typography>
      </Grid>
      <Grid container sx={{display:'flex', justifyContent:'center', }}>
        <Link component={RouterLink} to="/checkout" sx={{backgroundColor:colorTheme.palette.primary.main}}>
          <Button sx={{ m: 2, color:colorTheme.palette.primary.contrastText}}>
            Prosseguir com pedido
          </Button>
        </Link>
      </Grid>
    </Grid>

  );
};

export default Cart;