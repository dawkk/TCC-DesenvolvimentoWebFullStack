import { Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import styles from './ListMenus.module.scss'
import menuImage1 from '../../../assets/images/menus/principal/burguer_combo.jpg'

const ListMenus = () => {
  return (
    <>
      <Box sx={{ paddingLeft: 3.7, paddingBottom: 5, boxSizing: 'border-box' }}>
        <Grid container spacing={{ xs: 2 }}>
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
        {/* Listagem de pratos a partir do menu */}

        <Grid container>
          <Grid xs={12} sx={{mt: 10,display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Typography gutterBottom variant="h2" component="div">
              <Divider>
              Menu Principal
              </Divider>
            </Typography>
          </Grid>
          <Grid container spacing={4} sx={{ mt: 10, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <Grid item xs={5.5}>
              <Card sx={{ display: 'flex' }}>
                <CardMedia
                  component="img"
                  alt="pizza"
                  height="300"
                  image={require('../../../assets/images/menus/principal/pizza.jpg')}
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                  <Typography gutterBottom variant="h3" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 5,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                  <CardActions>
                    <Button size="small">Ver Prato</Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={5.5}>
              <Card sx={{ display: 'flex' }}>
                <CardMedia
                  component="img"
                  alt="pizza"
                  height="300"
                  image={require('../../../assets/images/menus/principal/pizza.jpg')}
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                  <Typography gutterBottom variant="h3" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 5,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                  <CardActions>
                    <Button size="small">Ver Prato</Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={5.5}>
              <Card sx={{ display: 'flex' }}>
                <CardMedia
                  component="img"
                  alt="pizza"
                  height="300"
                  image={require('../../../assets/images/menus/principal/pizza.jpg')}
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                  <Typography gutterBottom variant="h3" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 5,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                  <CardActions>
                    <Button size="small">Ver Prato</Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={5.5}>
              <Card sx={{ display: 'flex' }}>
                <CardMedia
                  component="img"
                  alt="pizza"
                  height="300"
                  image={require('../../../assets/images/menus/principal/pizza.jpg')}
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                  <Typography gutterBottom variant="h3" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 5,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                  <CardActions>
                    <Button size="small">Ver Prato</Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {/* Grid container below */}
        </Grid>
      </Box>
    </>
  )
}

export default ListMenus;