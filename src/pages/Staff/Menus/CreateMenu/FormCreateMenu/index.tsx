import { Alert, Box, Button, FormHelperText, Grid, IconButton, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import http from '../../../../../api/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import colorTheme from '../../../../../components/ColorThemes';


const FormCreateMenu = () => {
  const [showSucessAlert, setShowSucessAlert] = useState<boolean>(false);
  const [showFailAlert, setShowFailAlert] = useState<boolean>(false);

  const handleCloseAlert = () => {
    setShowSucessAlert(false);
    setShowFailAlert(false);
  };

  const navigate = useNavigate();

  const yupValidationSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Titulo Obrigatório'),
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');


  const uploadMenuImage = async (file:File, menuId:string) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await http.post(`/menus/${menuId}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('uploadMenuImage response data' ,response.data);
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
          <form  encType="multipart/form-data">
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
              navigate('/staff/menus');
              
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
              setSubmitting(false);
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

                <Grid item xs={4} md={12} sx={{ mt: 23 }}>
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