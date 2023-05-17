import { Box } from "@mui/material";
import Footer from "../../../../components/Footer";
import NavBar from "../../../../components/NavBar";
import colorTheme from '../../../../components/ColorThemes';
import NavProfile from "../../NavProfile";
import styles from './OrderDetailsPage.module.scss'
import OrdersDetails from "./OrderDetails";


const OrderDetailsPage = () => {

  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light, height: '100%' }}>
      <NavBar />
      <Box sx={{ pl:'20%', pr:'20%', pt:'140px', pb:'5%', boxSizing:'border-box', backgroundColor: colorTheme.palette.primary.light, minHeight: '89vh'}}>
        <Box className={styles.ContainerNavProfile}>
          <NavProfile />

          <OrdersDetails />

        </Box >
      </Box >
      <Footer />
    </Box>
  )
}

export default OrderDetailsPage;