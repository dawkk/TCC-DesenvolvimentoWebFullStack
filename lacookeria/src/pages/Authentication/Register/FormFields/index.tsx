import { Box, Button, Checkbox, Divider, FormControlLabel, Grid, InputLabel, Link, OutlinedInput, Paper, Stack, Typography } from '@mui/material';

const FormFields = () => {
  return (
    <>
      <Grid
        component="form" container spacing={2} sx={{
          display: 'flex', flexWrap: 'wrap', pl: 2, pt: 4, boxSizing: 'border-box',
          '& .MuiTextField-root': { mb: 1 },
        }}>

        <Grid item xs={6} md={6}>
          <Stack spacing={1}>
            <InputLabel>Nome*</InputLabel>
            <OutlinedInput
              id="outlined-required"
              defaultValue="John"
            />
          </Stack>
        </Grid>

        <Grid item xs={6} md={6}>
          <Stack spacing={1}>
            <InputLabel>Sobrenome*</InputLabel>
            <OutlinedInput
              id="outlined-required"
              defaultValue="Doe"
            />
          </Stack>
        </Grid>

        <Grid item xs={6} md={6}>
          <Stack spacing={1}>
            <InputLabel>Data de Nascimento</InputLabel>
            <OutlinedInput
              id="outlined-required"
              defaultValue="15/04/1995"
            />
          </Stack>
        </Grid>

        <Grid item xs={6} md={6}>
          <Stack spacing={1}>
            <InputLabel>Celular</InputLabel>
            <OutlinedInput
              id="outlined-required"
              defaultValue="(19)XXXXXXXX"
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={12}>
          <Stack spacing={1}>
            <InputLabel>CPF</InputLabel>
            <OutlinedInput

              id="outlined-required"
              defaultValue="XXX.XXX.XXX-XX"
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center',mt:2,mb:1 }}>
          <Typography variant='h5'>Endereço</Typography>
        </Grid>

        <Grid item xs={12} md={12}>
          <Stack spacing={1}>
            <InputLabel>Rua</InputLabel>
            <OutlinedInput
              id="outlined-required"
              defaultValue="Rua Avenida Alameda"
            />
          </Stack>
        </Grid>
        <Grid item xs={6} md={6}>
          <Stack spacing={1}>
            <InputLabel>Numero</InputLabel>
            <OutlinedInput
              id="outlined-required"
              defaultValue="15890"
            />
          </Stack>
        </Grid>
        <Grid item xs={6} md={6}>
          <Stack spacing={1}>
            <InputLabel>CEP</InputLabel>
            <OutlinedInput
              id="outlined-required"
              defaultValue="email@email.com"
            />
          </Stack>
        </Grid>
        <Grid item xs={6} md={6}>
          <Stack spacing={1}>
            <InputLabel>Bairro</InputLabel>
            <OutlinedInput
              id="outlined-required"
              defaultValue="email@email.com"
            />
          </Stack>
        </Grid>
        <Grid item xs={6} md={6}>
          <Stack spacing={1}>
            <InputLabel>Complemento</InputLabel>
            <OutlinedInput
              id="outlined-required"
              defaultValue="email@email.com"
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={12} sx={{display:'flex', justifyContent:'center',mt:5,mb:5}}>
          <Typography variant='h5'>Credenciais de Login</Typography>
        </Grid>

        <Grid item xs={12} md={12}>
          <Stack spacing={1}>
            <InputLabel>E-mail</InputLabel>
            <OutlinedInput
              id="outlined-required"
              defaultValue="email@email.com"
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={12}>
          <Stack spacing={1}>
            <InputLabel>Senha</InputLabel>
            <OutlinedInput
              id="outlined-password-input"
              label="Senha"
              type="password"
              autoComplete="current-password"
            />
          </Stack>
        </Grid>


      </Grid>
    </>
  )
}

export default FormFields;