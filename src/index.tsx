import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import colorTheme from './components/ColorThemes';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <React.StrictMode>

      <BrowserRouter>
        <ThemeProvider theme={colorTheme}>
          <CssBaseline>
            <App />
          </CssBaseline>
        </ThemeProvider>
      </BrowserRouter>

    </React.StrictMode>
  </AuthProvider>
);

