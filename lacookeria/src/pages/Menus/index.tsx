import { Box } from '@mui/system';
import colorTheme from '../../components/ColorThemes';
import Footer from '../../components/Footer';
import ListMenus from '../../components/ListMenus';
import NavBar from '../../components/NavBar';
import BannerMenu from './Banner';
import styles from './Menu.module.scss'

const Menus = () => {
  return (
    <Box sx={{backgroundColor:colorTheme.palette.primary.light}}>
      <NavBar/>
      <BannerMenu/>
      <ListMenus/>
      
      {/* <Footer/> */}
    </Box>
  )
}

export default Menus;