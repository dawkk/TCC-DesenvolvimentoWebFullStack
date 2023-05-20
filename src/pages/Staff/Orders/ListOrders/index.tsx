import { Box, Button, Card, CardActions, CardContent, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../../api/axios";
import IOrderStatus from '../../../../interfaces/IOrderStatus';
import IUserOrderDetails from "../../../../interfaces/IUserOrderDetails";
import styles from './ListOrders.module.scss';

const ListOrders = () => {
  const [orders, setOrders] = useState<IUserOrderDetails[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<IOrderStatus[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedStatusTitle, setSelectedStatusTitle] = useState('Pendente');
  const [isLoading, setIsLoading] = useState(false);


  const fetchOrderStatuses = async () => {
    try {
      const response = await http.get('/orders/status');
      const sortedOrderStatuses = [
        { status: "Pendente" },
        { status: "Iniciando Preparo do Pedido" },
        { status: "Pedido Pronto" },
        { status: "Delivery a caminho" },
        { status: "Completo" },
        { status: "Cancelado" }
      ];

      const orderStatusesData = response.data;

      const orderedStatuses = sortedOrderStatuses.map((sortedStatus) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const orderStatus = orderStatusesData.find((status: any) => status.status === sortedStatus.status);
        return orderStatus ? orderStatus : sortedStatus;
      });

      setOrderStatuses(orderedStatuses);
    } catch (error) {
      console.error('Error fetching order statuses:', error);
    }
  };



  const fetchOrders = async () => {
    try {
      console.log('this is selectedStatus', selectedStatus)
      setIsLoading(true);
      const response = await http.get<IUserOrderDetails[]>(`/orders/status/query?orderStatusId=${selectedStatus}`);
      const sortedOrders = response.data.sort((a, b) => {
        const dateA = new Date(a.dateOrdered || '');
        const dateB = new Date(b.dateOrdered || '');
        return dateA.getTime() - dateB.getTime();
      });
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderStatuses();
    console.log('useEffect fetchOrderStatuses is running')
  }, []);

  useEffect(() => {
    if (!selectedStatus) {
      const pendingStatus = orderStatuses.find(status => status.status === 'Pendente');
      setSelectedStatus(pendingStatus?._id || '');
    } else {
      fetchOrders();
    }
  }, [selectedStatus, orderStatuses]);


  const handleStatusClick = (status: string) => {
    setSelectedStatus(status);
    const selectedStatusObject = orderStatuses.find((orderStatus) => orderStatus._id === status);
    setSelectedStatusTitle(selectedStatusObject ? selectedStatusObject.status : '');
  };



  const handleAccept = async (orderId: string, currentStatus: string) => {
    try {
      const selectedStatus = orderStatuses.find((status) => {
        if (currentStatus === 'Pendente' && status.status === 'Iniciando Preparo do Pedido') {
          return true;
        } else if (currentStatus === 'Iniciando Preparo do Pedido' && status.status === 'Pedido Pronto') {
          return true;
        } else if (currentStatus === 'Pedido Pronto' && status.status === 'Delivery a caminho') {
          return true;
        } else if (currentStatus === 'Delivery a caminho' && status.status === 'Completo') {
          return true;
        }
        return false;
      });
      if (selectedStatus) {
        try {
          console.log('This is HandleAccept orderId it should be _id', orderId);
          console.log('This is HandleAccept selectedStatus it should be _id', selectedStatus);

          const response = await http.put(`/orders/${orderId}`, { status: selectedStatus._id });
          console.log('Response data:', response.data);

          await fetchOrders();
        } catch (error) {
          console.error('Error updating order status:', error);
        }
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleReject = async (orderId: string) => {
    try {
      const selectedStatusId = 'Cancelado';
      await http.put(`/orders/${orderId}`, { status: selectedStatusId });
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
        return '';
    }
  };


  return (
    <Box className={styles.GridMainContainer}>
      <Grid container className={styles.GridContainerOrders}>
        <Grid item xs={8} sx={{ mb: 2 }}>
          <Grid container spacing={2}  >
            {orderStatuses.map((status: IOrderStatus) => (
              <Grid item xs={12} key={status._id} className={styles.GridContainerOrders}>
                <Button
                  variant="contained"
                  className={styles.OrderStatusButton}
                  onClick={() => handleStatusClick(status._id)}
                  disabled={isLoading}
                >
                  {status.status}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Paper>
            <Typography variant="h4" className={styles.OrdersTitle}>
              {selectedStatusTitle}
            </Typography>
          </Paper>
        </Grid>
        {orders.map((order) => (
          <Grid item xs={8} key={order._id} className={styles.GridOrders}>
            <Card variant="outlined" sx={{ borderRadius: '0.5rem' }}>
              <CardContent>
                <Typography variant="h6" sx={{ borderBottom: '1px solid #f0f0f0', pb: 1, mb: 2 }}>
                  {order._id}
                </Typography>
                <Typography className={`${styles.PendingButton} ${getButtonTypographyStyle(order.status?.status)}`}>
                  {order.status?.status}
                </Typography>
                <Typography>Criação do Pedido: {order.dateOrdered?.toLocaleString()}</Typography>
                <Typography sx={{ borderBottom: '1px solid #f0f0f0', pb: 1, mb: 1 }}>
                  Total R$ {order.totalAmount}
                </Typography>
                {order.cartItems?.map((cartItem) => (
                  <Box key={cartItem._id} sx={{ borderBottom: '1px solid #f0f0f0', pb: 1, mb: 2 }}>
                    <Typography>{cartItem.dishId?.title}</Typography>
                    <Typography>Quantidade {cartItem.quantity}</Typography>
                    <Typography>R$ {cartItem.dishId?.price}</Typography>
                  </Box>
                ))}
                <Typography>
                  {order.userId?.firstName}, {order.userId?.lastName}
                </Typography>
                <Typography>
                  Endereço de entrega: {order.deliveryAddress?.street}, {order.deliveryAddress?.number},
                  {order.deliveryAddress?.neighborhood}, {order.deliveryAddress?.additionalInfo}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: order.status?.status === 'Cancelado' || order.status?.status === 'Completo' ? 'gray' : 'green',
                    color: 'white',
                    marginRight: '1rem',
                    cursor: order.status?.status === 'Cancelado' || order.status?.status === 'Completo' ? 'not-allowed' : 'pointer',
                  }}
                  onClick={() => handleAccept(order._id, order.status?.status || '')}
                  disabled={order.status?.status === 'Cancelado' || order.status?.status === 'Completo'}
                >
                  Aceitar
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: order.status?.status === 'Cancelado' || order.status?.status === 'Completo' ? 'gray' : 'red',
                    color: 'white',
                    cursor: order.status?.status === 'Cancelado' || order.status?.status === 'Completo' ? 'not-allowed' : 'pointer',
                  }}
                  onClick={() => handleReject(order._id)}
                  disabled={order.status?.status === 'Cancelado' || order.status?.status === 'Completo'}
                >
                  Rejeitar
                </Button>
              </CardActions>




            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ListOrders;