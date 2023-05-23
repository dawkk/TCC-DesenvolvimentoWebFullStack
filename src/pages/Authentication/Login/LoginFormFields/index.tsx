import { Link, Divider, Alert, Box, Button, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthProvider';
import CustomizedSnackbars from '../../../../components/Alerts/Snackbar';
/* import FacebookIcon from '@mui/icons-material/Facebook'; */
import GoogleIcon from '@mui/icons-material/Google';
/* import TwitterIcon from '@mui/icons-material/Twitter'; */
import styles from '../Login.module.scss';

const LoginFormFields = () => {
  const handleGoogleLogin = async () => {
    try {
      window.location.href = process.env.OAUTH_LINK as string;
    } catch (error) {
      console.log('Failed to initiate Google login:', error);
    }
  };


  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showSucessAlert, setShowSucessAlert] = useState<boolean>(false);
  const [showFailAlert, setShowFailAlert] = useState<boolean>(false);

  const auth = useAuth();
  const navigate = useNavigate();

  async function onFinish(values: { email: string, password: string }) {
    try {
      await auth.login(values.email, values.password);
      setShowSucessAlert(true);
      setShowFailAlert(false);

      const currentUrl = window.location.pathname;


      setTimeout(() => {
        const lastVisitedUrl = localStorage.getItem('lastVisitedUrl') || '/';
        if (currentUrl === '/login') {
          navigate('/');
        } else if (currentUrl === '/checkout') {
          window.location.reload();
        } else {
          navigate(lastVisitedUrl);
        }
      }, 5000);
    } catch (error) {
      console.log("Usuario ou senha errado");
      setShowFailAlert(true);
      setShowSucessAlert(false);
    }
  }

  const yupValidationSchema = Yup.object().shape({
    email: Yup.string().email('Precisa ser um e-mail valido').max(255).required('Email Obrigatório'),
    password: Yup.string().max(255).required('Senha Obrigatória'),
  });

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={yupValidationSchema}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            setSubmitting(false);
            onFinish(values);
          } catch (err) {
            console.error(err);
            setShowFailAlert(true);
            setStatus({ success: false });
            setSubmitting(false);
          }
        }}

      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <Form noValidate onSubmit={handleSubmit}>
            {showSucessAlert &&
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CustomizedSnackbars
                  open={showSucessAlert}
                  message="Login realizado com sucesso! Redirecionando.."
                  severity="success"
                  onClose={() => setShowSucessAlert(false)}
                />
              </Box>
            }
            {showFailAlert &&
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CustomizedSnackbars
                  open={showFailAlert}
                  message="Erro: E-mail ou senha incorreto(a)."
                  severity="error"
                  onClose={() => setShowFailAlert(false)}
                />
              </Box>
            }
            <Grid
              container spacing={2} sx={{
                display: 'flex', flexWrap: 'wrap', boxSizing: 'border-box',
                '& .MuiTextField-root': { mb: 1 },
              }}>

              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel>E-mail*</InputLabel>
                  <OutlinedInput
                    id='email'
                    type='email'
                    value={values.email}
                    name='email'
                    placeholder='email@email.com'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel>Senha*</InputLabel>
                  <OutlinedInput
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name='password'
                    placeholder='******'
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    inputProps={{}}
                    error={Boolean(touched.password && errors.password)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {errors.submit && (

                <Grid item xs={12}>
                  <Alert severity="error">Email ou senha errada — Tente novamente!</Alert>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Grid item xs={12} md={12} sx={{ mt: 4 }}>
        <Typography variant="caption" display="block" gutterBottom sx={{ mb: '32px' }}>
          <Divider>
            Ou faça Login com
          </Divider>
        </Typography>
        <Grid item xs={12} md={12} className={styles.LoginAuthContainer}>

          <Button variant="contained" onClick={handleGoogleLogin} sx={{ width: '40%', height: '50px', backgroundColor: '#EA4335' }}><GoogleIcon></GoogleIcon></Button>
        </Grid>
    {/*     <Grid item xs={12} md={12} className={styles.LoginAuthContainer}>
                    <Button variant="contained" sx={{ width: '30%', height: '50px', backgroundColor: '#44558e' }}><FacebookIcon></FacebookIcon></Button>
        </Grid> */}
        {/* <Grid item xs={12} md={12} className={styles.LoginAuthContainer}>
              <Button variant="contained" sx={{ width: '30%', height: '50px', backgroundColor: '#03a9f4' }}><TwitterIcon></TwitterIcon></Button>
        </Grid> */}
        <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center', mb: 6, mt: 4 }}>
          <Typography variant='body2' sx={{ mr: 1 }}>Não possui conta?</Typography>
          <Link component={RouterLink} to="/register" underline="none"><Typography variant='body2' fontWeight='bold'>Registre-se</Typography></Link>
        </Grid>
      </Grid>
    </>
  )
}

export default LoginFormFields;