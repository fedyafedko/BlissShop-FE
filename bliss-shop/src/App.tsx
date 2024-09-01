import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SignInPage from './pages/SignInPage/SignInPage';
import HomePage from './pages/HomePage/HomePage';
import { useEffect, useState } from 'react';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { SnackbarProvider } from 'notistack';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import ProductPage from './pages/ProductPage/ProductPage';
import SearchPage from './pages/SearchPage/SearchPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import Setting from './api/Setting';
import SettingResponse from './api/models/response/SettingResponse';
import OrderPage from './pages/OrderPage/OrderPage';

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
  const [settings, setSettings] = useState<SettingResponse>();

  useEffect(() => {
    const getSettings = async () => {
    const response = await Setting.getForUser();
    if (response.success) {
      setSettings(response.data);
      setThemeMode(response.data?.isDarkMode ? 'dark' : 'light');
    }
  };
  getSettings();
  }, []);

  const handleUpdateSetting = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (name === 'isDarkMode') {
      setThemeMode(checked ? 'dark' : 'light');
    }

    setSettings((prevSettings) => {
      if (!prevSettings) return undefined;
  
      return {
        ...prevSettings,
        [name]: checked,
      };
    });
  };

  useEffect(() => {
    const updateSetting = async () => {
      const response = await Setting.update(settings as SettingResponse);
      if (response.success) {
        console.log('Updated setting');
      }
    }
    updateSetting();
  }, [settings]);

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
              <Route path="/profile" element={<ProfilePage handleUpdateSetting={handleUpdateSetting} settings={settings}/>} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/reset-password/:email/:token" element={<ResetPasswordPage/>} />
              <Route path="/search/:searchTerm" element={<SearchPage/>}/>
              <Route path='/category/:categoryName/:categoryId' element={<CategoryPage/>}/>
              <Route path="/profile/order/:orderId" element={<OrderPage/>}/>
              <Route path="*" element={<div>Not Found Page</div>} />
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
