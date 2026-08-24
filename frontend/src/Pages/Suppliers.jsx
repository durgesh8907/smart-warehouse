import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";


function Suppliers() {


    const [suppliers, setSuppliers] = useState([]);

    const [loading, setLoading] = useState(true);



    // GET SUPPLIERS API

    const getSuppliers = async () => {


        try {


            const response = await axios.get(
                "http://localhost:5000/api/suppliers"
            );


            console.log(response.data);


            setSuppliers(response.data);


        }

        catch(error){


            console.log(
                "Supplier Error:",
                error
            );


        }

        finally{

            setLoading(false);

        }


    };



    useEffect(()=>{


        getSuppliers();


    },[]);





    return (

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

                        Suppliers Management

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
                        text-left
                        text-gray-300
                        ">


                            <thead className="bg-slate-800">


                                <tr>


                                    <th className="p-4">
                                        ID
                                    </th>


                                    <th className="p-4">
                                        Supplier Name
                                    </th>


                                    <th className="p-4">
                                        Company
                                    </th>


                                    <th className="p-4">
                                        Email
                                    </th>


                                    <th className="p-4">
                                        Phone
                                    </th>


                                    <th className="p-4">
                                        City
                                    </th>


                                </tr>


                            </thead>



                            <tbody>


                            {

                                loading ?


                                (

                                    <tr>

                                        <td
                                        colSpan="6"
                                        className="text-center p-5"
                                        >

                                            Loading...

                                        </td>


                                    </tr>


                                )


                                :


                                suppliers.map((item)=>(


                                    <tr
                                    key={item.id}
                                    className="
                                    border-t
                                    border-slate-800
                                    hover:bg-slate-800
                                    "
                                    >


                                        <td className="p-4">
                                            {item.id}
                                        </td>


                                        <td className="p-4">
                                            {item.supplier_name}
                                        </td>


                                        <td className="p-4">
                                            {item.company_name}
                                        </td>


                                        <td className="p-4">
                                            {item.email}
                                        </td>


                                        <td className="p-4">
                                            {item.phone}
                                        </td>


                                        <td className="p-4">
                                            {item.city}
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


export default Suppliers;