import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useEffect, useState } from 'react';
import http from '../../../../api/axios';

const celRegex = /([0-9]{2,3})?(\([0-9]{2}\))([0-9]{4,5})([0-9]{4})/;

const AddressData = () => {

  interface User {
    id: number;
    name: string;
    email: string;
  }

  
  const [userId, setUserId] = useState<number>(0);


  const getUserIdFromLocalStorage = (): number => {
    const userIdString = localStorage.getItem('id');
    if (userIdString) {
      return parseInt(userIdString, 10);
    }
    return 0;
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
         await http.get<User>(`/users/${userId}`);
    
      } catch (error: unknown) {
         console.log(error);
      }
    };
  
    const userIdFromLocalStorage = getUserIdFromLocalStorage();
    if (userIdFromLocalStorage) {
      setUserId(userIdFromLocalStorage);
      fetchUserData();
    } 
  }, []);

  const yupValidationSchema = Yup.object().shape({
    firstName: Yup.string().max(255).required('Nome Obrigatório'),
    lastName: Yup.string().max(255).required('Sobrenome Obrigatório'),
    cellphone: Yup.string().matches(celRegex, 'Este numero não é valido, o formato deveria ser (XX)XXXXXXXXX').required('Celular Obrigatório'),
    email: Yup.string().email('Must be a valid email').max(255).required('Email Obrigatório'),
    addressStreet: Yup.string().max(255),
    addressNumber: Yup.number(),
    addressNeighborhood: Yup.string().max(255),
    addressCity: Yup.string().max(255),
    addressState: Yup.string().max(255),
    addressZipcode: Yup.number(),
    addressExtra: Yup.string().max(255),
  });



  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          cellphone: '',
          email: '',
          addressStreet: '',
          addressNumber: '',
          addressNeighborhood: '',
          addressCity: '',
          addressState: '',
          addressZipcode: '',
          addressExtra: '',
          submit: null
        }}
        validationSchema={yupValidationSchema}
        onSubmit={async (values, {setStatus, setSubmitting }) => {
          alert(JSON.stringify(values, null, 2));
          try {
            setStatus({ success: false });
            setSubmitting(false);

            const response = await http.post("/users", JSON.stringify(values), {
              headers: { 'Content-Type': 'application/json' },
            });
            response;
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setSubmitting(false);
          }
        }}

      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (

          <Form noValidate onSubmit={handleSubmit}>
            <Grid
              container spacing={2} sx={{
                display: 'flex', flexWrap: 'wrap', p: 4, boxSizing: 'border-box',
                '& .MuiTextField-root': { mb: 1 },
              }}>

              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel>Rua</InputLabel>
                  <OutlinedInput
                    id='addressStreet'
                    type='addressStreet'
                    value={values.addressStreet}
                    name='addressStreet'
                    placeholder='Rua Alameda Avenida'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.addressStreet && errors.addressStreet)}
                  />
                  {touched.addressStreet && errors.addressStreet && (
                    <FormHelperText error id="helper-text-addressStreet-signup">
                      {errors.addressStreet}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>Numero</InputLabel>
                  <OutlinedInput
                    id='addressNumber'
                    type='addressNumber'
                    value={values.addressNumber}
                    name='addressNumber'
                    placeholder='523'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.addressNumber && errors.addressNumber)}
                  />
                  {touched.addressNumber && errors.addressNumber && (
                    <FormHelperText error id="helper-text-addressNumber-signup">
                      {errors.addressNumber}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>Bairro</InputLabel>
                  <OutlinedInput
                    id='addressNeighborhood'
                    type='addressNeighborhood'
                    value={values.addressNeighborhood}
                    name='addressNeighborhood'
                    placeholder='Centro'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.addressNeighborhood && errors.addressNeighborhood)}
                  />
                  {touched.addressNeighborhood && errors.addressNeighborhood && (
                    <FormHelperText error id="helper-text-addressNeighborhood-signup">
                      {errors.addressNeighborhood}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>Cidade</InputLabel>
                  <OutlinedInput
                    id='addressCity'
                    type='addressCity'
                    value={values.addressCity}
                    name='addressCity'
                    placeholder='Campinas'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.addressCity && errors.addressCity)}
                  />
                  {touched.addressCity && errors.addressCity && (
                    <FormHelperText error id="helper-text-addressCity-signup">
                      {errors.addressCity}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>Estado</InputLabel>
                  <OutlinedInput
                    id='addressState'
                    type='addressState'
                    value={values.addressState}
                    name='addressState'
                    placeholder='São Paulo'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.addressState && errors.addressState)}
                  />
                  {touched.addressState && errors.addressState && (
                    <FormHelperText error id="helper-text-addressState-signup">
                      {errors.addressState}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>CEP</InputLabel>
                  <OutlinedInput
                    id='addressZipcode'
                    type='addressZipcode'
                    value={values.addressZipcode}
                    name='addressZipcode'
                    placeholder='13820-000'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.addressZipcode && errors.addressZipcode)}
                  />
                  {touched.addressZipcode && errors.addressZipcode && (
                    <FormHelperText error id="helper-text-addressZipcode-signup">
                      {errors.addressZipcode}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>Complemento</InputLabel>
                  <OutlinedInput
                    id='addressExtra'
                    type='addressExtra'
                    value={values.addressExtra}
                    name='addressExtra'
                    placeholder='Apartamento 15'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.addressExtra && errors.addressExtra)}
                  />
                  {touched.addressExtra && errors.addressExtra && (
                    <FormHelperText error id="helper-text-addressExtra-signup">
                      {errors.addressExtra}
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

export default AddressData;