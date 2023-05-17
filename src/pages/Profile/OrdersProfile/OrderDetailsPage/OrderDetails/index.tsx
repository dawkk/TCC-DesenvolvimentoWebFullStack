import { Box, Paper, Grid, Typography, Divider, Card, CardContent, CardMedia } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import http from "../../../../../api/axios";
import IUserOrderDetails from "../../../../../interfaces/IUserOrderDetails";
import styles from './OrderDetails.module.scss'


const OrdersDetails = () => {
  const params = useParams();
  const [orders, setOrders] = useState<IUserOrderDetails[]>([])



  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await http.get<IUserOrderDetails>(`/orders/me/${params._id}`);
        const order = response.data;
        order.dateOrdered = response.data.dateOrdered ? new Date(response.data.dateOrdered) : undefined;
        order.updatedAt = response.data.updatedAt ? new Date(response.data.updatedAt) : undefined;
        setOrders([order]);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
  }, []);

  const [cartItems, setCartItems] = useState<Array<{
    dishId: string;
    dishTitle: string;
    dishPrice: number;
    dishQuantity: number;
    image?: string | undefined;
    imageURL?: string | null | undefined;
  }>>([]);

  const fetchDishImage = async (dishId: string) => {
    try {
      const response = await http.get(`/dishes/${dishId}/image`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Cache-Control': 'no-cache',
        },
        responseType: 'blob',
      });

      if (response.data) {
        const imageURL = URL.createObjectURL(response.data);
        return imageURL;
      }
    } catch (error) {
      console.error('Error fetching dish image:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      if (orders.length > 0 && orders[0].cartItems && orders[0].cartItems.length > 0) {
        const updatedCartItems = await Promise.all(
          orders[0].cartItems.map(async (item) => {
            const imageURL = await fetchDishImage(item.dishId._id);
            return {
              dishId: item.dishId._id,
              dishTitle: item.dishId.title,
              dishPrice: item.dishId.price,
              dishQuantity: item.quantity,
              imageURL: imageURL,
            };
          })
        );

        setCartItems(updatedCartItems);
      }
    };

    fetchCartItems();
  }, [orders]);

  return (
    <Box sx={{ backgroundColor: 'white' }}>
      <Paper>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
          <Typography variant="h4">Pedido</Typography>
        </Box>
      </Paper>
      <Grid container component={Paper}>
        {orders.length > 0 && (
          <Grid container spacing={2} sx={{ textAlign: 'center', fontWeight: 'bold', mt: 2 }}>
            <Grid item xs={12}>
              <Typography>{`Pedido: ${orders[0]._id || ''}`}</Typography>
              <Typography>
                {`Data do Pedido: ${orders[0].dateOrdered?.toLocaleString('pt-BR', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                }) || ''}`}
              </Typography>
              <Typography>{`Status: ${orders[0].status?.status || ''}`}</Typography>
              <Typography>
                {`Última Atualização: ${orders[0].updatedAt?.toLocaleString('pt-BR', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                }) || ''}`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                  <Typography variant="h5">Identificação</Typography>
                </Box>
              </Divider>
              <Typography>{`Nome: ${orders[0].userId?.firstName || ''}`}</Typography>
              <Typography>{`Email: ${orders[0].userId?.email || ''}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                  <Typography variant="h5">Endereço</Typography>
                </Box>
              </Divider>
              <Typography>{`Cidade: ${orders[0].deliveryAddress?.city || ''}`}</Typography>
              <Typography>{`Estado: ${orders[0].deliveryAddress?.state || ''}`}</Typography>
              <Typography>{`Bairro: ${orders[0].deliveryAddress?.neighborhood || ''}`}</Typography>
              <Typography>{`Rua: ${orders[0].deliveryAddress?.street || ''}`}</Typography>
              <Typography>{`Número: ${orders[0].deliveryAddress?.number || ''}`}</Typography>
              <Typography>{`CEP: ${orders[0].deliveryAddress?.zipcode || ''}`}</Typography>
              <Typography>{`Informação Adicional: ${orders[0].deliveryAddress?.additionalInfo || ''}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                  <Typography variant="h5">Forma de Pagamento</Typography>
                </Box>
              </Divider>
              <Typography>{`Ao Entregador: ${orders[0].paymentMethod?.name || ''}`}</Typography>
            </Grid>
          </Grid>
        )}
        {orders.length > 0 && orders[0].cartItems && orders[0].cartItems.length > 0 && (
          <Grid container spacing={2} sx={{ textAlign: 'center', fontWeight: 'bold', mt: 2 }}>
            <Grid item xs={12}>
              <Divider>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                  <Typography variant="h5">Itens do Carrinho</Typography>
                </Box>
              </Divider>
              {cartItems.map((item) => (
                <Grid item xs={12} key={item.dishId} className={styles.GridItemCardContainer}>
                  <Card className={styles.ItemCard}>
                    <CardMedia
                      component="img"
                      alt="Comida"
                      className={styles.ItemCardImage}
                      src={item.imageURL ?? ''}
                    />
                    <CardContent className={styles.ItemCardContent}>
                      <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
                        {item.dishTitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" textAlign={"center"}>
                        Quantidade: {item.dishQuantity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" textAlign={"center"}>
                        R${item.dishPrice}
                      </Typography>
                      <Typography variant="h6" color="bold">
                        Total Item: R${item.dishQuantity * item.dishPrice}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Typography variant="h6">Total: R${orders[0].totalAmount}</Typography>
            </Grid>
          </Grid>
        )}

      </Grid>
    </Box>
  )
}

export default OrdersDetails;