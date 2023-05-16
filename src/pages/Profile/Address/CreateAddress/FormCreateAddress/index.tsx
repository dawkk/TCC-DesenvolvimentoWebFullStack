import { Box, Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import http from '../../../../../api/axios';
import { useNavigate } from 'react-router-dom';
import CustomizedSnackbars from '../../../../../components/Alerts/Snackbar';
import { useState } from 'react';

const FormCreateAddress = () => {
  const [showSucessAlert, setShowSucessAlert] = useState<boolean>(false);
  const [showFailAlert, setShowFailAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  const yupValidationSchema = Yup.object().shape({
    street: Yup.string().max(255),
    number: Yup.number(),
    neighborhood: Yup.string().max(255),
    city: Yup.string().max(255),
    state: Yup.string().max(255),
    zipcode: Yup.number(),
    additionalInfo: Yup.string().max(255),
  });

  return (
    <>
      <Formik
        initialValues={{
          street: '',
          number: '',
          neighborhood: '',
          city: '',
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

            const response = await http.post("/users/me/addresses", JSON.stringify(values), {
              headers: { 'Content-Type': 'application/json' },
            });
            response;
            console.log('this is response from create address', response.data)
            setShowSucessAlert(true);
            setShowFailAlert(false);

            const currentUrl = window.location.pathname;
            localStorage.setItem('lastVisitedUrl', currentUrl);

            setTimeout(() => {
        
              if (currentUrl === '/profile/address/create') {
                navigate('/profile/address');
              } else {
                window.location.reload();
              } 
            }, 3000);
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

            {showSucessAlert &&
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CustomizedSnackbars
                  open={showSucessAlert}
                  message="Endereço criado com sucesso! Redirecionando para endereços.."
                  severity="success"
                  onClose={() => setShowSucessAlert(false)}
                />
              </Box>
            }
            {showFailAlert &&
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CustomizedSnackbars
                  open={showFailAlert}
                  message="Erro: Endereço não foi criado."
                  severity="error"
                  onClose={() => setShowFailAlert(false)}
                />
              </Box>
            }

            <Grid
              container spacing={2} sx={{
                display: 'flex', flexWrap: 'wrap', p: 4, boxSizing: 'border-box',
                '& .MuiTextField-root': { mb: 1 },
              }}>

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
                  Criar Endereço
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default FormCreateAddress;