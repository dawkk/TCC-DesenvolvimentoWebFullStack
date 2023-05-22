import { Box } from '@mui/system';
import Footer from '../../components/Footer';
import ListMenus from './ListMenus';
import NavBar from '../../components/NavBar';
import BannerMenu from './Banner';
import styles from './Menus.module.scss'
import colorTheme from '../../components/ColorThemes';

const Menus = () => {
  return (
    <Box className={styles.PageMenus}>
      <NavBar />
      <Box sx={{ backgroundColor: colorTheme.palette.primary.light, height: '100%',minHeight:'100vh', pb:20 }}>
        <BannerMenu />
        <ListMenus />
      </Box>
      <Footer />
    </Box>
  )
}

export default Menus;