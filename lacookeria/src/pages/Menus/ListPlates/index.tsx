import { Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Typography } from "@mui/material";


const ListPlates = () => {
  return (
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
  </Grid>
  )
}

export default ListPlates;