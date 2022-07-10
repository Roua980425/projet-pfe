import './Signin.css';
import React, {useState} from 'react';

import {BrowserRouter as Router, Route, Routes, Link, NavLink, Switch} from "react-router-dom";


import profile from "./../image/lung2.jpg";
import institution from "./../image/institution.png";
import email from "./../image/mail.png";
import pass from "./../image/pass.png";
import logo from "./../image/logo-talan.png";

function Signin({ Login, error}) {
    const [details, setDetails]= useState({email:"", password:""});
    const submitHandler=e=>{
    e.preventDefault();
    Login(details);
    }
  return (
    <form>
    <div className="mainc">
     <div className="sub-mainc">
       <div>
         <div className="imgsc">
           <div className="container-imagec">
             <img src={logo} alt="profile" className="profilec"/>
           </div>
         </div>
         <div>
           <h3 className='titlec'>Sign in</h3>
           
           <form>
           <div>
             <img src={email} alt="email" className="emailc"/>
             <input type="text" name="email" placeholder="email" className="namec" id="name" onChange={e=>setDetails({...details, email: e.target.value})} value={details.email}/>
           </div>
           
           <div className="second-inputc">
             <img src={pass} alt="pass" className="emailc"/>
             <input type="password" placeholder="password" className="namec" name="password" id="password"  onChange={e=>setDetails({...details, password: e.target.value})} value={details.password}/>
           </div> 
           {(error!="") ? (<div className='error'>{error}</div>) : ""}
          <div className="login-buttonc">
          <button className='submitc' type='submit' onClick={submitHandler} >Sign in</button>
          </div>
          </form>
           
            <p className="linkc">
           <Router>
              <a href="#">Forgot password ?</a> 
             {/* Or <a href="/signup">SignUp</a> */} 
            </Router>
            </p>
           
 
         </div>
       </div>
       

     </div>
    </div>
    
    </form>
  )
}

export default Signin