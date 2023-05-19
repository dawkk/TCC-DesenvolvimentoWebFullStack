import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from 'react-router-dom';
import http from "../../../../../api/axios";
import colorTheme from "../../../../../components/ColorThemes";
import { useMediaQuery } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IUserDetailed from "../../../../../interfaces/IUserDetailed";
import IUserAddress from "../../../../../interfaces/IUserAddress";


const DetailsUser: React.FC = () => {
  const [user, setUser] = useState<IUserDetailed | null>(null);
  const params = useParams();
  const isDesktop = useMediaQuery('(min-width:1000px)');

  useEffect(() => {
    console.log('this is DetailsUser params._id', params._id)
    const fetchUserData = async () => {
      try {
        const response = await http.get<IUserDetailed>(`/users/${params._id}`);
        console.log('this is DetailsUser response.data', response.data);
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

  if (!user) {
    return (
      <Typography>Loading...</Typography>
    );
  }

  return (
    <>
      <Box sx={{ backgroundColor: colorTheme.palette.primary.light, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 2 }}>
          <Typography variant="h4">Listagem de Usuários</Typography>
        </Box>

        <Grid container
          key={user._id}
          sx={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginBottom: '16px',
            padding: '16px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
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
              <Typography variant="body1">{user.createdAt}</Typography>
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

            {user.addresses && user.addresses.map((address: IUserAddress, index: number) => (
              <Grid item key={index} sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', marginBottom: '8px' }}>
                <Typography variant="body1">Address {index + 1}: {address.street}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default DetailsUser;
