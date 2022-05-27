import './App.css';
import Nav from "../Nav/Nav";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../Home/Home";

function App() {
    return (
        <Router>
            <div className="App">
                <Nav/>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    {/*<Route path="/about" component={About}/>*/}
                    {/*<Route path="/contact" component={Contact}/>*/}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
