import { Box } from "@mui/material";
import colorTheme from "../../../components/ColorThemes";
import Footer from "../../../components/Footer";
import NavBar from "../../../components/NavBar";
import ListMenus from "./ListMenus";

const StaffMenus = () => {

  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light, height: '100%', paddingTop: 20 }}>
      <NavBar />
      <ListMenus/>
      <Footer />
    </Box>
  )
}

export default StaffMenus;