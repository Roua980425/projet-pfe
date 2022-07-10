import React from 'react'
import axios from "axios"

function fetch() {


              
const fetchData = () => {
    return axios.get("http://127.0.0.1:8000/selectNotif")
    .then((response) => console.log(response.data));}
    
  return (
    <div>fetch
    <button onClick={fetchData}>click</button>
    </div>
  )
}

export default fetch