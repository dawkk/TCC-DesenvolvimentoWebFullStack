import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import http from "../../../../api/axios";
import colorTheme from "../../../../components/ColorThemes";
import { useMediaQuery } from '@mui/material';
import IUser from "../../../../interfaces/IUser";
import VisibilityIcon from '@mui/icons-material/Visibility';


const ListUsers: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const isDesktop = useMediaQuery('(min-width:1000px)');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await http.get<IUser[]>(`/users`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            setUsers(response.data.map(user => ({
              ...user,
              createdAt: new Date(user.createdAt)
            })));
          })
          .catch(error => {
            console.log(error);
          })
      } catch (error: unknown) {
        console.log(error);
      }
    };
    fetchUserData();

  }, [])


  return (
    <>
      <Box sx={{ backgroundColor: colorTheme.palette.primary.light, display:'flex', justifyContent:'center' }}>
        <Box sx={{ ml: '10%', mr: '10%', mb: '12vh' }}>
          <Box sx={{ display: 'flex', mt: 3 }}>
            <Box sx={{ backgroundColor: 'white' }}>
              <Paper>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 2 }}>
                  <Typography variant="h4">Listagem de Usuários</Typography>
                </Box>
              </Paper>
              {isDesktop ? (<TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow >
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">E-mail</TableCell>
                      <TableCell align="center">Nome</TableCell>
                      <TableCell align="center">Sobrenome</TableCell>
                      <TableCell align="center">Contato</TableCell>
                      <TableCell align="center">Criado em</TableCell>
                      <TableCell align="center">Ver detalhes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow
                        key={user._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{user._id}</TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {user.firstName}
                        </TableCell>
                        <TableCell align="center">{user.lastName}</TableCell>
                        <TableCell align="center">{user.cellphone}</TableCell>
                        <TableCell align="center">{user.createdAt.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</TableCell>
                        <TableCell align="center"><Button component={RouterLink} to={`/staff/users/${user._id}`} variant="contained" color="primary" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr:1
                      }}> <VisibilityIcon />
                      </Button></TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              ) : (
                users.map((user) => (
                  <Grid container
                    key={user._id}
                    sx={{
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      marginBottom: '16px',
                      padding: '16px',
                      display:'flex',
                      justifyContent:'center'
                    }}
                  >
                    <Grid item sx={{ display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginBottom: '8px'}}>
                      <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {user._id}
                      </Typography>
                      <Button component={RouterLink} to={`/staff/useres/${user._id}`} variant="contained" color="primary" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 1,
                        mt: 1
                      }}>
                        <VisibilityIcon />
                      </Button>

                      <Grid item sx={{ marginBottom: '8px' }}>
                        <Typography variant="body1">{user.createdAt.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</Typography>
                      </Grid>
                      <Grid item sx={{ marginBottom: '8px' }}>
                        <Typography variant="body1">{user.email}</Typography>
                      </Grid>
                      <Grid item sx={{ marginBottom: '8px' }}>
                        <Typography variant="body1">{user.firstName}</Typography>
                      </Grid>
                      <Grid item sx={{ marginBottom: '8px' }}>
                        <Typography variant="body1">{user.lastName}</Typography>
                      </Grid>
                      <Grid item sx={{ marginBottom: '8px' }}>
                        <Typography variant="body1">Contato: {user.cellphone}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))
              )}
            </Box>
          </Box>
        </Box>
      </Box>

    </>
  )
}

export default ListUsers;