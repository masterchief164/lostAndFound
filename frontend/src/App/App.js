import React from 'react';
import Navbar from "../components/navbar";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Homepage from '../routes/homepage';
import "./App.css";
import Footer from '../components/footer';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar/>
                <Routes>
                    <Route exact path="/" element={<Homepage/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
