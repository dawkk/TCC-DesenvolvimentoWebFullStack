import { Box } from '@mui/system';
import colorTheme from '../../components/ColorThemes';
import Footer from '../../components/Footer';
import ListMenus from './ListMenus';
import NavBar from '../../components/NavBar';
import BannerMenu from './Banner';
import styles from './Banner/Banner.module.scss'

const Menus = () => {
  return (
    <Box className={styles.PageMenus}>
      <NavBar/>
      <BannerMenu/>
      <ListMenus/>
      
      <Footer/>
    </Box>
  )
}

export default Menus;