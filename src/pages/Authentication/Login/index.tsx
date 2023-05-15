import { Box, Button, Divider, Grid, Link, Paper, Typography } from '@mui/material';
import Logo from '../../../components/Logo';
import { Link as RouterLink } from 'react-router-dom';
import styles from './Login.module.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import LoginFormFields from './LoginFormFields';
import http from '../../../api/axios';
import colorTheme from '../../../components/ColorThemes';


const Login = () => {

  const handleGoogleLogin = async () => {
    try {
      // Make an HTTP request to your backend endpoint for Google OAuth

      // Handle the response from your backend accordingly
      // For example, you can redirect the user to the Google OAuth URL returned by the backend
      // this code below for some reason, generates CORS errors
      /*  const response = await http.get('/auth/google'); */
      /* window.location.href = response.data.authUrl; */
      window.location.href = "http://localhost:8000/auth/google";


    } catch (error) {
      // Handle any errors that occur during the request
      console.log('Failed to initiate Google login:', error);
    }
  };


  return (
    <Box className={styles.Background}>
      <Grid container>
        <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
          <Logo />
        </Grid>
        <Grid
          item
          xs={12}
          container
          className={styles.LoginContainer}
        >
          <Grid justifyContent="center" alignItems="center" className={styles.LoginContainerBackground}>
            <Paper>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4, boxSizing: 'border-box' }}>
                <Typography variant='h4' sx={{ color: colorTheme.palette.primary.main }}>Login</Typography>
              </Box>
              <Grid container sx={{
                pl: 4, pr: 4, boxSizing: 'border-box',
                '& .MuiTextField-root': { mb: 1, width: '100%' },
              }}>
                <LoginFormFields />
                <Grid item xs={12} md={12} sx={{ mt: 4 }}>
                  <Typography variant="caption" display="block" gutterBottom sx={{ mb: '32px' }}>
                    <Divider>
                      Ou faça Login com
                    </Divider>
                  </Typography>
                  <Grid item xs={12} md={12} className={styles.LoginAuthContainer}>
                    <Button variant="contained" sx={{ width: '30%', height: '50px', backgroundColor: '#44558e' }}><FacebookIcon></FacebookIcon></Button>
                    <Button variant="contained" onClick={handleGoogleLogin} sx={{ width: '30%', height: '50px', backgroundColor: '#EA4335' }}><GoogleIcon></GoogleIcon></Button>
                    <Button variant="contained" sx={{ width: '30%', height: '50px', backgroundColor: '#03a9f4' }}><TwitterIcon></TwitterIcon></Button>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                    <Typography variant='body2' sx={{ mr: 1 }}>Não possui conta?</Typography>
                    <Link component={RouterLink} to="/register" underline="none"><Typography variant='body2' fontWeight='bold'>Registre-se</Typography></Link>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <div className={styles.Footer}>
        <Typography variant="subtitle2" color="white" component="span">Copyright 2023
          &copy; &nbsp;
          <Typography component={Link} variant="subtitle2" href="https://codedthemes.com" target="_blank" underline="hover">
            LaCookeria
          </Typography>
        </Typography>
      </div>
    </Box>
  )
}

  export default Login;