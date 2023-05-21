
import { Box, Grid, Link, Paper, Typography } from '@mui/material';
import colorTheme from '../../../components/ColorThemes';
import Logo from '../../../components/Logo';
import styles from './Login.module.scss';
import LoginFormFields from './LoginFormFields';

const Login = () => {

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