import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Box, Button, FormHelperText, Grid, IconButton, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import http from '../../../../../api/axios';
import CustomizedSnackbars from '../../../../../components/Alerts/Snackbar';
import colorTheme from '../../../../../components/ColorThemes';


const FormCreateMenu = () => {
  const [showSucessAlert, setShowSucessAlert] = useState<boolean>(false);
  const [showFailAlert, setShowFailAlert] = useState<boolean>(false);

  const navigate = useNavigate();

  const yupValidationSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Titulo Obrigatório'),
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');


  const uploadMenuImage = async (file: File, menuId: string) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await http.post(`/menus/${menuId}/image`, formData, {
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
        <Typography variant='h2'>Criar Novo Menu</Typography>
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
                <img src={preview} alt="Imagem" width="250" height="270" loading="lazy" data-testid={`image-uploaded-preview`}/>
              ) : (
                <Typography variant="body1">Sem Imagem</Typography>
              )}
            </Box>
          </form>
        </Box>


        <Formik
          initialValues={{
            name: '',
            submit: null
          }}
          validationSchema={yupValidationSchema}
          onSubmit={async (values, { setStatus, setSubmitting }) => {
            try {
              setStatus({ success: false });
              setSubmitting(false);
              const response = await http.post("/menus", JSON.stringify({ name: values.name }), {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              const { _id } = response.data;
              if (file) {
                await uploadMenuImage(file, _id);
                setFile(null);
              }
              setShowSucessAlert(true);
              setShowFailAlert(false);
              setTimeout(() => {
                navigate('/staff/menus');
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
                    message="Menu criado com sucesso!"
                    severity="success"
                    onClose={() => setShowSucessAlert(false)}
                  />
                </Box>
              }
              {showFailAlert &&
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CustomizedSnackbars
                    open={showFailAlert}
                    message="Erro: Falha durante a criação de menu, por favor escolha outro nome."
                    severity="error"
                    onClose={() => setShowFailAlert(false)}
                  />
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

                <Grid item xs={4} md={12} sx={{ mt: 23 }}>
                  <Button
                    data-testid={`button-create-menu`}
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ boxSizing: 'border-box', padding: 2 }}
                  >
                    Criar Menu
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

export default FormCreateMenu;