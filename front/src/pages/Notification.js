import React from 'react'
import { Fragment, useState, useEffect } from 'react'
import './Notification.css'

import axios from 'axios';


function Notification() {

  const [List, setList] = useState([]);
  const getNotif = async () => {
    let tab = []
    await axios.get("http://127.0.0.1:8000/selectNotif").then(
        res => {tab = res.data.list})
    .catch(error => {console.log(error)});
    return tab;
  }

  useEffect(() => {
    getNotif();
  }, [])
  return (
    <div className='card-container2'>
    
    <table className="tabnotif" >
                <thead>
                <tr>
                    <th className='th5'>Central organization</th>
                    <th className='th5'>Date</th>
                    <th className='th5'>Participate</th>
                </tr>
                  </thead> 
                  <tbody>
                  
                  <tr>
                 <td> Talan Tunisie</td>
                 <td>2022-06-02 17:28:02.845014</td>
                 <td>
               <button style={{background:"#5FD060",color:"white"}} className='butaccept'>Yes</button>
              <button className='butdecline'style={{background:"grey",color:"white"}}>No</button>
              </td>
              </tr>
              
              
              
                  </tbody>
      </table>   
                      
                        
              
                        
                      
               
      
    </div>
  )
}

export default Notification