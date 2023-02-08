import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Footer from "../../../components/Footer";
import NavBar from "../../../components/NavBar";
import colorTheme from '../../../components/ColorThemes';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import NavProfile from "../NavProfile";


const OrdersProfile = () => {

  function createData(
    order: number,
    name: string,
    status: string,
    total: number,
    link: string,
  ) {
    return { order, name, status, total, link };
  }

  const rows = [
    createData(15, 'Frozen yoghurt', 'Concluido', 250, 'Ver Mais(link)'),
    createData(25, 'Ice cream sandwich', 'Cancelado', 150, 'Ver Mais(link)'),
    createData(356, 'Eclair', 'Concluido', 199, 'Ver Mais(link)'),
    createData(150, 'Cupcake', 'Concluido', 50, 'Ver Mais(link)'),
    createData(289, 'Gingerbread', 'Concluido', 25, 'Ver Mais(link)'),
  ];

  return (
    <Box>
      <NavBar />
      <Box sx={{ backgroundColor: colorTheme.palette.primary.light, height: '100vh', paddingTop: 25 }}>
        <Box sx={{ ml: '20%', mr: '20%', mb: 20 }}>
          <Box sx={{ display: 'flex' }}>
            <NavProfile/>
            <Box sx={{ backgroundColor: 'white' }}>
              <Paper>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 2 }}>
                  <ShoppingCartCheckoutIcon fontSize="large" color="primary" sx={{ mr: 6 }} />
                  <Typography variant="h4">Resumo do seu ultimo pedido</Typography>
                </Box>
              </Paper>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow >
                      <TableCell align="center" >Pedido</TableCell>
                      <TableCell align="center">Produto</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Total</TableCell>
                      <TableCell align="center">Mais Detalhes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{row.order}</TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.status}</TableCell>
                        <TableCell align="center">{row.total}</TableCell>
                        <TableCell align="center">{row.link}</TableCell>
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

export default OrdersProfile;

{/* <Link component={RouterLink} to="/">
              <Button variant="outlined" sx={{ width: '100%' }} startIcon={<HomeIcon />}>
                Visão Geral da Conta
              </Button>
            </Link>
          </Box>

          <Link component={RouterLink} to="/" >
            <Button variant="outlined" startIcon={<AccountBoxIcon />}>
              Editar Perfil
            </Button>
          </Link>

          <Link component={RouterLink} to="/">
            <Button variant="outlined" sx={{ width: '100%' }} startIcon={<EditIcon />}>
              Meus Pedidos
            </Button>
          </Link> */}