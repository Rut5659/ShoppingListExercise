import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './store/store'; 
import ShoppingPage from './components/ShoppingPage';
import { CssBaseline, Container } from '@mui/material';
import ThankYouPage from './components/ThankYouPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <Container maxWidth="md">
          <Routes>
            <Route path="/" element={<ShoppingPage />} />
            <Route path="/thanks" element={<ThankYouPage />} />
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
