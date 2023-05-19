import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Button, Divider, Grid, Link, Paper, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import colorTheme from '../../../components/ColorThemes';
import Logo from '../../../components/Logo';
import styles from './Login.module.scss';
import LoginFormFields from './LoginFormFields';


const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      window.location.href = "http://localhost:8000/auth/google";
    } catch (error) {
      console.log('Failed to initiate Google login:', error);
    }
  };


    return (
      <Box className={styles.Background} sx={{ height: '100%' }}>
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          sx={{
            minHeight: '100vh'
          }}
        >
          <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
            <Logo />
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: { xs: 'calc(100vh - 80px)', md: 'calc(100vh - 50px)' } }}
          >
            <Grid justifyContent="center" alignItems="center" sx={{ width: '40%', backgroundColor: 'whitesmoke', borderRadius: 24. }}>
              <Paper>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 4, boxSizing: 'border-box' }}>
                  <Typography variant='h4'>Login</Typography>
                  <Link component={RouterLink} to="/register"><Typography variant='h6'>Não possui conta?</Typography></Link>
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
                    <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'space-between', mb: 6 }}>
                      <Button variant="contained" sx={{ width: '30%', height: '50px', backgroundColor: '#44558e' }}><FacebookIcon></FacebookIcon></Button>
                      {/* <Button variant="contained" onClick={handleGoogleLogin} sx={{ width: '30%', height: '50px', backgroundColor: '#EA4335' }}><GoogleIcon></GoogleIcon></Button> */}
                      <GoogleLoginButton />
                      <Button variant="contained" sx={{ width: '30%', height: '50px', backgroundColor: '#03a9f4' }}><TwitterIcon></TwitterIcon></Button>
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