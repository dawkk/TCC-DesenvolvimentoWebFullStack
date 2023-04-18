import { Alert, Box, Button, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginFormFields = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showSucessAlert, setShowSucessAlert] = useState<boolean>(false);
  const [showFailAlert, setShowFailAlert] = useState<boolean>(false);

  const handleCloseAlert = () => {
    setShowSucessAlert(false);
    setShowFailAlert(false);
  };

  const auth = useAuth();
  const navigate = useNavigate();

  async function onFinish(values: { email: string, password: string }) {
    try {
      await auth.authenticate(values.email, values.password);
      setShowSucessAlert(true);
      setShowFailAlert(false);

      const currentUrl = window.location.pathname;
      localStorage.setItem('lastVisitedUrl', currentUrl);


      setTimeout(() => {

        const lastVisitedUrl = localStorage.getItem('lastVisitedUrl') || '/';
        navigate(lastVisitedUrl);
        window.location.reload();

      }, 2000); // 2000ms = 2 seconds delay
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
            /* FUNÇÃO LOGIN ABAIXO */
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
                <Alert onClose={handleCloseAlert} severity="success" sx={{ position: 'absolute', top: 120, width: '60%' }}>
                  Login realizado com sucesso! Redirecionando..
                </Alert>
              </Box>
            }
            {showFailAlert &&
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Alert onClose={handleCloseAlert} severity="error" sx={{ position: 'absolute', top: 120, width: '60%' }}>
                  Erro: E-mail ou senha incorreto(a).
                </Alert>
              </Box>
            }
            <Grid
              container spacing={2} sx={{
                display: 'flex', flexWrap: 'wrap', pl: 2, pt: 4, boxSizing: 'border-box',
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
    </>
  )
}

export default LoginFormFields;

/* 
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
<Button variant="contained" sx={{ width: '100%', height: '50px', mb: '32px' }}>Login</Button> */