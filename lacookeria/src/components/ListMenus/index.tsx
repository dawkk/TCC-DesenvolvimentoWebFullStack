import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { url } from 'inspector';
import colorTheme from '../ColorThemes';
import styles from './ListMenus.module.scss'
import menuImage1 from './images/menu-hamburguer.jpg'

const ListMenus = () => {
  return (
    <>
      <Box sx={{ paddingLeft: 3.7,paddingBottom:5, boxSizing: 'border-box'}}>
        <Grid container spacing={{xs:2}}>
          <Grid item xs={2.347}>
            <div className={styles.MenuFlex} style={{ backgroundImage: `url(${menuImage1})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
              <div className={styles.MenuImage}>
                <h3 className={styles.MenuTitle}>Menu Principal</h3>
              </div>
            </div>
          </Grid>
          <Grid item xs={2.347}>
            <div className={styles.MenuFlex} style={{ backgroundImage: `url(${menuImage1})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
              <div className={styles.MenuImage}>
                <h3 className={styles.MenuTitle}>Menu Principal</h3>
              </div>
            </div>
          </Grid>
          <Grid item xs={2.347}>
            <div className={styles.MenuFlex} style={{ backgroundImage: `url(${menuImage1})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
              <div className={styles.MenuImage}>
                <h3 className={styles.MenuTitle}>Menu Principal</h3>
              </div>
            </div>
          </Grid>
          <Grid item xs={2.347}>
            <div className={styles.MenuFlex} style={{ backgroundImage: `url(${menuImage1})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
              <div className={styles.MenuImage}>
                <h3 className={styles.MenuTitle}>Menu Principal</h3>
              </div>
            </div>
          </Grid>
          <Grid item xs={2.347}>
            <div className={styles.MenuFlex} style={{ backgroundImage: `url(${menuImage1})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
              <div className={styles.MenuImage}>
                <h3 className={styles.MenuTitle}>Menu Principal</h3>
              </div>
            </div>
          </Grid>
          
        </Grid>
      </Box>
    </>
  )
}

export default ListMenus;