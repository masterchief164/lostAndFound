import './App.css';
import React from 'react';
import Navbar from "../components/navbar";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Homepage from '../routes/homepage';
function App() {
    return (
        <Router>
            <div className="App">
                <Navbar/>
                <Routes>
                    <Route exact path="/" element={<Homepage/>}/>
                    {/*<Route path="/contact" component={Contact}/>*/}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
