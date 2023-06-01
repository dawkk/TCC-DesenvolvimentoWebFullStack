import { Box, Button, Card, CardActions, CardContent, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../../api/axios";
import IOrderStatus from '../../../../interfaces/IOrderStatus';
import IUserOrderDetails from "../../../../interfaces/IUserOrderDetails";
import styles from './ListOrders.module.scss';
import CustomizedSnackbars from "../../../../components/Alerts/Snackbar";

const ListOrders = () => {
  const [orders, setOrders] = useState<IUserOrderDetails[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<IOrderStatus[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedStatusTitle, setSelectedStatusTitle] = useState('Pendente');
  const [isLoading, setIsLoading] = useState(false);
  const [showSucessAlert, setShowSucessAlert] = useState<boolean>(false);
  const [showFailAlert, setShowFailAlert] = useState<boolean>(false);


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
      setIsLoading(true);
      const response = await http.get<IUserOrderDetails[]>(`/orders/status/query?orderStatusId=${selectedStatus}`);
      const sortedOrders = response.data.sort((a, b) => {
        const dateA = new Date(a.dateOrdered || '');
        const dateB = new Date(b.dateOrdered || '');
        return dateA.getTime() - dateB.getTime();
      });
      setOrders(sortedOrders);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setOrders([]);
      } else {
        console.error('Error fetching orders:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderStatuses();
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
          await http.put(`/orders/${orderId}`, { status: selectedStatus._id });
          await fetchOrders();
          setShowSucessAlert(true);
          setShowFailAlert(false);

          setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
        } catch (error) {
          setShowSucessAlert(false);
          setShowFailAlert(true);
          console.error('Error updating order status:', error);
        }
      }
    } catch (error) {
      setShowSucessAlert(false);
      setShowFailAlert(true);
      console.error('Error updating order status:', error);
    }
  };

  const handleReject = async (orderId: string) => {
    try {
      const canceladoStatus = orderStatuses.find((status) => status.status === 'Cancelado');
      if (canceladoStatus) {
        const selectedStatusId = canceladoStatus._id;
        await http.put(`/orders/${orderId}`, { status: selectedStatusId });
        await fetchOrders();
        setShowSucessAlert(true);
        setShowFailAlert(false);

        setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
      }
    } catch (error) {
      setShowSucessAlert(false);
      setShowFailAlert(true);
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
            {showSucessAlert &&
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CustomizedSnackbars
                  open={showSucessAlert}
                  message="Pedido alterado com sucesso!"
                  severity="success"
                  onClose={() => setShowSucessAlert(false)}
                />
              </Box>
            }
            {showFailAlert &&
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CustomizedSnackbars
                  open={showFailAlert}
                  message="Erro: O Pedido não foi alterado."
                  severity="error"
                  onClose={() => setShowFailAlert(false)}
                />
              </Box>
            }
            {orderStatuses.map((status: IOrderStatus, index) => (
              <Grid item xs={12} key={status._id} className={styles.GridContainerOrders}>
                <Button
                  variant="contained"
                  className={styles.OrderStatusButton}
                  onClick={() => handleStatusClick(status._id)}
                  disabled={isLoading}
                  data-testid={`orders-status-button-sort-${index}`}
                >
                  {status.status}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Paper>
            {orders.length === 0 ? (
              <Box>
                <Typography variant="h4" className={styles.OrdersTitle}>
                  {selectedStatusTitle}
                </Typography>
                <Box sx={{display:'flex', justifyContent:'center', p:4}}>
                  <Typography>
                    Nenhum pedido encontrado para este status no momento
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Typography variant="h4" className={styles.OrdersTitle}>
                {selectedStatusTitle}
              </Typography>
            )}
          </Paper>
        </Grid>
        {orders.map((order, index) => (
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
                  data-testid={`orders-button-accept-${index}`}
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
                  data-testid={`orders-button-reject-${index}`}>
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