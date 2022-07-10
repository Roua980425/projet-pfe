import logo from './logo.svg';
import React, {useState,  Component }  from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Link, NavLink, Switch} from "react-router-dom";
import LoginUi from './Login Ui/LoginUi';
import SignUp from './Sign Up/SignUp'
import Navbar from './components/Navbar';
import Training from './pages/Training';
import Contributions from './pages/Contributions';
import Logout from './pages/Logout';
import newone from './pages/newone';
import Client from './pages/Client';
import { RequireToken } from "./Auth";
import Profile from "./Profile.js";
import login from './login';
import newtwo from './newtwo';
import DataFetching from './DataFetching';
import Signin from './Sign In/Signin';
import newtwoserver from './newtwoserver';

function App() {

  const adminUser={
    email: "admin@admin.com",
    password: "admin123"
    }
   
   const [user, setUser]=useState({name:"",email:""});
   const [error, setError]= useState("");
   
   const Login = details =>{
   console.log(details);
   }
   
   const Logout =()=>{
   console.log("Logout")
   }
  return (
    <Router>
    <div>
        
        <Switch> 
        <Route exact path="/server" component={newtwoserver}/> 
            <Route exact path="/signup" component={SignUp}/> 
            <Route exact path="/" component={newtwo}/>
            <Route exact path="/newone" component={newone}/>
            <Route exact path="/client" component={Client}/>
            <Route exact path="/logout" component={Logout} />
            <Route path="/login" component = {login}/>
            <Route path="/profile" component = {Profile}/>
            <Route path="/fetch" component = {DataFetching}/>
            {/*<Route path="/" element = {<LoginUi/>}/>*/}
            
        </Switch>     
    </div>
</Router>
  

  );
}

export default App;
