import { Box } from "@mui/material";
import colorTheme from "../../../../components/ColorThemes";
import Footer from "../../../../components/Footer";
import NavBar from "../../../../components/NavBar";
import FormCreateMenu from "./FormCreateMenu";



const CreateMenu = () => {

  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light, paddingTop: 5 }}>
      <NavBar />
      <Box sx={{p: 20}}>
        <Box sx={{ backgroundColor: colorTheme.palette.secondary.light, boxSizing: 'border-box', p:8, borderRadius:5 ,width: '80vw' }}>
          <FormCreateMenu/>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default CreateMenu;