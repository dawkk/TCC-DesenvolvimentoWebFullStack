import { Box, Button, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import http from '../../../../../api/axios';
import { useEffect, useState } from 'react';
import IMenu from '../../../../../interfaces/IMenu';
import { useNavigate, useParams } from 'react-router-dom';
import IDish from '../../../../../interfaces/IDish';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import colorTheme from '../../../../../components/ColorThemes';
import CustomizedSnackbars from '../../../../../components/Alerts/Snackbar';

const FormPutDish = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [showSucessAlert, setShowSucessAlert] = useState<boolean>(false);
  const [showFailAlert, setShowFailAlert] = useState<boolean>(false);
  const [menus, setMenus] = useState<IMenu[]>([]);
  const [initialValues, setInitialValues] = useState<IDish>({
    _id: '',
    title: '',
    description: '',
    price: 0,
    menu: {
      _id: '',
      name: '',
    },
  });



  useEffect(() => {
    http.get<IMenu[]>('/menus')
      .then(response => setMenus(response.data))
      .catch(error => {
        console.log(error);
      });

    http.get(`/dishes/${params._id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    },)
      .then(response => {
        const updatingInitialValues: IDish = response.data;
        setInitialValues(updatingInitialValues);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const yupValidationSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Titulo Obrigatório'),
    description: Yup.string().max(255),
    price: Yup.number(),
    menu: Yup.object().shape({
      _id: Yup.string().required('Menu Obrigatório'),
      name: Yup.string(),
    }),
  });

  /* IMAGE HANDLING */

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');


  useEffect(() => {
    const getImage = async () => {
      try {
        const response = await http.get(`/dishes/${params._id}/image`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Cache-Control': 'no-cache',
          },
          responseType: 'blob',
        });
        if (response.data) {
          const imageURL = URL.createObjectURL(response.data);
          setPreview(imageURL);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getImage();
  }, [params._id]);

  const updateDishInfo = () => {
    http.get(`/dishes/${params._id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        const updatingInitialValues: IDish = response.data;
        setInitialValues(updatingInitialValues);
      })
      .catch(error => {
        console.log(error);
      });
  };


  const uploadDishImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await http.post(`/dishes/${params._id}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      updateDishInfo();
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setPreview(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      await uploadDishImage(file);
      setFile(null);
    }
  };


  return (
    <>
      <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 1 }}>
        <Typography variant='h2'>Atualizar Prato</Typography>
      </Grid>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ mt: 4, mr: 2 }}>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                <img src={preview} alt="Imagem" width="250" height="270" loading="lazy" />
              ) : (
                <Typography variant="body1">Sem Imagem</Typography>
              )}
              <Button type="submit" variant="contained" color="primary" data-testid={`save-image-button`}>
                Salvar Imagem
              </Button>
            </Box>
          </form>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={yupValidationSchema}
          enableReinitialize={true}
          onSubmit={async (values, { setStatus, setSubmitting }) => {

            try {
              setStatus({ success: false });
              setSubmitting(false);
              await http.put(`/dishes/${params._id}`, JSON.stringify(values), {
                headers: {
                  'Content-Type': 'application/json'
                },
              });
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
                    message="Prato atualizado com sucesso!"
                    severity="success"
                    onClose={() => setShowSucessAlert(false)}
                  />
                </Box>
              }
              {showFailAlert &&
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CustomizedSnackbars
                    open={showFailAlert}
                    message="Erro: Prato não foi atualizado."
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
                      placeholder='preço'
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
                      multiline
                      rows={4}
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
                        id="menu._id"
                        type="menu"
                        name="menu._id"
                        value={values.menu?._id || ''}
                        label="Menu*"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.menu && errors.menu)}
                        disabled={isSubmitting}
                      >
                        {menus.map((menu, index) => (
                          <MenuItem key={menu._id} value={menu._id} data-testid={`menu-created-${index}`}>{menu.name}</MenuItem>
                        ))}
                      </Select>
                      {touched.menu && errors.menu && (
                        <FormHelperText error id="helper-text-menu-signup">
                          {errors.menu.name}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4} sx={{ mt: 1.5 }}>
                  <Button
                    data-testid={`button-edit-dish`}
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
      </Box>
    </>
  )
}

export default FormPutDish;