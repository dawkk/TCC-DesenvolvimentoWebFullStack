import { Box, Card, CardMedia, Typography, IconButton, Button, CardActions, CardContent, Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ICartItem from "../../../../interfaces/ICartItem";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';

interface ICartProps {
  onUpdate: (items: ICartItem[]) => void;
}

const Cart: React.FC<ICartProps> = ({onUpdate}) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]') as ICartItem[];
    setCartItems(items);
  }, []);

  const handleRemoveFromCart = (id: string) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
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



  return (

    <Grid container>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
      </Grid>
      {cartItems.map(item => (
        <Grid item key={item.id} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card sx={{ display: 'flex' }}>
            <CardMedia
              component="img"
              alt="item"
              image={`https://source.unsplash.com/random?${item.name}`}
              sx={{ height:'15vh', width: '100%' }}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography gutterBottom variant="body1" textAlign={"center"} sx={{mb:1}}>
                {item.name}
              </Typography>
              <Box sx={{ display: 'flex'}}>
                <Typography variant="body1"sx={{mr:6}}>
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
    </Grid>


    /*  
    <Box>
        <Card  key={item.id}
          variant="outlined"
          sx={{
            display: 'flex',
            p: 1,
            flexDirection: {
              xs: 'column', 
              sm: 'row', 
            },
          }}
        >
          <CardMedia
            component="img"
            width="100"
            height="100"
            alt="imagem prato"
            image={require('../../../../assets/images/menus/principal/pizza.jpg')}
            sx={{
              borderRadius: 0.5,
              width: { xs: '100%', sm: 100 },
              mr: { sm: 1.5 },
              mb: { xs: 1.5, sm: 0 },
            }}
          />
          <Box sx={{ alignSelf: 'center', ml: 2 }}>
            <Typography variant="body1" color="text.secondary">
            {item.name}
            </Typography>
            <Typography component="div" fontWeight="bold" sx={{ pt: 1 }}>
              R$ {item.price}
            </Typography>
            <Box
              sx={{
                ml: -1,
                mt: 0.75,

                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                typography: 'caption',
     
              }}
            >
              <IconButton aria-label="add">
                <AddBoxIcon />
              </IconButton>
              <Typography variant='body1' sx={{ ml: 1, mr: 1 }}>{item.quantity}</Typography>
              <IconButton aria-label="minus">
                <IndeterminateCheckBoxIcon />
              </IconButton>
            </Box>
          </Box>
        </Card>
    </Box>
            */
  );
};

export default Cart;