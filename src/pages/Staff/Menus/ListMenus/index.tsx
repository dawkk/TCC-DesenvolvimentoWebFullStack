import { Box, Button, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import http from "../../../../api/axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import colorTheme from "../../../../components/ColorThemes";
import IMenu from "../../../../interfaces/IMenu";

const ListMenus: React.FC = () => {
  const [menus, setMenus] = useState<IMenu[]>([])

  useEffect(() => {
    http.get<IMenu[]>('/menus')
      .then(response => {
        setMenus(response.data);
        const updatedMenus = response.data.map(async (menu) => {
          try {
            const response = await http.get(`/menus/${menu._id}/image`, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Cache-Control': 'no-cache',
              },
              responseType: 'blob',
            });
            if (response.data) {
              const imageURL = URL.createObjectURL(response.data);
              return { ...menu, imageURL: imageURL };
            }
          } catch (error) {
            console.log('Error fetching image for menu', menu._id, error);
          }
          return menu;
        });
        Promise.all(updatedMenus).then((menusWithImages) => setMenus(menusWithImages));
      })
  }, []);


  const deleteMenu = (_id: string) => {
    const config = { data: { _id } };
    http.delete(`/menus/${_id}`, config)
      .then(() => {
        const listMenus = menus.filter(menu => menu._id !== _id)
        setMenus([...listMenus])
      })
  }

  return (
    <>
      <Box sx={{ backgroundColor: colorTheme.palette.primary.light,mb:'22vh' }}>
        <Box sx={{ ml: '33%', mr: '33%'}}>
          <Link component={RouterLink} to={`/staff/menus/create`}><Button variant="contained" >Adicionar Novo Menu</Button></Link>
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
                      <TableCell align="center">Nome</TableCell>
                      <TableCell align="center">Editar</TableCell>
                      <TableCell align="center">Excluir</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {menus.map((menu) => (
                      <TableRow
                        key={menu._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{menu.image && <img src={menu.imageURL} alt={menu.name} height={100} width={100} />}</TableCell>
                        <TableCell align="center">{menu._id}</TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {menu.name}
                        </TableCell>
                        <TableCell align="center"><Link component={RouterLink} to={`/staff/menus/${menu._id}`}><EditIcon /></Link></TableCell>
                        <TableCell align="center"><Button onClick={() => deleteMenu(menu._id)}><DeleteForeverIcon /></Button></TableCell>
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

export default ListMenus;