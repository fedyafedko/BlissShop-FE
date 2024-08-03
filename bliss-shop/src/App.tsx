import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, IconButton } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SignInPage from './pages/SignInPage/SignInPage';
import HomePage from './pages/HomePage/HomePage';
import { useState } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { SnackbarProvider } from 'notistack';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import ProductPage from './pages/ProductPage/ProductPage';
import SearchPage from './pages/SearchPage/SearchPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';

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
      dark: '#F6F7F8',
      light: '#419D78',
    },
    background: {
      default: '#63595C',
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
      dark: '#090A0B',
      light: '#D8DAD3',
    },
    background: {
      default: '#F5F4F5',
      paper: '#F3F9E3',
    },
  },
});

function App() {
  const [themeMode, setThemeMode] = useState('light');

  const toggleTheme = () => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };
  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
        <GoogleOAuthProvider clientId="346589200417-h0pgk8i3lufp76lhsu45flthptkuhqec.apps.googleusercontent.com">
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/reset-password/:email/:token" element={<ResetPasswordPage/>} />
              <Route path="/search/:searchTerm" element={<SearchPage/>}/>
              <Route path='/category/:categoryName/:categoryId' element={<CategoryPage/>}/>
              <Route path="*" element={<div>Not Found Page</div>} />
            </Routes>
          </BrowserRouter>
          <IconButton onClick={toggleTheme} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
            {themeMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
