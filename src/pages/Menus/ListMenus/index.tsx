import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import styles from './ListMenus.module.scss'
import menuImage1 from '../../../assets/images/menus/principal/burguer_combo.jpg'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useEffect, useState } from "react";
import http from '../../../api/axios';
import IMenu from '../../../interfaces/IMenu';
import IDish from '../../../interfaces/IDish';
import ICartItem from '../../../interfaces/ICartItem';

const ListMenus = () => {
  const [dishes, setDishes] = useState<IDish[]>([])
  const [menus, setMenus] = useState<IMenu[]>([])
  const [activeMenu, setActiveMenu] = useState<string | null>(null);


  const handleAddToCart = (dish: IDish) => {
    const cartItems: ICartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
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

  useEffect(() => {
    http.get<IMenu[]>('/menus')
      .then(response => {
        setMenus(response.data);
      })
  }, [])

  const handleMenuClick = async (menuId: string) => {
    setActiveMenu(menuId);
    try {
      const response = await http.get(`/dishes/${menuId}/menu`);
      const fetchedDishes: IDish[] = response.data; 

      const updatedDishes = await Promise.all(
        fetchedDishes.map(async (dish: IDish) => {
          const dishImageResponse = await http.get(`/dishes/${dish._id}/image`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Cache-Control': 'no-cache',
            },
            responseType: 'blob',
          });
  
          if (dishImageResponse.data) {
            const imageURL = URL.createObjectURL(dishImageResponse.data);
            return { ...dish, imageURL: imageURL };
          } else {
            return dish;
          }
        })
      );
  
      setDishes(updatedDishes);
    } catch (error) {
      console.log('Error fetching dishes:', error);
    }
  };


  return (
    <>
      <Box sx={{ paddingLeft: 3.7, paddingBottom: 5, boxSizing: 'border-box' }}>
        <Grid container spacing={{ xs: 2 }} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          {menus.map((menu) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.7} key={menu._id}>
              <Button fullWidth className={`menuButton ${activeMenu === menu._id ? 'activeMenuButton' : ''}`} style={{
                backgroundImage: `url(${menuImage1})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                opacity: activeMenu === menu._id ? 0.5 : 1,
              }} onClick={() => handleMenuClick(menu._id)} sx={{height:'15vh', minHeight:'100px'}}>
                <div>
                  <h3 className={styles.MenuTitle}>{menu.name}</h3>
                </div>
              </Button>
            </Grid>

          ))
          }
        </Grid>

{/*  DISHESSSS          */}
        <Grid container>
          <Grid container spacing={4} sx={{ mt: 10, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            {dishes.map(dish =>

              <Grid item key={dish._id} sx={{ width: '40vw' }}>
                <Card sx={{ display: 'flex' }}>
                  <CardMedia
                    component="img"
                    alt="pizza"
                    height="300"
                    sx={{ maxHeight: 300, maxWidth: 280 }}
                    src={dish.imageURL}
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
                        <Button onClick={() => handleAddToCart(dish)} sx={{ border: 'solid', pl: 8, pr: 8, alignSelf: 'flex-end' }}>
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

        {/*       <ListPlates /> */}

      </Box>
    </>
  )
}

export default ListMenus;