import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import Nav from '../components/Nav';
import Homepage from '../routes/homepage';
import Footer from '../components/footer';
import LostPage from '../routes/lostPage';
import FoundPage from '../routes/foundPage';
import GoogleLogin from '../routes/GoogleLogin';
import Form from '../routes/Form';
import theme from '../utils/AppTheme';
import { UserContextProvider } from '../utils/UserContext';

function App() {
  return (<ThemeProvider theme={theme}>
    <UserContextProvider>
          <Router>
            <div className="App">
              <Nav />
              <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/lost" element={<LostPage />} />
                <Route exact path="/found" element={<FoundPage />} />
                <Route exact path="/report/form" element={<Form />} />
                <Route exact path="/google" element={<GoogleLogin />} />
              </Routes>
              <Footer />
            </div>
          </Router>
    </UserContextProvider>
  </ThemeProvider>);
}

export default App;
