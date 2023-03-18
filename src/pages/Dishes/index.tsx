import { Box } from "@mui/material";
import colorTheme from "../../components/ColorThemes";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import ListDishes from "./ListDishes";

const Dishes = () => {

  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light, height: '100%', paddingTop: 20 }}>
      <NavBar />
      <ListDishes/>
      <Footer />
    </Box>
  )
}

export default Dishes;