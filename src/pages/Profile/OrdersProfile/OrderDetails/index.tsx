import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Link, Button } from "@mui/material";
import Footer from "../../../../components/Footer";
import NavBar from "../../../../components/NavBar";
import { Link as RouterLink, useParams } from 'react-router-dom';
import colorTheme from '../../../../components/ColorThemes';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import NavProfile from "../../NavProfile";
import IOrder from "../../../../interfaces/IOrder";
import { useEffect, useState } from "react";
import http from "../../../../api/axios";

const OrderDetail = () => {
  const params = useParams();
  const [orders, setOrders] = useState<IOrder[]>([])

  useEffect(() => {
    http.get<IOrder[]>(`/dishes/${params._id}`)
      .then(response => {
        setOrders(response.data);
      })
  }, []);



  return (
    <Box>
      <NavBar />
      <Box sx={{ backgroundColor: colorTheme.palette.primary.light, height: '100vh', paddingTop: 25 }}>
        <Box sx={{ ml: '20%', mr: '20%', mb: 20 }}>
          <Box sx={{ display: 'flex' }}>
            <NavProfile />
            <Box sx={{ backgroundColor: 'white' }}>
              <Paper>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                  <ShoppingCartCheckoutIcon fontSize="large" color="primary" sx={{ mr: 6 }} />
                  <Typography variant="h4">Meus Pedidos</Typography>
                </Box>
              </Paper>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow >
                      <TableCell align="center">Pedido</TableCell>
                      <TableCell align="center">Valor</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell align="center">{order._id}</TableCell>
                        <TableCell align="center">R$ {order.totalAmount}</TableCell>
                        <TableCell align="center">{order.status.status}</TableCell>
                        <TableCell align="center">
                          <Link component={RouterLink} to={`/profile/orders/${order._id}`}>
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
            </Box>
          </Box >
        </Box >
      </Box>
      <Footer />
    </Box>
  )
}

export default OrderDetail;