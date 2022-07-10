import React, {useState,useEffect,useRef} from 'react'
import Card from "react-bootstrap/Card";
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as AiIcons from 'react-icons/ai';
import './Training.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-modal';
import { FaPlay } from "react-icons/fa";

import { GlobalStyle } from '../globalStyles';
import axios from 'axios';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import data from "./mock-data.json"
import 'reactjs-popup/dist/index.css';
import Popup from '../components/Popup';
import {nanoid} from 'nanoid';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Training() {

const [count, setCount] = useState(4);
const [contacts, setContacts]=useState(data);

const [addFormData, setAddFormData] = useState({
  sessionnb:  count,
  num_rounds: '',
  clientsnb: ''
})

const [addFormData1, setAddFormData1] = useState({
  rounds: '',
  ipaddress: '127.0.0.1',
  port: 8080,
  resume: true
})

const setRounds=(event)=>{
  event.preventDefault();
  
  const rounds = event.target.getAttribute('name');
  const fieldValue1= event.target.value;
  const newFormData1={ ...addFormData1};
  newFormData1[rounds]=fieldValue1;
  
  setAddFormData1(newFormData1);
  
}

const handleAddFormChange = (event)=>{
event.preventDefault();

const fieldName = event.target.getAttribute('name');
const fieldValue= event.target.value;
const newFormData={ ...addFormData};
newFormData[fieldName]=fieldValue;

setAddFormData(newFormData);

}

const handleAddFormSubmit=(event)=>{
event.preventDefault();

const newContact= {
id:nanoid(),
sessionnb: addFormData.sessionnb,
num_rounds: addFormData.num_rounds,
clientsnb: addFormData.clientsnb,
};

const newContacts=[ ...contacts, newContact];
setContacts(newContacts);
toast('Training Session started Successfully!');


};




 const notify = () => toast("Wow so easy!");
 


/*async function notify(){
  toast("Wow so easy!");
}*/



  const [round, setRound] = useState(0);
  async function launch (){
  
    let data = {num_rounds: round,ipaddress:'127.0.0.1', port:8080,resume:true}
    const url = 'http://127.0.0.1:8000/launchFL';
    console.log(data);
    toast('Training Session started Successfuly!');
    
   
    await axios.post(url,data).then((response) => {
        console.log(response.data);
 
      }).catch(err=>{
        console.log("error",err);
      });
      

      };



    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  
  

  return (
<div className='card-container'>
<table>
        <tr>
          <th><h3  className='text'>Training Sessions</h3></th>
          <th>
          
  <button onClick={togglePopup} className='but'><FaPlay color="black" ></FaPlay></button>
    {isOpen && <Popup
      content={<>
        <b>Start New Session</b>
        <hr></hr>
        <h5 className='number'>Number of rounds</h5>
        <form className='form' >
          <div class="form-group">
            <input type="number" class="form-control" className='input'  name="num_rounds" id='num' onChange={(e)=>setRound(e.target.value)} placeholder="0" />
            
            {/*<input type="number" class="form-control" className='input'  name="num_rounds" id='num' onChange={handleAddFormChange} placeholder="0" />*/}
          </div>
        </form>
        <h5 className='number'>Number of clients</h5>
        <form className='form' >
          <div class="form-group">
           
            <input type="number" class="form-control" className='input'  name="numc" id='numc'  placeholder="0" />
            {/*<input type="number" class="form-control" className='input'  name="num_rounds" id='num' onChange={handleAddFormChange} placeholder="0" />*/}
          </div>
        </form>
        <hr></hr>
        {/*<button className='but1' >Close</button>*/}
      <button className='but2' type="submit" value="Submit" onClick={()=>{launch()}}>Submit</button>
       {/**  <button className='but2' type="submit" value="Submit" onClick={handleAddFormSubmit}>Submit</button>*/}
        <ToastContainer />
          </>}     
      handleClose={togglePopup}
    />}
 {/*<button className='but2' onClick={notify}>Submit</button>*/}
 
</th>
         
        </tr>
</table>

 <hr className='line'>
 </hr>
 
 <div className='app'>
 <table className='table'>
 <thead>
 <tr>
 <th className='th'>Session number</th>
 <th className='th'>Nb. of rounds</th>
 <th className='th'>Nb. of clients</th>
 </tr>
 </thead>
 <tbody>
 {contacts.map((contact)=>(
 <tr>
 <td>{contact.sessionnb}</td>
 <td>{contact.num_rounds}</td>
 <td>{contact.clientsnb}</td>
 </tr>
 ))}
 
 </tbody>
 </table>
{/*  <div className='in'>
 <input
          type="text"
          name="sessionnb"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="num_rounds"
          required="required"
          placeholder="Enter an addres..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="clientsnb"
          required="required"
          placeholder="Enter an addres..."
          onChange={handleAddFormChange}
        />
        <button type="submit" onClick={handleAddFormSubmit} >Add</button>
 
        </div>*/}
 </div>
 
 
 
</div>
  )
}

export default Training