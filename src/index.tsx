import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import colorTheme from './components/ColorThemes';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

/* const clientId = process.env.OAUTH_GOOGLE_CLIENT_ID || ''; */

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <React.StrictMode>
      <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
        {/* <GoogleOAuthProvider clientId={clientId}> */}
        <GoogleOAuthProvider clientId="881675955553-u0g9peh5vh8bhm26t5a78ishcbvd5d4e.apps.googleusercontent.com">
          <ThemeProvider theme={colorTheme}>
            <CssBaseline>
              <App />
            </CssBaseline>
          </ThemeProvider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  </AuthProvider>
);

