import { Box } from "@mui/material";
import colorTheme from "../../components/ColorThemes";
import Footer from "../../components/Footer";
import FormDish from "../../components/FormDish";
import NavBar from "../../components/NavBar";


const CreateDish = () => {

  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light, height: '100%', paddingTop: 20 }}>
      <NavBar />
      <Box sx={{p: 20}}>
        <Box sx={{ backgroundColor: colorTheme.palette.secondary.light, boxSizing: 'border-box', p:8, borderRadius:5 ,width: '80vw' }}>
          <FormDish />
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default CreateDish;