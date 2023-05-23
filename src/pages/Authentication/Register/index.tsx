import { Box, Button, Divider, Grid, Link, Paper, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../../../components/Logo';
import styles from './Register.module.scss'
/* import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter'; */
import GoogleIcon from '@mui/icons-material/Google';
import FormFields from './FormFields';
import colorTheme from '../../../components/ColorThemes';


const Register = () => {

  const handleGoogleLogin = async () => {
    try {
      window.location.href = process.env.OAUTH_LINK as string;
    } catch (error) {
      console.log('Failed to initiate Google login:', error);
    }
  };


  return (
    <Box className={styles.Background} >
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
          <Grid sx={{ width: '50%', backgroundColor: 'whitesmoke', borderRadius: 24. }}>
            <Paper>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4, boxSizing: 'border-box' }}>
                <Typography variant='h4' sx={{ color: colorTheme.palette.primary.main }}>Registro</Typography>
              </Box>
              <Grid container spacing={2} sx={{
                pl: 4, pr: 4, boxSizing: 'border-box',
                '& .MuiTextField-root': { mb: 1 },
              }}>

                <FormFields />

                <Grid item xs={12} md={12}>
                  <Typography variant="caption" display="block" gutterBottom sx={{ mb: '32px' }}>
                    <Divider>
                      Ou registre-se com
                    </Divider>
                  </Typography>
                  <Grid item xs={12} md={12} className={styles.RegisterAuthContainer}>
                    <Button variant="contained" onClick={handleGoogleLogin} sx={{ width: '40%', height: '50px', backgroundColor: '#EA4335' }}><GoogleIcon></GoogleIcon></Button>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                    <Typography variant='body2' sx={{ mr: 0.5 }}>Já possui conta? Faça</Typography>
                    <Link component={RouterLink} to="/login" underline="none"><Typography variant='body2' fontWeight='bold'>Login</Typography></Link>
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
          <Typography component={Link} variant="subtitle2" href="link" target="_blank" underline="hover">
            LaCookeria
          </Typography>
        </Typography>
      </div>
    </Box>
  )
}

export default Register;