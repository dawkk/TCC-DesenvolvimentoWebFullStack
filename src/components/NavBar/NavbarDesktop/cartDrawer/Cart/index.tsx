import { Box, Card, CardMedia, Typography, Button, CardActions, CardContent, Grid, darken } from "@mui/material";
import { useEffect, useState } from "react";
import ICartItem from "../../../../../interfaces/ICartItem";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import http from "../../../../../api/axios";
import { useNavigate } from 'react-router-dom';
import colorTheme from "../../../../ColorThemes";
import styles from './cart.module.scss'

interface ICartProps {
  onUpdate: (items: ICartItem[]) => void;
}

const Cart: React.FC<ICartProps> = ({ onUpdate }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const navigate = useNavigate();

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
    setIsCartEmpty(cartItems.length === 0);
  }, [cartItems]);
  
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]') as ICartItem[];
    setCartItems(items);
    setIsCartEmpty(items.length === 0);

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

  const handleProceedToCheckout = () => {
    if (!isCartEmpty) {
      navigate("/checkout");
    }
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

    <Grid container className={styles.CartContainer}>

      {cartItems.map(item => (
        <Grid item key={item.id} md={12} className={styles.CartCardContainer}>
          <Card className={styles.CardCart}>
            <CardMedia
              component="img"
              alt={`${item.name}`}
              image={`${item.image}`}
              className={styles.CartCardImage}
            />
            <CardContent className={styles.CartCardContent}>
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
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', pt: 2, pb: 3 }}>
        <Typography variant="body1">
          Subtotal:
        </Typography>
        <Typography sx={{ ml: 0.5 }}>( {totalQuantity} itens)</Typography>
        <Typography variant="body1" fontWeight='bold' sx={{ ml: 0.5 }}>
          R$ {total.toFixed(2)}
        </Typography>
      </Grid>
      <Grid container sx={{ display: 'flex', justifyContent: 'center', }}>
        <Button
          disabled={isCartEmpty}
          onClick={handleProceedToCheckout}
          sx={{
            backgroundColor: isCartEmpty ? '#ccc' : colorTheme.palette.primary.main,
            color: colorTheme.palette.secondary.light,
            p: 2,
            ml: 2,
            '&:hover': {
              backgroundColor: isCartEmpty ? '#ccc' : darken(colorTheme.palette.primary.main, 0.2),
            },
          }}>
          Prosseguir com pedido
        </Button>
      </Grid>
    </Grid>

  );
};

export default Cart;