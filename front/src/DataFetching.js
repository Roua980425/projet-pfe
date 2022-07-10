import React, {useState, useEffect} from 'react';
import axios from 'axios';
import data from "./datafetch.json"

function DataFetching(){


const [posts,setPosts]=useState([])


  
/*useEffect(()=>{
axios.get('https://jsonplaceholder.typicode.com/users')
.then(res=>{
console.log(res)
setPosts(res.data)
})
.catch(err=>{
console.log(err)
})
})*/

return(
<div>
{
data.map(record=>{
return(
<div>
{record.id}
</div>
)
})
}

</div>
)
}

export default DataFetching