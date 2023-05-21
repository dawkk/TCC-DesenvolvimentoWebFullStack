import { Box, Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import http from '../../../../../api/axios';
import CustomizedSnackbars from '../../../../../components/Alerts/Snackbar';
import IUser from '../../../../../interfaces/IUser';
import IUserProfileData from '../../../../../interfaces/IUserProfileData';

const celRegex = /([0-9]{2,3})?(\([0-9]{2}\))([0-9]{4,5})([0-9]{4})/;

const FormProfileInfo = () => {
  const [showSucessAlert, setShowSucessAlert] = useState<boolean>(false);
  const [showFailAlert, setShowFailAlert] = useState<boolean>(false);

  const navigate = useNavigate();


  const [initialValues, setInitialValues] = useState<IUserProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    cellphone: '',
  });


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await http.get<IUser>(`/users/me`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            const updatingInitialValues: IUserProfileData = response.data;
            setInitialValues(updatingInitialValues);
          })
          .catch(error => {
            console.log(error);
          })
      } catch (error: unknown) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);


  const yupValidationSchema = Yup.object().shape({
    firstName: Yup.string().max(255).required('Nome Obrigatório'),
    lastName: Yup.string().max(255).required('Sobrenome Obrigatório'),
    cellphone: Yup.string().matches(celRegex, 'Este numero não é valido, o formato deveria ser (XX)XXXXXXXXX'),
    email: Yup.string().email('Must be a valid email').max(255).required('Email Obrigatório'),
  });


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
            const response = await http.put(`/users/me`, JSON.stringify(values), {
              headers: {
                'Content-Type': 'application/json'
              },
            });
            response;
            setShowSucessAlert(true);
            setShowFailAlert(false);
            setTimeout(() => {
              navigate('/profile/overview');
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
                  message="Informações atualizadas com sucesso!"
                  severity="success"
                  onClose={() => setShowSucessAlert(false)}
                />
              </Box>
            }
            {showFailAlert &&
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CustomizedSnackbars
                  open={showFailAlert}
                  message=" Erro: informações não foram atualizadas."
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
                  <InputLabel sx={{ fontWeight: 'bold' }}>Nome</InputLabel>
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

              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel sx={{ fontWeight: 'bold' }}>Ultimo Sobrenome</InputLabel>
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

              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel sx={{ fontWeight: 'bold' }}>Celular</InputLabel>
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

export default FormProfileInfo;