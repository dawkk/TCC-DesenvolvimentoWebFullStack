import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import http from '../../../../api/axios';
import styles from './Dashboard.module.scss';

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
  const [salesData, setSalesData] = useState<ISalesData[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalSales, setTotalSales] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [orderCount, setOrderCount] = useState(0);

  const handleDateRangeChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleRefreshChart = async () => {
    if (startDate && endDate) {
      await fetchSalesData();
    }
  };

  const fetchSalesData = async () => {
    try {
      const response = await http.post<IResponseData>('/orders/status/completed/query', {
        query: {
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
        },
      });
      console.log('fetchSalesData', response.data)
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
          <Button variant="contained" onClick={handleRefreshChart}>
            Atualizar Grafico
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
