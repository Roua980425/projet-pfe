import './SignUp.css';
import React, { Component }  from 'react';
/*import {BrowserRouter as Router, Route, Link, NavLink, Switch} from "react-router-dom";*/


import profile from "./../image/lung2.jpg";
import institution from "./../image/institution.png";
import email from "./../image/mail.png";
import pass from "./../image/pass.png";
function SignUp() {
  return (
    <div className="main1">
     <div className="sub-main1">
       <div>
         <div className="imgs1">
           <div className="container-image1">
             <img src={profile} alt="profile" className="profile1"/>

           </div>


         </div>
         <div>
           <h3 className='title'>Sign Up</h3>
           <div>
             <img src={institution} alt="email" className="email1"/>
             <input type="text" placeholder="institution name" className="name1"/>
           </div>
           
           <div className="second-input1">
             <img src={email} alt="pass" className="email1"/>
             <input type="text" placeholder="email" className="name1"/>
           </div>
           
           <div className="second-input1">
             <img src={pass} alt="pass" className="pass1"/>
             <input type="text" placeholder="password" className="name1"/>
           </div>
           
           <div className="second-input1">
             <img src={pass} alt="pass" className="pass1"/>
             <input type="text" placeholder="verify password" className="name1"/>
           </div>
           
          <div className="login-button1">
          <button className='button1'><a href='/client'>Sign Up</a></button>
          </div>
          
          <p className='link'>
          <a href="/">Back</a>
          </p>
           
           
           
 
         </div>
       </div>
       

     </div>
    </div>
  );
}

export default SignUp;