import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignUpPage from './pages/SignUpPage/SignUpPage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#276841',
      // dark: '#ff5f38',
      // light: '#fe8f72',
      contrastText: '#272525',
    },
    secondary: {
      main: '#F3F9E3',
      contrastText: '#fff',
    },
    error: {
      main: '#D61F3D',
    },
    info: {
      main: '#00A7E1  ',
    },
    success: {
      main: '#4CAF50',
    },
    warning: {
      main: '#FF9800',
    },
    background: {
      default: '#141313',
      paper: '#276841',
    },
    text: {
      primary: '#141313',
      secondary: '#276841',
    }
  },
});

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#F3F9E3',
      contrastText: '#ebf2fa',
    },
    secondary: {
      main: '#276841',
      contrastText: '#ebf2fa',
    },
    // error: {
    //   main: '#D61F3D',
    // },
    // info: {
    //   main: '#00A7E1  ',
    // },
    // success: {
    //   main: '#4CAF50',
    // },
    // warning: {
    //   main: '#FF9800',
    // },
    background: {
      default: '#ffffff',
      paper: '#F3F9E3',
    },
    text: {
      primary: '#141313',
      secondary: '#F3F9E3',
    }
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
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </ThemeProvider>
  );
}

export default App;
