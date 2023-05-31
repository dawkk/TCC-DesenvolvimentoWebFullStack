import { Box, Button, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import http from "../../../../api/axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import colorTheme from "../../../../components/ColorThemes";
import IMenu from "../../../../interfaces/IMenu";
import { useMediaQuery } from '@mui/material';
import MenuPDF from "./PDFMenus";
import jsPDF from "jspdf";
import CustomizedSnackbars from "../../../../components/Alerts/Snackbar";


const ListMenus: React.FC = () => {
  const [menus, setMenus] = useState<IMenu[]>([])
  const [showPDF, setShowPDF] = useState(false);
  const [showSucessAlert, setShowSucessAlert] = useState<boolean>(false);
  const [showFailAlert, setShowFailAlert] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width:700px)');

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


  const inactivateMenu = (_id: string) => {
    try{
    
    const config = { _id, statusActive: false };
    http.put(`/menus/${_id}`, config)
      .then(() => {
        const listMenus = menus.filter(menu => menu._id !== _id)
        setMenus([...listMenus])
      })
      setShowSucessAlert(true);
      setShowFailAlert(false);
    } catch(error) {
      console.log(error);
      setShowSucessAlert(false);
      setShowFailAlert(true);
    }
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
  
    const contentHeight = doc.internal.pageSize.getHeight();
    const lineHeight = 10;
    const maxImagesPerPage = Math.floor((contentHeight - lineHeight) / 80);
  
    doc.setFontSize(20);
    doc.text('Listagem de Menus', 10, 10);
  
    let y = 30;
    let imageCount = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    menus.forEach((menu, index) => {
      if (imageCount >= maxImagesPerPage) {
        doc.addPage();
        y = 20;
        imageCount = 0;
      }
  
      doc.setFontSize(16);
      doc.text(menu.name, 10, y);
      doc.text(menu._id, 10, y + 10);
      if (menu.imageURL) {
        const img = new Image();
        img.src = menu.imageURL;
        doc.addImage(img, 'JPEG', 10, y + 20, 50, 50);
        imageCount++;
      }
  
      y += 80;
    });
  
    doc.save('menus.pdf');
  };


  return (
    <>
      <Box sx={{ backgroundColor: colorTheme.palette.primary.light, mb: '22vh', display: 'flex', justifyContent: 'center' }}>
        <Box>
          <Button variant="contained" component={RouterLink} to={`/staff/menus/create`} sx={{ mr: 1, mt: 1 }}>Adicionar Novo Menu</Button>
          <Button variant="contained" onClick={handleDownloadPDF} sx={{ mr: 1, mt: 1 }}data-testid={`menu-pdf-download`}>Download PDF</Button>
          <Button variant="contained" onClick={() => setShowPDF(!showPDF)} sx={{ mt: 1 }}data-testid={`menu-pdf-view`}>Visualizar PDF</Button>
          {showPDF && <MenuPDF menus={menus} />}
          {showSucessAlert &&
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CustomizedSnackbars
                open={showSucessAlert}
                message="Menu inativo com sucesso!"
                severity="success"
                onClose={() => setShowSucessAlert(false)}
              />
            </Box>
          }
          {showFailAlert &&
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CustomizedSnackbars
                open={showFailAlert}
                message="Erro: Menu não foi alterado."
                severity="error"
                onClose={() => setShowFailAlert(false)}
              />
            </Box>
          }
          <Box sx={{ display: 'flex', mt: 3 }}>
            <Box sx={{ backgroundColor: 'white' }}>
              <Paper>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 2 }}>
                  <Typography variant="h4">Listagem de Menus</Typography>
                </Box>
              </Paper>
              {isDesktop ? (<TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" >Imagem</TableCell>
                      <TableCell align="center" >ID</TableCell>
                      <TableCell align="center">Nome</TableCell>
                      <TableCell align="center">Editar</TableCell>
                      <TableCell align="center">Excluir</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {menus.map((menu, index) => (
                      <TableRow
                        key={menu._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{menu.image && <img src={menu.imageURL} alt={menu.name} height={100} width={100} />}</TableCell>
                        <TableCell align="center">{menu._id}</TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {menu.name}
                        </TableCell>
                        <TableCell align="center"><Link component={RouterLink} to={`/staff/menus/${menu._id}`} data-testid={`menu-edit-${index}`}><EditIcon /></Link></TableCell>
                        <TableCell align="center"><Button onClick={() => inactivateMenu(menu._id)}data-testid={`menu-delete-${index}`}><DeleteForeverIcon /></Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              ) : (
                menus.map((menu, index) => (
                  <Box
                    key={menu._id}
                    sx={{
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      marginBottom: '16px',
                      padding: '16px',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {menu.name}
                      </Typography>
                      <Button component={RouterLink} to={`/staff/menus/${menu._id}`} variant="contained" color="primary" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 1
                      }} data-testid={`menu-edit-${index}`}> <EditIcon />
                      </Button>
                      <Button variant="contained" color="primary" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }} onClick={() => inactivateMenu(menu._id)} data-testid={`menu-delete-${index}`}><DeleteForeverIcon /></Button>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      {menu.image && <img src={menu.imageURL} alt={menu.name} height={100} width={100} />}
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ListMenus;
