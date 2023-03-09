import { Box } from "@mui/material";
import colorTheme from "../../../components/ColorThemes";
import Footer from "../../../components/Footer";
import NavBar from "../../../components/NavBar";
import FormPutDish from "./FormPutDish";

const PutDish = () => {

  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light, height: '100%', paddingTop: 20 }}>
      <NavBar />
      <FormPutDish/>
      <Footer />
    </Box>
  )
}

export default PutDish;