import { Alert, Box, Button, FormHelperText, Grid, IconButton, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import http from '../../../../../api/axios';
import { useEffect, useState } from 'react';
import IMenu from '../../../../../interfaces/IMenu';
import { useNavigate, useParams } from 'react-router-dom';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import colorTheme from '../../../../../components/ColorThemes';

const FormPutMenu = () => {
  const params = useParams();
  const [showSucessAlert, setShowSucessAlert] = useState<boolean>(false);
  const [showFailAlert, setShowFailAlert] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<IMenu>({
    _id:'',
    name: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    http.get(`/menus/${params._id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    },)
      .then(response => {
        const updatingInitialValues: IMenu = response.data;
        setInitialValues(updatingInitialValues);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const yupValidationSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Titulo Obrigatório'),
  });

  const handleCloseAlert = () => {
    setShowSucessAlert(false);
    setShowFailAlert(false);
  };

  /* IMAGE HANDLING */

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');


  useEffect(() => {
    const getImage = async () => {
      try {
        const response = await http.get(`/menus/${params._id}/image`, {
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

  const updateMenuInfo = () => {
    http.get(`/menus/${params._id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        const updatingInitialValues: IMenu = response.data;
        setInitialValues(updatingInitialValues);
      })
      .catch(error => {
        console.log(error);
      });
  };


  const uploadMenuImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await http.post(`/menus/${params._id}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      updateMenuInfo();
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
      await uploadMenuImage(file);
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
              }}>
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
              <Button type="submit" variant="contained" color="primary">
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
              console.log('Values from formik', values)
              const response = await http.put(`/menus/${params._id}`, JSON.stringify(values), {
                headers: {
                  'Content-Type': 'application/json'
                },
              });
              console.log("this is response", response?.data);
              navigate('/staff/menus');
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
                    Menu atualizado com sucesso!
                  </Alert>
                </Box>
              }
              {showFailAlert &&
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '40%' }}>
                    Erro: Menu não foi atualizado.
                  </Alert>
                </Box>
              }

              <Grid
                container spacing={2} sx={{
                  display: 'flex', flexWrap: 'wrap', pl: 8, pt: 4, boxSizing: 'border-box',
                  '& .MuiTextField-root': { mb: 1 },
                }}>

                <Grid item xs={12} md={12}>
                  <Stack spacing={1}>
                    <InputLabel>Nome do Menu*</InputLabel>
                    <OutlinedInput
                      id='name'
                      type='name'
                      value={values.name}
                      name='name'
                      placeholder='Drinks'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.name && errors.name)}
                    />
                    {touched.name && errors.name && (
                      <FormHelperText error id="helper-text-name">
                        {errors.name}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4} md={12} sx={{ mt: 21 }}>
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
                    Atualizar Menu
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

export default FormPutMenu;