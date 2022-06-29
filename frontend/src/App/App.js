import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import Nav from '../components/NavBar/Nav';
import Homepage from '../routes/homepage';
import Footer from '../components/footer';
import LostPage from '../routes/lostPage';
import FoundPage from '../routes/foundPage';
import Form from '../components/Form';
import Card from '../components/Card/Card';
import theme from '../utils/AppTheme';
import { UserContextProvider } from '../utils/UserContext';
import { LostItemsContextProvider } from '../utils/LostItemsContext';
import { FoundItemsContextProvider } from '../utils/FoundItemsContext';

function App() {
  return (<ThemeProvider theme={theme}>
        <UserContextProvider>
            <LostItemsContextProvider>
                <FoundItemsContextProvider>
                    <Router>
                        <div className="App">
                            <Nav />
                            <Routes>
                                <Route exact path="/" element={<Homepage />} />
                                <Route exact path="/lost" element={<LostPage />} />
                                <Route exact path="/found" element={<FoundPage />} />
                                <Route exact path="/report/form" element={<Form />} />
                                <Route exact path="/report/card" element={<Card />} />
                            </Routes>
                            <Footer />
                        </div>
                    </Router>
                </FoundItemsContextProvider>
            </LostItemsContextProvider>
        </UserContextProvider>
    </ThemeProvider>);
}

export default App;
