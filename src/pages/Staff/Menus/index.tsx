import { Box } from "@mui/material";
import colorTheme from "../../../components/ColorThemes";
import Footer from "../../../components/Footer";
import NavBar from "../../../components/NavBar";
import ListMenus from "./ListMenus";

const StaffMenus = () => {

  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light}}>
      <NavBar />
      <Box sx={{backgroundColor: colorTheme.palette.primary.light, height: '100%', minHeight: '100vh', paddingTop: 20, paddingBottom:20 }}>
        <ListMenus />
      </Box>
      <Footer />
    </Box>
  )
}

export default StaffMenus;