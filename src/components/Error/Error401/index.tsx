import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import errorImage from '../../../assets/images/errors/401ErrorUnauthorized-rafiki.svg'

const Error401Page = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <img src={errorImage} alt="Error 401" style={{ width: '200px' }} />
      <Typography variant="h4">Acesso não autorizado</Typography>
      <Typography variant="body1">Parece que você não possui acesso ou sua sessão de login expirou. =/</Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        sx={{ marginTop: '16px', marginBottom:'20vh' }}
      >
        Voltar
      </Button>
      <a href="https://storyset.com/web">Web illustrations by Storyset</a>
    </Box>
  );
};

export default Error401Page;




