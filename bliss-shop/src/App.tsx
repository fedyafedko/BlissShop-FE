import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SignInPage from './pages/SignInPage/SignInPage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#276841',
      dark: '#276841',
      light: '#F3F9E3',
    },
    secondary: {
      main: '#F3F9E3',
      contrastText: '#fff',
    },
    background: {
      default: '#141313',
      paper: '#276841',
    },
  },
});

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#F3F9E3',
      light: '#276841',
      dark: '#F3F9E3',
      contrastText: '#ebf2fa',
    },
    secondary: {
      main: '#276841',
    },
    background: {
      default: '#ffffff',
      paper: '#F3F9E3',
    },
  },
});

function App() {
  return (
      <ThemeProvider theme={lightTheme}>
        <GoogleOAuthProvider
          clientId=""
        >
          <CssBaseline />
          <BrowserRouter>
            <Routes>
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </ThemeProvider>
  );
}

export default App;
