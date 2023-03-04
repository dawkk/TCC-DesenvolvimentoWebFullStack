import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../api/axios";
import IDish from "../../../interfaces/IDish";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import colorTheme from "../../../components/ColorThemes";


const ListDishes: React.FC = () => {
  const [dishes, setDishes] = useState<IDish[]>([])

  useEffect(() => {
    http.get<IDish[]>('/dishes')
      .then(response => setDishes(response.data))
  }, [])

  return (
    <>
      <Box sx={{ backgroundColor: colorTheme.palette.primary.light, height: '100vh' }}>
        <Box sx={{ ml: '20%', mr: '20%', mb: 20 }}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ backgroundColor: 'white' }}>
              <Paper>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 2 }}>
                  <Typography variant="h4">Listagem de Pratos</Typography>
                </Box>
              </Paper>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow >
                      <TableCell align="center" >ID</TableCell>
                      <TableCell align="center">Titulo</TableCell>
                      <TableCell align="center">Descrição</TableCell>
                      <TableCell align="center">Preço</TableCell>
                      <TableCell align="center">Tipo</TableCell>
                      <TableCell align="center">Editar</TableCell>
                      <TableCell align="center">Excluir</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dishes.map((dish) => (
                      <TableRow
                        key={dish._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{dish._id}</TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {dish.title}
                        </TableCell>
                        <TableCell align="center">{dish.description}</TableCell>
                        <TableCell align="center">R${dish.price}</TableCell>
                        <TableCell align="center">{dish.type}</TableCell>
                        <TableCell align="center"><Button><EditIcon /></Button></TableCell>
                        <TableCell align="center"><Button><DeleteForeverIcon /></Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box >
        </Box >
      </Box>

    </>
  )
}

export default ListDishes;