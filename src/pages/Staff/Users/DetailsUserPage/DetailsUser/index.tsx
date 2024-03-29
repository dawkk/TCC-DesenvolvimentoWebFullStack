import EmailIcon from '@mui/icons-material/Email';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import http from "../../../../../api/axios";
import IUserAddress from "../../../../../interfaces/IUserAddress";
import IUserDetailed from "../../../../../interfaces/IUserDetailed";
import IUserOrderDetails from "../../../../../interfaces/IUserOrderDetails";
import styles from './DetailsUser.module.scss';
import { Link as RouterLink } from 'react-router-dom';


const DetailsUser: React.FC = () => {
  const [user, setUser] = useState<IUserDetailed | null>(null);
  const [orders, setOrders] = useState<IUserOrderDetails[]>([]);
  const params = useParams();

  const statusStyles: { [key: string]: string } = {
    'Pendente': styles.PendingButton,
    'Iniciando Preparo do Pedido': styles.IniciatingButton,
    'Pedido Pronto': styles.ReadyButton,
    'Delivery a caminho': styles.onTheWayButton,
    'Completo': styles.CompletedButton,
    'Cancelado': styles.CancelledButton,
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await http.get<IUserDetailed>(`/users/${params._id}`);
        setUser({
          ...response.data,
          createdAt: new Date(response.data.createdAt).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();

  }, [])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await http.get<IUserOrderDetails[]>(`/orders/user/${params._id}`);
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);


  if (!user) {
    return null;
  }



  return (
    <>
      <Grid container>

        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={1}>
            <Button component={RouterLink} to={`/staff/users`} variant="contained" color="primary" sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1
            }}>
              Voltar
            </Button>
          </Grid>
          <Grid container className={styles.GridContainerUserInfo} key={user._id}>
            <Grid item xs={12} className={styles.TitleContainersBackground}>
              <Typography variant="h5" className={styles.TitleUserInfo}>
                {user.firstName} {user.lastName}
              </Typography>
            </Grid>
            <Grid item xs={8} className={styles.GridItemUserInfo}>
              <Typography variant="body1" className={styles.TextUserInfo}>ID:{user._id} </Typography>
            </Grid>
            <Grid item xs={8} className={styles.GridItemUserInfo}>
              <ScheduleIcon />
              <Typography variant="body1" className={styles.TextUserInfo}>Criado em:{user.createdAt}</Typography>
            </Grid>
            <Grid item xs={8} className={styles.GridItemUserInfo}>
              <EmailIcon />
              <Typography variant="body1" className={styles.TextUserInfo}>{user.email}</Typography>
            </Grid>
            <Grid item xs={8} className={styles.GridItemUserInfo}>
              <PhoneEnabledIcon />
              <Typography variant="body1" className={styles.TextUserInfo}>{user.cellphone}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container className={styles.GridContainerUserInfo}>

            <Grid item xs={12} className={styles.TitleContainersBackground}>
              <Typography variant="h5">Endereços</Typography>
            </Grid>
            {user.addresses && user.addresses.map((address: IUserAddress, index: number) => (
              <Grid item xs={8} key={index} className={styles.GridItemUserInfo}>
                <Typography variant="body1"> {address.street}, {address.number}, {address.neighborhood}, {address.additionalInfo}, {address.zipcode}, {address.state}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container className={styles.GridContainerUserInfo}>

            <Grid item xs={12} className={styles.TitleContainersBackground}>
              <Typography variant="h5">Pedidos</Typography>
            </Grid>

            {orders.map((order) => (
              <Grid item xs={12} sm={8} md={6} lg={6} xl={4} key={order._id} sx={{ p: 3, boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}>
                <Typography variant="body1" sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>ID: {order._id}</Typography>
                <Typography
                  variant="body1"
                  className={statusStyles[order.status?.status || ''] as string}
                >
                  Status: {order.status?.status}
                </Typography>
                <Typography variant="body1" sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>Data do Pedido: {order.dateOrdered}</Typography>
                <Typography variant="body1">Valor Total: R$ {order.totalAmount}</Typography>
                <Typography variant="body1">Método de Pagamento: {order.paymentMethod?.name}</Typography>
                <Typography variant="body1">Endereço de Entrega: {order.deliveryAddress?.street}, {order.deliveryAddress?.number}, {order.deliveryAddress?.neighborhood}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default DetailsUser;
