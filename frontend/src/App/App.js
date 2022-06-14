import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Nav from "../components/NavBar/Nav";
import {createTheme, ThemeProvider} from "@mui/material";
import Homepage from "../routes/homepage";
import Footer from "../components/footer";

const theme = createTheme({
    palette: {
        primary: {
            main: '#000',
        }, secondary: {
            main: '#fff',
        }
    }, typography: {
        fontFamily: 'Nunito Sans',
    }, tabs: {
        fontSize: '100',
    }
});

function App() {
    return (<ThemeProvider theme={theme}>
            <Router>
                <div className="App">
                    <Nav/>
                    <Routes>
                        <Route exact path="/" element={<Homepage/>}/>
                    </Routes>
                    <Footer/>
                </div>
            </Router>
        </ThemeProvider>);
}

export default App;
