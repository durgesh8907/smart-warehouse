import React, {useEffect,useState} from "react";
import axios from "axios";

import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";



function Reports(){


const [products,setProducts]=useState([]);

const [loading,setLoading]=useState(true);



const getReports = async()=>{


try{


const response = await axios.get(

"http://localhost:5000/api/reports/products"

);



console.log(response.data);



setProducts(response.data);



}

catch(error){


console.log(
"Report Error:",
error
);


}


finally{


setLoading(false);


}


};




useEffect(()=>{


getReports();


},[]);





return(


<div className="flex min-h-screen bg-slate-950">


<Sidebar />



<div className="flex-1">


<Navbar />



<div className="p-5 lg:p-8 responsive-padding page-enter">



<h1 className="
text-3xl
font-bold
text-white
mb-6
">

Reports

</h1>




<div className="
bg-slate-900
rounded-xl
border
border-slate-800
overflow-hidden
">



<table className="
w-full
text-gray-300
">



<thead className="bg-slate-800">


<tr>


<th className="p-4">
Product
</th>


<th className="p-4">
Category
</th>


<th className="p-4">
Price
</th>


<th className="p-4">
Stock
</th>


</tr>


</thead>



<tbody>


{

loading ?


<tr>

<td
colSpan="4"
className="p-5 text-center"
>

Loading...

</td>


</tr>


:


products.map((item,index)=>(


<tr
key={index}
className="
border-t
border-slate-800
"
>


<td className="p-4">

{item.product_name}

</td>



<td className="p-4">

{item.category}

</td>



<td className="p-4">

₹ {item.price}

</td>



<td className="p-4">

{item.stock}

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



export default Reports;