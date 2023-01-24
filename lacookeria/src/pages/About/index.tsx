import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import colorTheme from '../../components/ColorThemes';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import BannerAbout from './Banner';

const About = () => {
  return (
    <Box sx={{backgroundColor:colorTheme.palette.primary.light, height:'100%', paddingTop:20 }}>
      <NavBar/>
      <BannerAbout/>
      <Box sx={{ml:20, mr:20,mb:10}}>
        <Typography variant="h6">
          Bem-vindo ao nosso restaurante! Somos uma equipe apaixonada por comida e estamos sempre em busca de novos sabores e ingredientes para oferecer aos nossos clientes. Aqui, você encontrará uma ampla variedade de pratos típicos brasileiros e internacionais, preparados com ingredientes frescos e de qualidade. Além disso, contamos com uma equipe de garçons profissionais e atenciosos para garantir uma experiência gastronômica inesquecível. Reserve agora mesmo sua mesa e venha experimentar o melhor da culinária brasileira conosco!
        </Typography>
      </Box>
      <Footer/>
    </Box>
  )
}

export default About;