import { Box, Button, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import http from "../../../../api/axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import colorTheme from "../../../../components/ColorThemes";
import IDish from "../../../../interfaces/IDish";
import IMenu from "../../../../interfaces/IMenu";

const ListDishes: React.FC = () => {
  const [dishes, setDishes] = useState<IDish[]>([])
  const [menus, setMenus] = useState<IMenu[]>([])

  const userLocalStorage = JSON.parse(localStorage.getItem('user') || '{}');
  const jwtValue = userLocalStorage.jwt;

  useEffect(() => {
    http.get<IMenu[]>('/menus')
      .then(response => {
        setMenus(response.data);
        http.get<IDish[]>('/dishes')
          .then(response => {
            const updatedDishes = response.data.map((dish) => {
              const menu = menus.find((menu) => menu._id === dish.menu?._id);
              return { ...dish, menuName: menu?.name };
            });
            Promise.all(updatedDishes.map(async (dish) => {
              try {
                const response = await http.get(`/dishes/${dish._id}/image`, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    'Cache-Control': 'no-cache',
                  },
                  responseType: 'blob',
                });
                if (response.data) {
                  const imageURL = URL.createObjectURL(response.data);
                  return { ...dish, imageURL: imageURL };
                } 
              } catch (error) {
                console.log('Error fetching image for dish', dish._id, error);
              }
              return dish;
            })).then((dishesWithImages) => setDishes(dishesWithImages));
          })
      })
  }, [])


  const deleteDish = (_id: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${jwtValue}`
      },
      data: { _id }
    };
    http.delete(`/dishes/${_id}`, config)
      .then(() => {
        const listDishes = dishes.filter(dish => dish._id !== _id)
        setDishes([...listDishes])
      })
  }

  return (
    <>
      <Box sx={{ backgroundColor: colorTheme.palette.primary.light }}>
        <Box sx={{ ml: '10%', mr: '10%', mb: '12vh' }}>
          <Link component={RouterLink} to={`/staff/dishes/create`}><Button variant="contained" >Adicionar Novo Prato</Button></Link>
          <Box sx={{ display: 'flex', mt: 3 }}>
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
                      <TableCell align="center" >Imagem</TableCell>
                      <TableCell align="center" >ID</TableCell>
                      <TableCell align="center">Titulo</TableCell>
                      <TableCell align="center">Descrição</TableCell>
                      <TableCell align="center">Preço</TableCell>
                      <TableCell align="center">Tipo</TableCell>
                      <TableCell align="center">Menu</TableCell>
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
                        <TableCell align="center">{dish.image && <img src={dish.imageURL} alt={dish.title} height={100} width={100} />}</TableCell>
                        <TableCell align="center">{dish._id}</TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {dish.title}
                        </TableCell>
                        <TableCell align="center">{dish.description}</TableCell>
                        <TableCell align="center">R${dish.price}</TableCell>
                        <TableCell align="center">{dish.type}</TableCell>
                        <TableCell align="center">{dish.menu?.name}</TableCell>
                        <TableCell align="center"><Link component={RouterLink} to={`/staff/dishes/${dish._id}`}><EditIcon /></Link></TableCell>
                        <TableCell align="center"><Button onClick={() => deleteDish(dish._id)}><DeleteForeverIcon /></Button></TableCell>
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