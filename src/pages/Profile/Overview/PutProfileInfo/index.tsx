import { Box, Paper, Typography } from "@mui/material";
import Footer from "../../../../components/Footer";
import NavBar from "../../../../components/NavBar";
import colorTheme from '../../../../components/ColorThemes';
import NavProfile from "../../NavProfile";
import FormProfileInfo from "./FormProfileInfo";
import styles from './PutProfileInfo.module.scss'



const PutProfileInfo = () => {

  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light, height: '100%', paddingTop: 25 }}>
      <NavBar />
      <Box sx={{ backgroundColor: colorTheme.palette.primary.light}}>
        <Box sx={{ ml: '20%', mr: '20%', mb: 20 }}>
          <Box className={styles.ContainerNavProfile}>
            <NavProfile/>
            <Box sx={{ backgroundColor: 'white' }}>
              <Paper>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 2 }}>
                  <Typography variant="h4">Editar Perfil</Typography>
                </Box>
              </Paper>
              <FormProfileInfo/>
            </Box>
          </Box >
        </Box >
      </Box>
      <Footer />
    </Box>
  )
}

export default PutProfileInfo;