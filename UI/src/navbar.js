
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Calculator from './calculator/calculator';
 import HomeComponent from './Home';
import Calender from './calender/calender'


class Navbar extends Component {
    render() {
        return (
            <Router>

                <div>
                    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                        
                            <img src = './favicon.ico' height='40' alt='logo'/>
                        
                        <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="collapsibleNavId">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item active">
                                    <Link to="/" className="nav-link" >Home</Link>
                                </li>
                               
                                <li className="nav-item dropdown">
                                    <Link to='caluculator' className="nav-link ">Calculator</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link to='calender' className="nav-link ">Calender</Link>
                                </li>
                                
                            </ul>

                        </div>
                    </nav>

                    <Route path="/" exact component={HomeComponent} /> 
                    <Route path="/caluculator" component={Calculator} />  
                    <Route path="/calender" component={Calender} />               
                </div>

            </Router>

        )
    }

}

export default Navbar;
