import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "../components/NavBar/Nav";
import { createTheme, ThemeProvider } from "@mui/material";
import Homepage from "../routes/homepage";
import Footer from "../components/footer";
import LostPage from "../routes/lostPage";
import FoundPage from "../routes/foundPage";
import Form from "../components/Form";

const theme = createTheme({
    palette: {
        primary: {
            main: "#000"
        },
        secondary: {
            main: "#fff"
        }
    },
    typography: {
        fontFamily: "Nunito Sans"
    },
    tabs: {
        fontSize: "100"
    }
});

function App() {
    return (<ThemeProvider theme={theme}>
        <Router>
            <div className="App">
                <Nav />
                <Routes>
                    <Route exact path="/" element={<Homepage />} />
                    <Route exact path="/lost" element={<LostPage />} />
                    <Route exact path="/found" element={<FoundPage />} />
                    <Route exact path="/report/form" element={<Form />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    </ThemeProvider>);
}

export default App;
