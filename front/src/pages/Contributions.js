import React from 'react'

import Navbar from '../components/Navbar'
import {BrowserRouter as Router, Route, Routes, Link, NavLink, Switch} from "react-router-dom";

function Contributions() {
  return (
  <Router>
  <Switch>
  <Navbar>
    <div>Contributions</div>
    
    </Navbar>
    </Switch>
    </Router>
  )
}

export default Contributions