import React,{useEffect,useState} from "react";
import axios from "axios";

import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";


function Users(){


const [users,setUsers]=useState([]);

const [loading,setLoading]=useState(true);



// GET USERS

const getUsers=async()=>{


try{


const res=await axios.get(
"http://localhost:5000/api/users"
);



console.log(res.data);



setUsers(res.data);



}

catch(error){


console.log(
"User Error",
error
);


}

finally{


setLoading(false);


}


};




useEffect(()=>{


getUsers();


},[]);





return(

<div className="flex min-h-screen bg-slate-950">


<Sidebar/>


<div className="flex-1">


<Navbar/>


<div className="p-5 lg:p-8 responsive-padding page-enter">


<h1 className="
text-3xl
font-bold
text-white
mb-6
">

Users Management

</h1>




<div className="
bg-slate-900
rounded-xl
overflow-hidden
">


<table className="w-full text-left text-gray-300">


<thead className="bg-slate-800">


<tr>

<th className="p-4">
ID
</th>

<th className="p-4">
Name
</th>

<th className="p-4">
Email
</th>

<th className="p-4">
Phone
</th>

<th className="p-4">
Role
</th>

</tr>


</thead>



<tbody>


{

loading ?

<tr>

<td
colSpan="5"
className="p-5 text-center"
>

Loading...

</td>

</tr>


:

users.map((user)=>(


<tr
key={user.id}
className="
border-t
border-slate-800
"
>


<td className="p-4">

{user.id}

</td>


<td className="p-4">

{user.full_name}

</td>


<td className="p-4">

{user.email}

</td>


<td className="p-4">

{user.phone}

</td>


<td className="p-4">

{user.role}

</td>


</tr>


))


}



</tbody>



</table>


</div>


</div>


</div>


</div>


);


}


export default Users;