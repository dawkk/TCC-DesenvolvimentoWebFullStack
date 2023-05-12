import { Box, Button, Container, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import http from "../../../../api/axios";
import StaticStepper from "../../Stepper";
import ICartItem from "../../../../interfaces/ICartItem";
import CheckoutReviewData from "../../../../interfaces/IReviewCheckout";
import IOrderItems from "../../../../interfaces/IOrderItems";
import IOrderCreation from "../../../../interfaces/IOrderCreation";

const CheckoutReview = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const isMobile = useMediaQuery('(max-width: 1100px)');

  const steps = ['Identificação', 'Confirmação de Endereço', 'Método de Pagamento', 'Revisão de pedido'];
  const activeStep = 3;

  const [createdOrderItems, setCreatedOrderItems] = useState<string[]>([]);
  const [adrressId, setAddressId] = useState<string | null>(null);
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);

  const handleButtonClick = async () => {
    try {
      const orderItemIds: string[] = [];
      for (const orderItem of orderItems) {
        const { dishId, quantity } = orderItem;
        const response = await http.post('/orderItems/me', {
          dishId,
          quantity
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const createdOrderItemId = response.data._id;
        orderItemIds.push(createdOrderItemId);
      }
      setCreatedOrderItems(prevOrderItems => [...prevOrderItems, ...orderItemIds]);

      const totalAmount = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);

      const buildOrder = {
        deliveryAddress: adrressId,
        cartItems: orderItemIds,
        totalAmount: totalAmount,
        paymentMethod: paymentMethodId,
      };

      const orderResponse = await http.post('/orders', buildOrder, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log('this is order response', orderResponse.data)
      const createdOrderId = orderResponse.data._id;
      for (const orderItemId of orderItemIds) {
        console.log('this is each orderItem starting the function for update', orderItemId)
        await http.put(`/orderItems/me/order/${orderItemId}`, {
          orderId: createdOrderId
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
        });
        console.log('this is each orderItem update with new order id', orderItemId)
        localStorage.removeItem('cartItems');
      }
      navigate('/');
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        navigate('/401');
      } else {
        console.log(error);
      }
    }
  };

  const handleButtonReturn = async () => {
    try {
      navigate('/menu');
    } catch (error: unknown) {
      console.log(error);
    }
  };


  useEffect(() => {
    setBuildOrder(prevOrder => {
      if (prevOrder) {
        const totalAmount = cartItems.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);

        return {
          ...prevOrder,
          cartItems: cartItems,
          totalAmount: totalAmount
        };
      }
      return prevOrder;
    });
  }, [createdOrderItems]);


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

  const [orderItems, setOrderItems] = useState<IOrderItems[]>([]);



  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]') as ICartItem[];
    setCartItems(items);
    setIsCartEmpty(items.length === 0);

    const orderItems = items.map((item) => ({
      dishId: item.id,
      quantity: item.quantity,
    }));
    setOrderItems(orderItems);
    items.forEach(item => {
      getImage(item);
    });
  }, []);



  const [userInfo, setUserInfo] = useState<CheckoutReviewData | null>(null);
  const [buildOrder, setBuildOrder] = useState<IOrderCreation | null>(null);


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await http.get('/checkouts/me');
        /*         console.log('This is response.data from checkouts/me', response.data) */
        const userData = {
          userId: {
            firstName: response.data[0].userId.firstName,
            email: response.data[0].userId.email,
          },
          deliveryAddress: {
            city: response.data[0].deliveryAddress.city,
            state: response.data[0].deliveryAddress.state,
            neighborhood: response.data[0].deliveryAddress.neighborhood,
            street: response.data[0].deliveryAddress.street,
            number: response.data[0].deliveryAddress.number,
            zipcode: response.data[0].deliveryAddress.zipcode,
            additionalInfo: response.data[0].deliveryAddress.additionalInfo,
          },
          paymentMethod: {
            name: response.data[0].paymentMethod.name,
          },
        };
        setUserInfo(userData);
        const orderData: IOrderCreation = {
          deliveryAddress: response.data[0].deliveryAddress._id,
          cartItems: response.data[0].cartItems,
          totalAmount: response.data[0].totalAmount,
          paymentMethod: response.data[0].paymentMethod._id,
        };

        setAddressId(response.data[0].deliveryAddress._id)
        setPaymentMethodId(response.data[0].paymentMethod._id)
        setBuildOrder(orderData);
        console.log('console log orderData from useEffect', orderData)
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const { userId, deliveryAddress, paymentMethod } = userInfo || {};

  return (
    <React.Fragment>
      <Container sx={{ m: 2 }}>
        {isMobile ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
            <VerticalStepper steps={steps} activeStep={activeStep} />
          </Box>
        ) : (
          <StaticStepper steps={steps} activeStep={activeStep} />
        )}
        <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Box sx={{ backgroundColor: 'white' }}>
            {userInfo && (
              <Grid container spacing={2} sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                <Grid item xs={12}>
                  <Divider>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                      <Typography variant="h5">Identificação</Typography>
                    </Box>
                  </Divider>
                  <Typography>{`Nome: ${userId?.firstName || ''}`}</Typography>
                  <Typography>{`Email: ${userId?.email || ''}`}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                      <Typography variant="h5">Endereço</Typography>
                    </Box>
                  </Divider>
                  <Typography>{`Cidade: ${deliveryAddress?.city || ''}`}</Typography>
                  <Typography>{`Estado: ${deliveryAddress?.state || ''}`}</Typography>
                  <Typography>{`Bairro: ${deliveryAddress?.neighborhood || ''}`}</Typography>
                  <Typography>{`Rua: ${deliveryAddress?.street || ''}`}</Typography>
                  <Typography>{`Numero: ${deliveryAddress?.number || ''}`}</Typography>
                  <Typography>{`CEP: ${deliveryAddress?.zipcode || ''}`}</Typography>
                  <Typography>{`Informação Adicional: ${deliveryAddress?.additionalInfo || ''}`}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                      <Typography variant="h5">Forma de Pagamento</Typography>
                    </Box>
                  </Divider>
                  <Typography>{`Ao Entregador: ${paymentMethod?.name || ''}`}</Typography>
                </Grid>
              </Grid>
            )}



            <Divider>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 2 }}>
                <Typography variant="h5">Produtos</Typography>
              </Box>
            </Divider>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow >
                    <TableCell align="center">Imagem</TableCell>
                    <TableCell align="center">Titulo</TableCell>
                    <TableCell align="center">Preço</TableCell>
                    <TableCell align="center">Quantidade</TableCell>
                    <TableCell align="center">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{item.image && <img src={item.image} alt={item.name} height={100} width={100} />}</TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {item.name}
                      </TableCell>
                      <TableCell align="center">R$ {item.price}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">R$ {(item.price * item.quantity).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
        <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleButtonReturn} sx={{
              backgroundColor: colorTheme.palette.primary.main, color: colorTheme.palette.secondary.light, width: '100px',
              '&:hover': {
                backgroundColor: darken(colorTheme.palette.primary.main, 0.2),
              },
            }}>
              Voltar
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={handleButtonClick}
              disabled={isCartEmpty}
              sx={{
                backgroundColor: isCartEmpty ? '#ccc' : colorTheme.palette.primary.main,
                color: colorTheme.palette.secondary.light,
                p: 2,
                ml: 2,
                '&:hover': {
                  backgroundColor: isCartEmpty ? '#ccc' : darken(colorTheme.palette.primary.main, 0.2),
                },
              }}
            >
              Finalizar Pedido
            </Button>
          </Box>
        </Container>
      </Container>
      {isCartEmpty && (
        <Typography variant="body1" align="center" color="error">
          Carrinho vazio, clique em voltar e adicione produtos.
        </Typography>
      )}
    </React.Fragment>
  )
}

export default CheckoutReview;