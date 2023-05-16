import { Box, Paper, Typography } from "@mui/material";
import colorTheme from '../../../../components/ColorThemes';
import NavBar from "../../../../components/NavBar";
import Footer from "../../../../components/Footer";
import NavProfile from "../../NavProfile";
import styles from './CreateAddess.module.scss'
import FormCreateAddress from "./FormCreateAddress";



const CreateAddress = () => {

  return (
    <Box>
      <NavBar />
      <Box sx={{ backgroundColor: colorTheme.palette.primary.light, height: '100%', paddingTop: 25 }}>
        <Box sx={{ ml: '20%', mr: '20%',pb:10}}>
          <Box className={styles.ContainerNavProfile}>
            <NavProfile/>
            <Box sx={{ backgroundColor: 'white', borderRadius:2 }}>
              <Paper sx={{borderRadius:2}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 2 }}>
                  <Typography variant="h4" fontWeight='bold'>Endereço</Typography>
                </Box>
              </Paper>
              <FormCreateAddress/>
            </Box>
          </Box >
        </Box >
      </Box>
      <Footer />
    </Box>
  )
}

export default CreateAddress;