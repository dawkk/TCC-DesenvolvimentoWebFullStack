import { Box, Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import http from '../../../../../api/axios';
import IUserAddress from '../../../../../interfaces/IUserAddress';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import CustomizedSnackbars from '../../../../../components/Alerts/Snackbar';

const FormPutAddress = () => {
  const [showSucessAlert, setShowSucessAlert] = useState<boolean>(false);
  const [showFailAlert, setShowFailAlert] = useState<boolean>(false);
  const params = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState<IUserAddress>({
    street: '',
    number: 0,
    neighborhood: '',
    city: '',
    state: '',
    zipcode: 0,
    additionalInfo: '',
  });


  const yupValidationSchema = Yup.object().shape({
    street: Yup.string().max(255),
    number: Yup.number(),
    neighborhood: Yup.string().max(255),
    city: Yup.string().max(255),
    state: Yup.string().max(255),
    zipcode: Yup.number(),
    additionalInfo: Yup.string().max(255),
  });

  useEffect(() => {
    http.get(`/users/me/addresses/${params._id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        const updatingInitialValues: IUserAddress = response.data;
        setInitialValues(updatingInitialValues);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={yupValidationSchema}
        enableReinitialize={true}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            setSubmitting(false);

            const response = await http.put(`/users/me/addresses/${params._id}`, JSON.stringify(values), {
              headers: { 'Content-Type': 'application/json' },
            });
            response;
            setShowSucessAlert(true);
            setShowFailAlert(false);
            setTimeout(() => {
              navigate('/profile/address');
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
                  message="Endereço atualizado com sucesso! Redirecionando.."
                  severity="success"
                  onClose={() => setShowSucessAlert(false)}
                />
              </Box>
            }
            {showFailAlert &&
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CustomizedSnackbars
                  open={showFailAlert}
                  message="Erro: Endereço não foi atualizado."
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
                  Atualizar Informações
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default FormPutAddress;