import React,{Component} from 'react';
import './Client.css';
import { useState,useEffect } from 'react';
import {
    Table, Container,
    Row, Col,
    Button,
    Card, CardHeader, Input
  } from "reactstrap";
import axios from 'axios';
import bgImage from '../video/background.mp4';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Notification from './Notification';
import logo from "./../image/logo-talan.png";
import { Link } from "react-router-dom";
import Popup from '../components/Popup2';
import {AiTwotoneNotification} from "react-icons/ai";


class Client extends Component {
    //const [didRequestsList, setdidRequestsList] = useState([]);
    
    //const [isToggled, setIsToggled] = useState();
    state = {
    notifs:[],
        selectedFile: null,
        test: "",
        isOpen:false,
      };
      
    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
      };
      
      
      
   onFileUpload = async () => {
   document.getElementById("selectedFile").click()
    const url = 'http://127.0.0.1:8001/predictTumour';
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);
    // formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    let x
    await axios.post(url, formData, config).then((response) => {
        console.log(response.data);
        
        //this.setState({ test : response.data});
        x = response.data
      });
      this.setState({ test : x});
      console.log(this.state.test);
      };
     
     
     
      onAccept = async (datenotif, idclient) => {
        console.log("client",datenotif)
        let data = {client_id: idclient, notif_date:datenotif}
        const url = 'http://127.0.0.1:8001/clientAccept';
        console.log(data)
        await axios.put(url,data).then((response) => {
        console.log("response put ",response.data);
       
      }).catch(err=>{
        console.log("error",err);
      });
      }
 
 
      getNotif = async () => {
        // this.setState({notifs:[this.state.notifs,...[]]})
        let tab = []
        await axios.get("http://127.0.0.1:8001/selectNotif").then(
            (res )=> {
                tab = res.data;
              console.log("tab notif",res)
            this.setState({notifs:[this.state.notifs,...tab]})
            })
        .catch(error => {console.log(error)});
       
        console.log("notifs",this.state.notifs)
        return tab;
      }
     
      togglePopup = () => {
        this.setState({isOpen: !this.state.isOpen});
        // this.setState({notifs: []}) 
      }
    
      openPopUp =()=>{
        this.togglePopup();
        this.getNotif();
      }
     
     onFileUploadzip = () => {
        document.getElementById("selectedFile1").click()
        const url = 'http://127.0.0.1:8001/Contribute';
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        // formData.append('fileName', file.name);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        axios.post(url, formData, config).then((response) => {
          console.log(response.data);
        });
       };
       
      
       
       render() {
       
        {/*let {isLoggedIn} = this.state.test;*/}

       {/**  const renderAuthButton = () => {
          if (isLoggedIn==="Tumour") {
            return <div>Tumour</div>;
          } else if (isLoggedIn==="No Tumour") {
            return <div>No Tumour</div>;
          } else{
          return <></>}
        }*/}
  return (
    <div className='App1'>
    <video autoPlay loop muted >
    <source src={bgImage} type='video/mp4' />
    </video>
    <div className=''>
             <img src={logo} alt="" className="logo"/>
    </div>
    
    <button className='but5' onClick={this.openPopUp.bind(this)}>Notifications <AiTwotoneNotification></AiTwotoneNotification></button>
    {this.state.isOpen &&
         <Popup
     content={  <table className='table'>
       {/* {console.log("otside",this.state.notifs[1])} */}
     <tr>
     <th className='th1'>Central organization</th>
     {/* <th className='th1'>State</th> */}
     <th className='th1'>Start date</th>
     <th className='th1'>Participate</th>
     </tr>
     { this.state.notifs.slice(1,).map((item,index)=>{   return  <tr key={index}>
     <td>{item[0]}</td>
     <td>{item[2]}</td>
     <td>
     {/* onClick={this.onAccept(item[2],item[3])} */}
         <button style={{background:"green",color:"white", height: "40px", width: "40px",fontSize:"15px"}} onClick={()=>{this.onAccept(item[2],item[3])}}>Yes</button>
         <button style={{background:"#d7363c",color:"white", height: "40px", width: "40px", marginLeft:"6px",fontSize:"15px"}}>No</button>
     </td>
     </tr>    })
   }
   
     </table>}
     handleClose={this.togglePopup.bind(this)}
   />}
    
    
    <div className='card-container1'>
    <center className='textt'>FLTumor</center>
    <hr className='hr'></hr>
    <center className='welcome'></center>
    
    <button onClick={this.onFileUploadzip.bind(this)} className='but3'>Contribute Data</button>
    <input type="file" id="selectedFile1" onChange={this.onFileChange} accept='.zip, .rar' className='input1' style={{display:"none"}}/>
    
    <button className='but4' onClick={this.onFileUpload.bind(this)}>Tumor Prediction</button>
    <input type="file" id="selectedFile" onChange={this.onFileChange} className='input2'style={{display:"none"}} />
    {/*{renderAuthButton()}*/}
   {/*<button className='but4' onClick={()=>setIsToggled(!isToggled)}>Tumour Prediction</button>*/}
    
<p className='text3'>{this.state.test}</p>
    
    
    
<a href="/"><button className='link1' >Back</button></a>
          
          
    </div>
    
    {/*<Notification></Notification>*/}

    </div>
    
  )
}
}
export default Client;