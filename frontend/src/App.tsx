import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Layout from './layouts/main';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import ProductListPage from 'pages/ProductListPage';
import ProductPage from 'pages/ProductPage';
import { gapi } from 'gapi-script';
import { UserProvider } from 'userContext';

const cache = createCache({
  key: 'css',
  prepend: true,
});

const App: React.FC = () => {
  useEffect(() => {
    function start() {
      gapi.client
        .init({
          clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
          scope: 'profile email',
        })
        .then(() => {
          // Additional actions after initialization, e.g., sign-in check
          if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
            console.log('User is signed in');
          } else {
            console.log('User is not signed in');
          }
        })
        .catch((error: any) => {
          console.error('Error initializing Google API client', error);
        });
    }

    gapi.load('client:auth2', start);
  }, []);

  return (
    <Router>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <UserProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/products" element={<ProductListPage />} />
                <Route path="/product/:name" element={<ProductPage />} />
              </Routes>
            </Layout>
          </UserProvider>
        </ThemeProvider>
      </CacheProvider>
    </Router>
  );
};

export default App;
