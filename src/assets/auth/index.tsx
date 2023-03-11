import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';


const AuthBackground = () => {
  const theme = useTheme();
  return (
      <Box sx={{ position: 'absolute', filter: 'blur(18px)', zIndex: -1, bottom: 0 }}>
          
      </Box>
  );
};

export default AuthBackground;