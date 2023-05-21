import { Box, Paper, Typography } from "@mui/material";
import colorTheme from '../../../components/ColorThemes';
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import NavProfile from "../NavProfile";
import ProfileInfo from "./ProfileInfo";
import styles from './Overview.module.scss'


const Overview = () => {

  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light}}>
      <NavBar />
      <Box sx={{height:'100%', minHeight: '100vh', paddingTop: 15, paddingBottom:8 }}>
        <Box sx={{ ml: '20%', mr: '20%'}}>
          <Box className={styles.ContainerNavProfile}>
            <NavProfile/>
            <Box sx={{ backgroundColor: 'white', borderRadius:2 }}>
              <Paper sx={{borderRadius:2}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 2 }}>
                  <Typography variant="h4" fontWeight='bold' sx={{color:'#d25229'}}>Visão Geral da Conta</Typography>
                </Box>
              </Paper>
              <ProfileInfo/>
            </Box>
          </Box >
        </Box >
      </Box>
      <Footer />
    </Box>
  )
}

export default Overview;