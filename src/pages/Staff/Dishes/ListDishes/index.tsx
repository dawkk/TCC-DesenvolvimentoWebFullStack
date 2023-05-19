import { Box, Button, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import http from "../../../../api/axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import colorTheme from "../../../../components/ColorThemes";
import IDish from "../../../../interfaces/IDish";
import IMenu from "../../../../interfaces/IMenu";
import DishPDF from "./PDFDishes";
import jsPDF from "jspdf";
import { useMediaQuery } from '@mui/material';


const ListDishes: React.FC = () => {
  const [dishes, setDishes] = useState<IDish[]>([])
  const [menus, setMenus] = useState<IMenu[]>([])
  const [showPDF, setShowPDF] = useState(false);
  const isDesktop = useMediaQuery('(min-width:1300px)');

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
    const config = { data: { _id } };
    http.delete(`/dishes/${_id}`, config)
      .then(() => {
        const listDishes = dishes.filter(dish => dish._id !== _id)
        setDishes([...listDishes])
      })
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const contentHeight = doc.internal.pageSize.getHeight();
    const lineHeight = 10;
    const maxImagesPerPage = Math.floor((contentHeight - lineHeight) / 80);
  
    doc.setFontSize(20);
    doc.text('Listagem de Pratos', 10, 10);
  
    let y = 35; // Adjusted starting position for text elements
    let imageCount = 0;
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dishes.forEach((dish, index) => {
      if (imageCount >= maxImagesPerPage) {
        doc.addPage();
        y = 35; //starting position for text elements
        imageCount = 0;
      }
  
      doc.setFontSize(16);
      doc.text(dish.title, 70, y + 5); 
      doc.text(dish.description, 70, y + 15); 
      doc.text(`Preço: R$${dish.price}`, 70, y + 25); 
      doc.text(`Menu: ${dish.menu?.name}`, 70, y + 35); 
  
      if (dish.imageURL) {
        const imgData = dish.imageURL; 
  
        const imgProps = doc.getImageProperties(imgData);
        const imgWidth = 50;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
  
        doc.addImage(imgData, 'JPEG', 10, y, imgWidth, imgHeight);
        imageCount++;
      }
  
      y += 80;
    });
  
    doc.save('pratos.pdf');
  };
  


  return (
    <>
      <Box sx={{ backgroundColor: colorTheme.palette.primary.light }}>
        <Box sx={{ ml: '10%', mr: '10%', mb: '12vh' }}>
         <Button variant="contained" component={RouterLink} to={`/staff/dishes/create`}  sx={{ mr: 1, mt:1 }}>Adicionar Novo Prato</Button>
          <Button variant="contained" onClick={handleDownloadPDF} sx={{ mr: 1, mt:1 }}>Download PDF</Button>
          <Button variant="contained" onClick={() => setShowPDF(!showPDF)} sx={{mt:1}}>Visualizar PDF</Button>
          {showPDF && <DishPDF dishes={dishes} />}
          <Box sx={{ display: 'flex', mt: 3 }}>
            <Box sx={{ backgroundColor: 'white' }}>
              <Paper>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 2 }}>
                  <Typography variant="h4">Listagem de Pratos</Typography>
                </Box>
              </Paper>
              {isDesktop ? (<TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table /* sx={{ minWidth: 550 }} */ aria-label="simple table">
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
              ) : (
                dishes.map((dish) => (
                  <Box
                    key={dish._id}
                    sx={{
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      marginBottom: '16px',
                      padding: '16px',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {dish.title}
                      </Typography>
                      <Button component={RouterLink} to={`/staff/dishes/${dish._id}`} variant="contained" color="primary" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr:1
                      }}> <EditIcon />
                      </Button>

                      <Button variant="contained" color="primary" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }} onClick={() => deleteDish(dish._id)}><DeleteForeverIcon /></Button>
                    </Box>
                    <Box sx={{ marginBottom: '8px' }}>
                      <Typography variant="body1">{dish.description}</Typography>
                    </Box>
                    <Box sx={{ marginBottom: '8px' }}>
                      <Typography variant="body1">Preço: R${dish.price}</Typography>
                    </Box>
                    <Box sx={{ marginBottom: '8px' }}>
                      <Typography variant="body1">Tipo: {dish.type}</Typography>
                    </Box>
                    <Box sx={{ marginBottom: '8px' }}>
                      <Typography variant="body1">Menu: {dish.menu?.name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      {dish.image && <img src={dish.imageURL} alt={dish.title} height={100} width={100} />}
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          </Box >
        </Box >
      </Box>

    </>
  )
}

export default ListDishes;