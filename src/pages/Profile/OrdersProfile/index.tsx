import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Link, Button, useMediaQuery, Grid, Card, CardActions, CardContent } from "@mui/material";
import Footer from "../../../components/Footer";
import NavBar from "../../../components/NavBar";
import { Link as RouterLink } from 'react-router-dom';
import colorTheme from '../../../components/ColorThemes';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import NavProfile from "../NavProfile";
import IOrder from "../../../interfaces/IOrder";
import { useEffect, useState } from "react";
import http from "../../../api/axios";
import styles from './OrdersProfile.module.scss'
import React from 'react';



const OrdersProfile = () => {
  const isMobile = useMediaQuery('(max-width: 800px)');
  const [orders, setOrders] = useState<IOrder[]>([])

  useEffect(() => {
    http.get<IOrder[]>('/orders/me')
      .then(response => {
        setOrders(response.data.map(order => ({
          ...order,
          dateOrdered: new Date(order.dateOrdered)
        })));
      })
  }, []);



  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light }}>
      <NavBar />
      <Box sx={{ backgroundColor: colorTheme.palette.primary.light, height: '100%', minHeight: '100vh', paddingTop: 20 }}>
        <Box className={styles.ContainerMargins}>
          <Box className={styles.ContainerNavProfile}>
            <NavProfile />
            <Box sx={{ backgroundColor: 'white' }}>
              <Paper>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                  <ShoppingCartCheckoutIcon fontSize="large" color="primary" sx={{ mr: 6 }} />
                  <Typography variant="h4">Meus Pedidos</Typography>
                </Box>
              </Paper>
              {isMobile ? (
                <Grid item xs={8} sx={{ mb: 2 }}>
                  {orders.map((order, index) => (
                    <Grid item xs={8} key={order._id} className={styles.GridOrders}>
                      <Card variant="outlined" sx={{ borderRadius: '0.5rem' }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ borderBottom: '1px solid #f0f0f0', pb: 1, mb: 2 }}>
                            {order._id}
                          </Typography>
                          <Typography>
                            {order.status?.status}
                          </Typography>
                          <Typography>Criação do Pedido: {order.dateOrdered.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</Typography>
                          <Typography sx={{ borderBottom: '1px solid #f0f0f0', pb: 1, mb: 1 }}>
                            Total R$ {order.totalAmount}
                          </Typography>
                        </CardContent>
                        <CardActions className={styles.CardActions}>
                          <Link component={RouterLink} to={`/profile/orders/${order._id}`} data-testid={`profile-orders-${index}`}>
                            <Button variant="outlined">
                              Ver Detalhes
                            </Button>
                          </Link>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 350, overflowX: 'auto' }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Pedido</TableCell>
                        <TableCell align="center">Valor</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Data</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order, index) => (
                        <TableRow key={order._id}>
                          <TableCell align="center">{order._id}</TableCell>
                          <TableCell align="center">R$ {order.totalAmount}</TableCell>
                          <TableCell align="center">{order.status.status}</TableCell>
                          <TableCell align="center">{order.dateOrdered.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</TableCell>
                          <TableCell align="center">
                            <Link component={RouterLink} to={`/profile/orders/${order._id}`} data-testid={`profile-orders-${index}`}>
                              <Button variant="outlined">
                                Ver Detalhes
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

            </Box>
          </Box >
        </Box >
      </Box>
      <Footer />
    </Box>
  )
}

export default OrdersProfile;