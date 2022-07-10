import React,{useState} from 'react'
import LoginUi from './Login Ui/LoginUi';
import Client from './pages/Client';
import newone from './pages/newone';

function newtwo() {
  const adminUser={
    email: "hospital123",
    password: "admin123"
    }
   
   const [user, setUser]=useState({name:"",email:""});
   const [error, setError]= useState("");
   
   const Login = details =>{
   console.log(details);
   if (details.email== adminUser.email && details.password== adminUser.password){
    console.log("logged in");
    setUser({
    email: details.email,
    password: details.password
    });
   
   }else{
   console.log("Details do not match!");
   setError('Details do not match!');
   }
       
   
   }
   
   const Logout =()=>{
   //console.log("Logout")
   setUser({ email: "", password:""});
   }
  return (
    <div className="App">
    {(user.email != "") ? (
     <div className='welcome'>
      {/*  <h2>welcome,<span>{user.name}</span></h2>
      <button>logout</button>*/}
      <Client></Client>
      
      
    </div>
    
    ) : (
    <LoginUi Login={Login} error={error}></LoginUi>
    )}
    
    </div>
  )
}

export default newtwo