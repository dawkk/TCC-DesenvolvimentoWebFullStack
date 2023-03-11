import { ButtonBase, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styles from './Logo.module.scss';
import logoImage from '../../assets/images/logos/Lacookeria.png'

const Logo = () => {
  return (
    <ButtonBase>
      <Link component={RouterLink} to="/">
        <img className={styles.LogoStyle} src={logoImage} alt='Logotipo La Cookeria'></img>
      </Link>
    </ButtonBase>
  )
}

export default Logo;