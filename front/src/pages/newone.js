import React, { Component }  from 'react';
import './newone.css';
import {BrowserRouter as Router, Route, Routes, Link, NavLink, Switch} from "react-router-dom";

import Navbar from '../components/Navbar';
import Training from '../pages/Training';
import Contributions from '../pages/Contributions';
import Logout from './Logout';
import LoginUi from '../Login Ui/LoginUi';



function newone() {
  return (
   
    <Router>
      <Switch>
        <Route exact path="/logout" component={Logout} />
        <div>
          <Navbar />
          <Route exact path="/newone" component={Training}/>
          {/*<Route exact path="/contributions" component={Contributions}/> */}
            <Route exact path="/training" component={Training}/>
        </div>
      </Switch>
    </Router>
  
   
  )
}

export default newone