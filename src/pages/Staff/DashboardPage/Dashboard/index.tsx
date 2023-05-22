import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import http from '../../../../api/axios';
import styles from './Dashboard.module.scss';
import IUserOrderDetails from '../../../../interfaces/IUserOrderDetails';
import jsPDF from 'jspdf';

interface ISalesData {
  date: string;
  totalSales: number;
  orderCount: number;
}

interface IResponseData {
  salesData: ISalesData[];
  totalSales: number;
  orderCount: number;
}

const Dashboard = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [orders, setOrders] = useState<IUserOrderDetails[]>([]);
  const [salesData, setSalesData] = useState<ISalesData[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalSales, setTotalSales] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [orderCount, setOrderCount] = useState(0);

  const fetchOrders = async () => {
    try {
      const response = await http.get<IUserOrderDetails[]>('/orders');
      setOrders(response.data);
      console.log('this is response.data', response.data)
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };


  useEffect(() => {
    fetchOrders();
  }, []);

  const handleGeneratePDF = () => {

    const doc = new jsPDF();

    doc.text('Order Details', 10, 10);
    let yPos = 20;
    const pageHeight = doc.internal.pageSize.height;
    let currentPage = 1;

    orders.forEach((order) => {
      if (yPos + 120 > pageHeight) {
        doc.addPage();
        currentPage++;
        yPos = 20;
      }

      doc.text(`Order ID: ${order._id}`, 10, yPos);
      yPos += 10;
      doc.text(`User: ${order.userId?.firstName} ${order.userId?.lastName}`, 10, yPos);
      yPos += 10;
      doc.text(`Email: ${order.userId?.email}`, 10, yPos);
      yPos += 10;
      doc.text(`City: ${order.deliveryAddress?.city}`, 10, yPos);
      yPos += 10;
      doc.text(`State: ${order.deliveryAddress?.state}`, 10, yPos);
      yPos += 10;
      doc.text(`Neighborhood: ${order.deliveryAddress?.neighborhood}`, 10, yPos);
      yPos += 10;
      doc.text(`Street: ${order.deliveryAddress?.street}`, 10, yPos);
      yPos += 10;
      doc.text(`Number: ${order.deliveryAddress?.number}`, 10, yPos);
      yPos += 10;
      doc.text(`Zipcode: ${order.deliveryAddress?.zipcode}`, 10, yPos);
      yPos += 10;
      doc.text(`Additional Info: ${order.deliveryAddress?.additionalInfo}`, 10, yPos);
      yPos += 10;
      doc.text(`Payment Method: ${order.paymentMethod?.name}`, 10, yPos);
      yPos += 10;

      order.cartItems?.forEach((item) => {
        if (item.dishId) {
          doc.text(`Dish ID: ${item.dishId._id}`, 10, yPos);
          yPos += 10;
          doc.text(`Title: ${item.dishId.title}`, 10, yPos);
          yPos += 10;
          doc.text(`Price: ${item.dishId.price}`, 10, yPos);
          yPos += 10;
          doc.text(`Quantity: ${item.quantity}`, 10, yPos);
          yPos += 10;
        }
      });

      doc.text(`Total Amount: ${order.totalAmount}`, 10, yPos);
      yPos += 10;
      doc.text(`Status: ${order.status?.status}`, 10, yPos);
      yPos += 10;
      doc.text(`Date Ordered: ${order.dateOrdered}`, 10, yPos);
      yPos += 10;
      doc.text(`Updated At: ${order.updatedAt}`, 10, yPos);
      yPos += 10;

      yPos += 10;

      if (currentPage < doc.getNumberOfPages()) {
        doc.addPage();
        currentPage++;
        yPos = 20;
      }
    });

    doc.save('orders.pdf');
  };



  const handleDateRangeChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  /*  const handleRefreshChart = async () => {
     if (startDate && endDate) {
       await fetchSalesData();
     }
   }; */

  const fetchSalesData = async () => {
    try {
      const response = await http.post<IResponseData>('/orders/status/completed/query', {
        query: {
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
        },
      });
      const { salesData, totalSales, orderCount } = response.data;
      setSalesData(salesData);
      setTotalSales(totalSales);
      setOrderCount(orderCount);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchSalesData();
    }
  }, [startDate, endDate]);

  return (
    <Box className={styles.GridMainContainer}>
      <Grid container className={styles.GridContainerOrders}>
        <Grid item xs={12} className={styles.GridTitleContainer}>
          <Paper>
            <Typography variant="h4">
              Dashboard
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" gutterBottom>
            Escolha as datas:
          </Typography>
          <DatePicker
            selected={startDate}
            onChange={handleDateRangeChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
          {/* <Button variant="contained" onClick={handleRefreshChart}>
            Atualizar Grafico
          </Button> */}
          <Button variant="contained" onClick={handleGeneratePDF}>
            Download PDF todos pedidos
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" reversed={true} tickFormatter={(date) => new Date(date).toLocaleDateString('en-GB')} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="totalSales"
                name="Total Vendas"
                fill="rgba(75, 192, 192, 0.8)"
              />
              <Bar
                dataKey="orderCount"
                name="Numero de Pedidos"
                fill="rgba(54, 162, 235, 0.8)"
              />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
