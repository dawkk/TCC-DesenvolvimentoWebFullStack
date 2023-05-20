import { Box, Button, Card, CardContent, Grid, List, ListItem, ListItemText, Paper, Popover, Typography } from "@mui/material";
import IUserOrderDetails from "../../../../interfaces/IUserOrderDetails";
import { useEffect, useState } from "react";
import http from "../../../../api/axios";
import styles from './ListOrders.module.scss'
import IOrderStatus from '../../../../interfaces/IOrderStatus'


const ListOrders = () => {
  const [orders, setOrders] = useState<IUserOrderDetails[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<IOrderStatus[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedStatusTitle, setSelectedStatusTitle] = useState("Pedidos Pendentes");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const open = Boolean(anchorEl);
  const id = open ? 'status-popover' : undefined;


  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await http.get<IUserOrderDetails[]>('/orders');
      const sortedOrders = response.data.sort((a, b) => {
        const dateA = new Date(a.dateOrdered || '');
        const dateB = new Date(b.dateOrdered || '');
        return dateA.getTime() - dateB.getTime();
      });
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false); // Reset loading state to false
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedStatus]);

  useEffect(() => {
    const fetchOrderStatuses = async () => {
      try {
        const response = await http.get('/orders/status');
        setOrderStatuses(response.data);
      } catch (error) {
        console.error('Error fetching order statuses:', error);
      }
    };
    fetchOrderStatuses();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleStatusClick = (status: string) => {
    setSelectedStatus(status);
    setSelectedStatusTitle(status);
    setAnchorEl(null);
    setIsLoading(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccept = async (orderId: string, selectedStatusId: string) => {
    try {
      console.log('handleAccept orderID', orderId, 'handleAccept orderID', orderId)
      const response = await http.put(`/orders/${orderId}`, { status: selectedStatusId });
      /* setSelectedStatus(selectedStatusId); */
      console.log('handleAccept response', response.data)
      await fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };


  const getButtonTypographyStyle = (status: string | undefined) => {
    switch (status) {
      case 'Pending':
        return styles.PendingButton;
      case 'Iniciando Preparo':
        return styles.PreparingButton;
      case 'Delivery a caminho':
        return styles.DeliveryButton;
      case 'Completo':
        return styles.CompleteButton;
      case 'Cancelado':
        return styles.CancelledButton;
      default:
        return styles.DefaultButton;
    }
  };

  return (
    <Box className={styles.GridMainContainer}>
      <Grid container className={styles.GridContainerOrders}>
        {orderStatuses.map((status: IOrderStatus) => (
          <Grid item key={status._id}>
            <Button variant='contained' className={styles.ButtonStatusSelect} onClick={() => handleStatusClick(status.status)}
              disabled={isLoading}
            >
              {status.status}
            </Button>
          </Grid>
        ))}
        <Grid item xs={8}>
          <Paper>
            <Typography variant="h4" className={styles.OrdersTitle}>
              {selectedStatusTitle}
            </Typography>
          </Paper>
        </Grid>
        {orders.map((order) => (
          <Grid item xs={8} key={order._id} className={styles.GridOrders}>
            <Card variant="outlined" sx={{ borderRadius: "0.5rem" }}>
              <CardContent>
                <Typography variant="h6" sx={{ borderBottom: "1px solid #f0f0f0", pb: 1, mb: 2 }}>
                  {order._id}
                </Typography>

                <Typography
                  className={`${styles.PendingButton} ${getButtonTypographyStyle(order.status?.status)}`}
                >
                  {order.status?.status}
                </Typography>
                <Button></Button>

                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <List className={styles.PopOverList}>
                    {orderStatuses.map((status: IOrderStatus) => (
                      <ListItem
                        key={status._id}
                        button
                        onClick={() => handleAccept(order._id, status._id)}
                      >
                        <ListItemText primary={status.status} />
                      </ListItem>
                    ))}
                  </List>
                </Popover>



                <Typography>Criação do Pedido: {order.dateOrdered?.toLocaleString()}</Typography>
                <Typography sx={{ borderBottom: "1px solid #f0f0f0", pb: 1, mb: 1 }}>Total R$ {order.totalAmount}</Typography>
                {order.cartItems?.map((cartItem) => (
                  <Box key={cartItem._id} sx={{ borderBottom: "1px solid #f0f0f0", pb: 1, mb: 2 }}>
                    <Typography>{cartItem.dishId?.title}</Typography>
                    <Typography>Quantidade {cartItem.quantity}</Typography>
                    <Typography>R$ {cartItem.dishId?.price}</Typography>
                  </Box>
                ))}
                <Typography>{order.userId?.firstName}, {order.userId?.lastName}</Typography>
                <Typography>
                  Endereço de entrega: {order.deliveryAddress?.street}, {order.deliveryAddress?.number},
                  {order.deliveryAddress?.neighborhood}, {order.deliveryAddress?.additionalInfo}
                </Typography>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Box >
  )
}

export default ListOrders;