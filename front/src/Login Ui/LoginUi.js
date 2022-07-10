import './LoginUi.css';
import React, {useState} from 'react';

import {BrowserRouter as Router, Route, Routes, Link, NavLink, Switch} from "react-router-dom";

import profile from "./../image/lung2.jpg";
import email from "./../image/email.jpg";
import pass from "./../image/pass.png";
import SignUp from '../Sign Up/SignUp';
export default function LoginUi({ Login, error}) {
const [details, setDetails]= useState({email:"", password:""});
const submitHandler=e=>{
e.preventDefault();
Login(details);
}





  return (
  <form>
    <div className="main">
     <div className="sub-main">
       <div>
         <div className="imgs">
           <div className="container-image">
             <img src={profile} alt="profile" className="profile"/>
           </div>
         </div>
         <div>
           <h3 className='title1'>Sign in</h3>
           
           <form>
           <div>
             <img src={email} alt="email" className="email"/>
             <input type="text" name="email" placeholder="email" className="name" id="name" onChange={e=>setDetails({...details, email: e.target.value})} value={details.email}/>
           </div>
           
           <div className="second-input">
             <img src={pass} alt="pass" className="email"/>
             <input type="password" placeholder="password" className="name" name="password" id="password"  onChange={e=>setDetails({...details, password: e.target.value})} value={details.password}/>
           </div> 
           {(error!="") ? (<div className='error'>{error}</div>) : ""}
          <div className="login-button">
          <button className='submit' type='submit' onClick={submitHandler} >Sign in</button>
          </div>
          </form>
           
            <p className="link">
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
  );
}

