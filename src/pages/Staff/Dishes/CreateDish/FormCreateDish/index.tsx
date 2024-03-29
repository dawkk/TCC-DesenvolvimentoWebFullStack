import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Box, Button, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import http from '../../../../../api/axios';
import CustomizedSnackbars from '../../../../../components/Alerts/Snackbar';
import colorTheme from '../../../../../components/ColorThemes';
import IMenu from '../../../../../interfaces/IMenu';



const FormCreateDish = () => {
  const [showSucessAlert, setShowSucessAlert] = useState<boolean>(false);
  const [showFailAlert, setShowFailAlert] = useState<boolean>(false);

  const [menus, setMenus] = useState<IMenu[]>([])
  const navigate = useNavigate();
  useEffect(() => {
    http.get<IMenu[]>('/menus')
      .then(response => setMenus(response.data))
  }, [])

  const yupValidationSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Titulo Obrigatório'),
    description: Yup.string().max(255),
    price: Yup.number(),
    menu: Yup.string().required('Menu Obrigatório'),
    type: Yup.string().max(255),
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  const uploadDishImage = async (file: File, dishId: string) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await http.post(`/dishes/${dishId}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('uploadMenuImage error', error);
      return null;
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setPreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <>
      <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 1 }}>
        <Typography variant='h2'>Criar Novo Prato</Typography>
      </Grid>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ mt: 4, mr: 2 }}>
          <form encType="multipart/form-data">
            <Box sx={{ display: 'flex', flexDirection: 'column', width: 250 }}>

              <IconButton component="label" sx={{
                borderRadius: 1, color: colorTheme.palette.primary.contrastText, backgroundColor: colorTheme.palette.primary.main, "&:hover": {
                  backgroundColor: colorTheme.palette.secondary.dark
                }
              }} data-testid={`button-image-upload`}>
                <PhotoCameraIcon />
                <input
                  
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  hidden
                />
              </IconButton>

              {preview ? (
                <img src={preview} alt="Imagem" width="250" height="270" loading="lazy" data-testid={`image-uploaded-preview`} />
              ) : (
                <Typography variant="body1">Sem Imagem</Typography>
              )}
            </Box>
          </form>
        </Box>

        <Formik
          initialValues={{
            title: '',
            description: '',
            price: '',
            menu: '',
            submit: null
          }}
          validationSchema={yupValidationSchema}
          onSubmit={async (values, { setStatus, setSubmitting }) => {
            try {
              setStatus({ success: false });
              setSubmitting(false);
              const response = await http.post("/dishes", JSON.stringify(values), {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              const { _id } = response.data;
              if (file) {
                await uploadDishImage(file, _id);
                setFile(null);
              }

              setShowSucessAlert(true);
              setShowFailAlert(false);
              setTimeout(() => {
                navigate('/staff/dishes');
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
                    message="Prato criado com sucesso!"
                    severity="success"
                    onClose={() => setShowSucessAlert(false)}
                  />
                </Box>
              }
              {showFailAlert &&
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CustomizedSnackbars
                    open={showFailAlert}
                    message="Erro: Falha durante a criação de prato."
                    severity="error"
                    onClose={() => setShowFailAlert(false)}
                  />
                </Box>
              }
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
                      placeholder='R$'
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
                        data-testid={`button-select-menus`}
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
                        {menus.map((menu, index) => (
                          <MenuItem key={menu._id} value={menu._id} data-testid={`menu-created-${index}`}>{menu.name}</MenuItem>
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
                    data-testid={`button-create-dish`}
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ boxSizing: 'border-box', padding: 2 }}
                  >
                    Criar Prato
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  )
}

export default FormCreateDish;