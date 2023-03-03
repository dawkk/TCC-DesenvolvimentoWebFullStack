import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Card, CardMedia, IconButton, Typography } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import colorTheme from '../../ColorThemes';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

/* import image from './imgTest/banner-menu.jpg' */

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function CartDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
  
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
        <Typography variant='h4'>Carrinho</Typography>
      </Box>

      <Divider />
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>


        <Card
          variant="outlined"
          sx={{
            display: 'flex',
            p: 1,
            flexDirection: {
              xs: 'column', // mobile
              sm: 'row', // tablet and up
            },
          }}
        >
          <CardMedia
            component="img"
            width="100"
            height="100"
            alt="imagem prato"
            image={require('../../../assets/images/menus/principal/pizza.jpg')}
            sx={{
              borderRadius: 0.5,
              width: { xs: '100%', sm: 100 },
              mr: { sm: 1.5 },
              mb: { xs: 1.5, sm: 0 },
            }}
          />
          <Box sx={{ alignSelf: 'center', ml: 2 }}>
            <Typography variant="body1" color="text.secondary">
              Pizza quatro queijos
            </Typography>
            <Typography component="div" fontWeight="bold" sx={{ pt: 1 }}>
              R$ 45,00
            </Typography>
            <Box
              sx={{
                ml: -1,
                mt: 0.75,
                
                borderRadius: 1,
                display: 'flex',
                alignItems:'center',
                typography: 'caption',
                /*  bgcolor: (theme) =>
                   theme.palette.mode === 'dark' ? 'primary.900' : 'primary.50',
                 color: (theme) =>
                   theme.palette.mode === 'dark' ? '#fff' : 'primary.700', */
              }}
            >
              <IconButton aria-label="add">
                <AddBoxIcon />
              </IconButton>
              <Typography variant='body1' sx={{ml:1, mr:1}}>0</Typography>
              <IconButton aria-label="minus">
                <IndeterminateCheckBoxIcon />
              </IconButton>

            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );

  return (
    <div>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} sx={{color:colorTheme.palette.primary.contrastText }}>Carrinho <ShoppingCartIcon /></Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}