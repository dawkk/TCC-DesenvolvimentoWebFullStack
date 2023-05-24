import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import http from '../../../../api/axios';
import CustomizedSnackbars from '../../../../components/Alerts/Snackbar';

const celRegex = /([0-9]{2,3})?(\([0-9]{2}\))([0-9]{4,5})([0-9]{4})/;

const FormFields = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showSucessAlert, setShowSucessAlert] = useState<boolean>(false);
  const [showFailAlert, setShowFailAlert] = useState<boolean>(false);

  const navigate = useNavigate();

  const yupValidationSchema = Yup.object().shape({
    firstName: Yup.string().max(255).required('Nome Obrigatório'),
    lastName: Yup.string().max(255).required('Sobrenome Obrigatório'),
    cellphone: Yup.string().matches(celRegex, 'Este numero não é valido, o formato deveria ser (XX)XXXXXXXXX').required('Celular Obrigatório'),
    email: Yup.string().email('Formato invalido precisa ser um e-mail: email@email.com').max(255).required('Email Obrigatório'),
    password: Yup.string().max(255).required('Senha Obrigatória'),
    street: Yup.string().max(255),
    number: Yup.number(),
    neighborhood: Yup.string().max(255),
    city: Yup.string().max(255),
    state: Yup.string().max(255),
    zipcode: Yup.string().matches(/^\d{5}-\d{3}$/, 'Formato inválido, deve ser XXXXX-XXX'),
    additionalInfo: Yup.string().max(255),
  });

  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          cellphone: '',
          email: '',
          password: '',
          city: '',
          street: '',
          number: '',
          neighborhood: '',
          state: '',
          zipcode: '',
          additionalInfo: '',
          submit: null
        }}
        validationSchema={yupValidationSchema}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            setSubmitting(false);

             await http.post("/users", JSON.stringify(values), {
              headers: { 'Content-Type': 'application/json' },
        
            });

            setShowSucessAlert(true);
            setShowFailAlert(false);

            setTimeout(() => {
              navigate('/login');
            }, 1000);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setSubmitting(false);
            setShowSucessAlert(false);
            setShowFailAlert(true);
          }
        }}

      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Grid
              container spacing={2} sx={{
                display: 'flex', flexWrap: 'wrap', pl: 2, pt: 4, boxSizing: 'border-box',
                '& .MuiTextField-root': { mb: 1 },
              }}>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>Nome*</InputLabel>
                  <OutlinedInput
                    id='firstName'
                    type='firstName'
                    value={values.firstName}
                    name='firstName'
                    placeholder='Nome'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.firstName && errors.firstName)}
                  />
                  {touched.firstName && errors.firstName && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.firstName}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>Ultimo Sobrenome*</InputLabel>
                  <OutlinedInput
                    id='lastName'
                    type='lastName'
                    value={values.lastName}
                    name='lastName'
                    placeholder='Sobrenome'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.lastName && errors.lastName)}
                  />
                  {touched.lastName && errors.lastName && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.lastName}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>Celular*</InputLabel>
                  <OutlinedInput
                    id='cellphone'
                    type='cellphone'
                    value={values.cellphone}
                    name='cellphone'
                    placeholder='Celular'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.cellphone && errors.cellphone)}
                  />
                  {touched.cellphone && errors.cellphone && (
                    <FormHelperText error id="helper-text-cellphone-signup">
                      {errors.cellphone}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 1 }}>
                <Typography variant='h5'>Endereço</Typography>
              </Grid>

              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel>Rua</InputLabel>
                  <OutlinedInput
                    id='street'
                    type='street'
                    value={values.street}
                    name='street'
                    placeholder='Rua Alameda Avenida'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.street && errors.street)}
                  />
                  {touched.street && errors.street && (
                    <FormHelperText error id="helper-text-street-signup">
                      {errors.street}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>Numero</InputLabel>
                  <OutlinedInput
                    id='number'
                    type='number'
                    value={values.number}
                    name='number'
                    placeholder='523'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.number && errors.number)}
                  />
                  {touched.number && errors.number && (
                    <FormHelperText error id="helper-text-number-signup">
                      {errors.number}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>Bairro</InputLabel>
                  <OutlinedInput
                    id='neighborhood'
                    type='neighborhood'
                    value={values.neighborhood}
                    name='neighborhood'
                    placeholder='Centro'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.neighborhood && errors.neighborhood)}
                  />
                  {touched.neighborhood && errors.neighborhood && (
                    <FormHelperText error id="helper-text-neighborhood-signup">
                      {errors.neighborhood}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>Cidade</InputLabel>
                  <OutlinedInput
                    id='city'
                    type='city'
                    value={values.city}
                    name='city'
                    placeholder='Campinas'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.city && errors.city)}
                  />
                  {touched.city && errors.city && (
                    <FormHelperText error id="helper-text-city-signup">
                      {errors.city}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>Estado</InputLabel>
                  <OutlinedInput
                    id='state'
                    type='state'
                    value={values.state}
                    name='state'
                    placeholder='São Paulo'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.state && errors.state)}
                  />
                  {touched.state && errors.state && (
                    <FormHelperText error id="helper-text-state-signup">
                      {errors.state}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>CEP</InputLabel>
                  <OutlinedInput
                    id='zipcode'
                    type='zipcode'
                    value={values.zipcode}
                    name='zipcode'
                    placeholder='13820-000'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.zipcode && errors.zipcode)}
                  />
                  {touched.zipcode && errors.zipcode && (
                    <FormHelperText error id="helper-text-zipcode-signup">
                      {errors.zipcode}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>Complemento</InputLabel>
                  <OutlinedInput
                    id='additionalInfo'
                    type='additionalInfo'
                    value={values.additionalInfo}
                    name='additionalInfo'
                    placeholder='Apartamento 15'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.additionalInfo && errors.additionalInfo)}
                  />
                  {touched.additionalInfo && errors.additionalInfo && (
                    <FormHelperText error id="helper-text-additionalInfo-signup">
                      {errors.additionalInfo}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 5 }}>
                <Typography variant='h5'>Credenciais de Login</Typography>
              </Grid>

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
                  Criar Conta
                </Button>

                {showSucessAlert &&
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CustomizedSnackbars
                      open={showSucessAlert}
                      message="Registro realizado com sucesso!"
                      severity="success"
                      onClose={() => setShowSucessAlert(false)}
                    />
                  </Box>
                }
                {showFailAlert &&
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CustomizedSnackbars
                      open={showFailAlert}
                      message=" Erro: Registro não concluido. Este e-mail já esta em uso em usuario ativo. Por favor utilize ou e-mail ou entre em contato com a adminstração"
                      severity="error"
                      onClose={() => setShowFailAlert(false)}
                    />
                  </Box>
                }
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default FormFields;