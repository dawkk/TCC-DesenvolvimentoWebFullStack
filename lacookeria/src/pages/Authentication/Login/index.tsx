import { Box, Button, Checkbox, Container, Divider, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import Logo from '../../../components/Logo';
import { Link as RouterLink } from 'react-router-dom';
import styles from './Login.module.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';


const Login = () => {
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
              <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 4, boxSizing: 'border-box' }}>
                <Typography variant='h4'>Login</Typography>
                <Link component={RouterLink} to="/register"><Typography variant='h6'>Não possui conta?</Typography></Link>
                
              </Box>
              <Grid component="form" sx={{
                pl: 4, pr: 4, boxSizing: 'border-box',
                '& .MuiTextField-root': { mb: 1, width: '100%' },
              }}>
                <div>
                  <p className={styles.Text}>E-mail</p>
                  <TextField
                    id="outlined-required"
                    defaultValue="email@email.com"
                  />
                  <p className={styles.Text}>Senha</p>
                  <TextField
                    id="outlined-password-input"
                    label="Senha"
                    type="password"
                    autoComplete="current-password"
                  />
                  <div className={styles.Flex}>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Me mantenha logado" />
                    <p>Esqueci minha senha</p>
                  </div>
                  <Button variant="contained" sx={{ width: '100%', height: '50px', mb: '32px' }}>Login</Button>
                  <Typography variant="caption" display="block" gutterBottom sx={{ mb: '32px' }}>
                    <Divider> 
                      Ou faça login com
                    </Divider>
                  </Typography>
                  <Grid>
                    <Button variant="contained" sx={{ width: '30%', height: '50px', mb: '32px', mr: '22px', backgroundColor: '#44558e' }}><FacebookIcon></FacebookIcon></Button>
                    <Button variant="contained" sx={{ width: '30%', height: '50px', mb: '32px', mr: '22px', backgroundColor: '#EA4335' }}><GoogleIcon></GoogleIcon></Button>
                    <Button variant="contained" sx={{ width: '30%', height: '50px', mb: '32px', backgroundColor: '#03a9f4' }}><TwitterIcon></TwitterIcon></Button>
                  </Grid>
                </div>
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