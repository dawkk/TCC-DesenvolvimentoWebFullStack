import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../api/axios";
import IDish from "../../../interfaces/IDish";
import ICartItem from "../../../interfaces/ICartItem"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';



const ListPlates: React.FC = () => {
  const [dishes, setDishes] = useState<IDish[]>([])

  useEffect(() => {
    http.get<IDish[]>('/dishes')
      .then(response => setDishes(response.data))
  }, [])

  
  const handleAddToCart = (dish: IDish) => {
    const cartItems:ICartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingCartItemIndex = cartItems.findIndex((item: ICartItem) => item.id === dish._id);
  
    if (existingCartItemIndex !== -1) {
      cartItems[existingCartItemIndex].quantity += 1;
    } else {
      cartItems.push({
        id: dish._id,
        name: dish.title,
        price: dish.price,
        quantity: 1,
      });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  return (
    <Grid container>
      <Grid item xs={12} sx={{ mt: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography gutterBottom variant="h2" component="div">
          <Divider>
            Menu Principal
          </Divider>
        </Typography>
      </Grid>
      <Grid container spacing={4} sx={{ mt: 10, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {dishes.map(dish =>

          <Grid item key={dish._id} sx={{ width: '40vw' }}>
            <Card sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                alt="pizza"
                height="300"
                image={require('../../../assets/images/menus/principal/pizza.jpg')}
                sx={{ maxHeight: 300, maxWidth: 280 }}
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
                  {dish.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign={"center"}>
                  {dish.description}
                </Typography>
                <Typography variant="h6" color="bold">
                  R${dish.price}
                </Typography>
                <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', width: '100%' }}>
                    <Button onClick={() => handleAddToCart(dish)} sx={{border:'solid', pl:8, pr:8,alignSelf:'flex-end'}}>
                      <AddShoppingCartIcon fontSize="large" />
                    </Button>
                  </Box>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default ListPlates;