import { Box, Paper, Typography } from "@mui/material";
import colorTheme from '../../../components/ColorThemes';
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import NavProfile from "../NavProfile";
import AddressData from "./AddressData";
import styles from './Address.module.scss'



const Address = () => {

  return (
    <Box>
      <NavBar />
      <Box sx={{ backgroundColor: colorTheme.palette.primary.light, height: '100%', minHeight:'100vh', paddingTop: 25 }}>
        <Box sx={{ ml: '20%', mr: '20%',pb:10}}>
          <Box sx={{ display: 'flex' }} className={styles.Container}>
            <NavProfile/>
            <Box sx={{ backgroundColor: 'white', borderRadius:2 }}>
              <Paper sx={{borderRadius:2}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 2 }}>
                  <Typography variant="h4" fontWeight='bold'>Endereços</Typography>
                </Box>
              </Paper>
              <AddressData/>
            </Box>
          </Box >
        </Box >
      </Box>
      <Footer />
    </Box>
  )
}

export default Address;