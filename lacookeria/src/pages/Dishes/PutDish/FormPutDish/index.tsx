import { Alert, Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import http from '../../../../api/axios';
import { useEffect, useState } from 'react';
import IMenu from '../../../../interfaces/IMenu';
import { useParams } from 'react-router-dom';
import IDish from '../../../../interfaces/IDish';

const FormPutDish = () => {
  const params = useParams();
  const [showSucessAlert, setShowSucessAlert] = useState<boolean>(false);
  const [showFailAlert, setShowFailAlert] = useState<boolean>(false);
  const [menus, setMenus] = useState<IMenu[]>([]);
  const [initialValues, setInitialValues] = useState<IDish>({
    _id: '',
    title: '',
    description: '',
    price: 0,
    menu: '',
    type: '',
  });

  useEffect(() => {
    http.get<IMenu[]>('/menus')
      .then(response => setMenus(response.data))
    console.log("aqui sao menus", menus)
    http.get(`/dishes/${params._id}`)
      .then(response => {
        const updatingInitialValues: IDish = response.data;
        setInitialValues(updatingInitialValues);
      })
      .catch(error => {
        console.log(error);
      })
    console.log(initialValues)
  }, [])

  const yupValidationSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Titulo Obrigatório'),
    description: Yup.string().max(255),
    price: Yup.number(),
    menu: Yup.string().required('Menu Obrigatório'),
    type: Yup.string().max(255),
  });

  const handleCloseAlert = () => {
    setShowSucessAlert(false);
    setShowFailAlert(false);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={yupValidationSchema}
        enableReinitialize={true}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          /* alert(JSON.stringify(values, null, 2)); */
          try {
            setStatus({ success: false });
            setSubmitting(false);

            const response = await http.put(`/dishes/${params._id}`, JSON.stringify(values), {
              headers: { 'Content-Type': 'application/json' },
              /* withCredentials:true }*/
            });
            console.log(response?.data);
            setShowSucessAlert(true);
            setShowFailAlert(false);
        
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
             <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '40%' }}>
               Prato atualizado com sucesso!
             </Alert>
           </Box>
            }
            {showFailAlert && 
             <Box sx={{ display: 'flex', justifyContent: 'center' }}>
             <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '40%' }}>
               Erro: Prato não foi atualizado.
             </Alert>
           </Box>
            }
            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 1 }}>
              <Typography variant='h2'>Atualizar Prato</Typography>
            </Grid>
            <Grid
              container spacing={2} sx={{
                display: 'flex', flexWrap: 'wrap', pl: 2, pt: 4, boxSizing: 'border-box',
                '& .MuiTextField-root': { mb: 1 },
              }}>

              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <InputLabel>Nome do Prato*</InputLabel>
                  <OutlinedInput
                    id='title'
                    type='title'
                    value={values.title}
                    name='title'
                    placeholder='Strogonoff'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.title && errors.title)}
                  />
                  {touched.title && errors.title && (
                    <FormHelperText error id="helper-text-title">
                      {errors.title}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <InputLabel>Preço*</InputLabel>
                  <OutlinedInput
                    id='price'
                    type='price'
                    value={values.price}
                    name='price'
                    placeholder='Celular'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.price && errors.price)}
                  />
                  {touched.price && errors.price && (
                    <FormHelperText error id="helper-text-price">
                      {errors.price}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <InputLabel>Tipo</InputLabel>
                  <OutlinedInput
                    id='type'
                    type='type'
                    value={values.type}
                    name='type'
                    placeholder='Bovinos'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.type && errors.type)}
                  />
                  {touched.type && errors.type && (
                    <FormHelperText error id="helper-text-type">
                      {errors.type}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel>Descrição</InputLabel>
                  <OutlinedInput
                    id='description'
                    type='description'
                    value={values.description}
                    name='description'
                    placeholder='Carne e cogumelos com molho'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.description && errors.description)}
                  />
                  {touched.description && errors.description && (
                    <FormHelperText error id="helper-text-description">
                      {errors.description}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={4} sx={{ mt: 2 }}>
                <Stack spacing={1}>
                  <FormControl fullWidth>
                    <InputLabel id="menu-select-label">Menu</InputLabel>
                    <Select
                      labelId="menu-select-label"
                      id="menu"
                      type="menu"
                      name="menu"
                      value={values.menu}
                      label="menu"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.menu && errors.menu)}
                    >
                      {menus.map((menu) => (
                        <MenuItem key={menu._id} value={menu._id}>{menu.name}</MenuItem>
                      ))}
                    </Select>
                    {touched.menu && errors.menu && (
                      <FormHelperText error id="helper-text-menu-signup">
                        {errors.menu}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Stack>
              </Grid>


              <Grid item xs={4}>

              </Grid>

              <Grid item xs={4} sx={{ mt: 8 }}>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ boxSizing: 'border-box', padding: 2 }}
                >
                  Atualizar Prato
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default FormPutDish;