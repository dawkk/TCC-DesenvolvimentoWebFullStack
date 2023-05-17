import { Box } from "@mui/material";
import colorTheme from "../../../components/ColorThemes";
import Footer from "../../../components/Footer";
import NavBar from "../../../components/NavBar";
import Dashboard from "./Dashboard";


const DashboardPage = () => {

  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light, height: '100%' }}>
      <NavBar />
      <Box sx={{ pt: '140px', pb: '5%', boxSizing: 'border-box', backgroundColor: colorTheme.palette.primary.light, minHeight: '89vh' }}>
        <Box>

          <Dashboard />
        </Box >
      </Box >
      <Footer />
    </Box>
  )
}

export default DashboardPage;