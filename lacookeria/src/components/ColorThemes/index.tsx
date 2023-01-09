import { createTheme } from '@mui/material/styles';

const colorTheme = createTheme({
  palette: {
    primary: {
      /* Color Light Brown */
      light: '#ffe0b2',
      /* Color Dark Orange */
      main: '#E95B2D',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffffff',
      /* Color Gold */
      main: '#F8B120',
      /* Color Dark Red */
      dark: '#ba000d',
      contrastText: '#8B3132',
    },
  },
});

export default colorTheme;
